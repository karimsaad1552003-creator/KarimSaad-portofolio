"""Retake client screenshots that need pop-ups closed or videos loaded.

Drives headless Chrome over the DevTools protocol so the page can be cleaned up before capture.
Run: python scripts/recapture_clients.py
"""

import base64
import io
import json
import subprocess
import tempfile
import time
import urllib.request
from pathlib import Path

import websocket
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "clients"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 9333

JOBS = [
    ("https://darnamediterraneanseafood.com/", "desktop", OUT / "darna" / "home-desktop.webp"),
    ("https://darnamediterraneanseafood.com/", "mobile", OUT / "darna" / "home-mobile.webp"),
    ("https://dukansyko.com/dukan.html", "desktop", OUT / "dukansyko" / "dukan-desktop.webp"),
    ("https://albaladdeli.com/", "mobile", OUT / "albalad" / "home-mobile.webp"),
]

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900, "mobile": False, "max_width": 1280},
    "mobile": {"width": 390, "height": 844, "mobile": True, "max_width": 390},
}

# Close modals and large fixed overlays, then start any paused videos.
CLEANUP_JS = """
(() => {
  const closeWords = /^(\u00d7|x|close|no thanks|dismiss|got it|accept)$/i;
  document.querySelectorAll('button, a, [role=button], .close, [aria-label]').forEach((el) => {
    const label = (el.getAttribute('aria-label') || el.textContent || '').trim();
    if (closeWords.test(label) || /close/i.test(el.getAttribute('aria-label') || '')) {
      try { el.click(); } catch (e) {}
    }
  });
  document.querySelectorAll('[role=dialog], .modal, .popup, .modal-backdrop, dialog[open]').forEach((el) => el.remove());
  document.querySelectorAll('body *').forEach((el) => {
    const s = getComputedStyle(el);
    if (s.position === 'fixed' && parseInt(s.zIndex || '0', 10) >= 1000 && el.offsetHeight > innerHeight * 0.5) el.remove();
  });
  document.body.style.overflow = 'auto';
  document.querySelectorAll('video').forEach((v) => { v.muted = true; v.play().catch(() => {}); });
  return true;
})()
"""


class Tab:
    def __init__(self, ws_url: str):
        self.ws = websocket.create_connection(ws_url, timeout=60)
        self.next_id = 0

    def send(self, method: str, params: dict | None = None) -> dict:
        self.next_id += 1
        self.ws.send(json.dumps({"id": self.next_id, "method": method, "params": params or {}}))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") == self.next_id:
                return msg.get("result", {})


def capture(tab: Tab, url: str, kind: str, dest: Path) -> None:
    vp = VIEWPORTS[kind]
    tab.send(
        "Emulation.setDeviceMetricsOverride",
        {"width": vp["width"], "height": vp["height"], "deviceScaleFactor": 1, "mobile": vp["mobile"]},
    )
    tab.send("Page.navigate", {"url": url})
    time.sleep(7)
    tab.send("Runtime.evaluate", {"expression": CLEANUP_JS})
    time.sleep(4)
    tab.send("Runtime.evaluate", {"expression": CLEANUP_JS})
    time.sleep(1)
    shot = tab.send("Page.captureScreenshot", {"format": "png"})
    img = Image.open(io.BytesIO(base64.b64decode(shot["data"]))).convert("RGB")
    if img.width > vp["max_width"]:
        img = img.resize((vp["max_width"], round(img.height * vp["max_width"] / img.width)), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=72, method=6)
    print(f"ok   {dest.relative_to(ROOT)} {dest.stat().st_size // 1024} KB", flush=True)


def main() -> None:
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as profile:
        chrome = subprocess.Popen(
            [
                CHROME,
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                "--mute-audio",
                "--autoplay-policy=no-user-gesture-required",
                f"--remote-debugging-port={PORT}",
                f"--user-data-dir={profile}",
                "about:blank",
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        try:
            ws_url = None
            for _ in range(30):
                try:
                    targets = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json"))
                    ws_url = next(t["webSocketDebuggerUrl"] for t in targets if t["type"] == "page")
                    break
                except Exception:
                    time.sleep(0.5)
            if not ws_url:
                raise RuntimeError("Chrome DevTools endpoint did not start")
            tab = Tab(ws_url)
            tab.send("Page.enable")
            for url, kind, dest in JOBS:
                try:
                    capture(tab, url, kind, dest)
                except Exception as exc:
                    print(f"FAIL {url} {kind}: {exc}", flush=True)
        finally:
            subprocess.run(["taskkill", "/T", "/F", "/PID", str(chrome.pid)], capture_output=True)


if __name__ == "__main__":
    main()
