"""Capture desktop and mobile screenshots of client sites as WebP.

Run: python scripts/capture_clients.py
Output: public/assets/clients/<slug>/<page>-desktop.webp and home-mobile.webp
"""

import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "clients"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

SITES = {
    "mokamo": ("https://mokamoment.com/", ["", "menu.html"]),
    "cluckies": ("https://cluckieshot.com/", ["", "menu.html", "franchise.html"]),
    "darna": ("https://darnamediterraneanseafood.com/", ["", "contact.html"]),
    "aljazeera": ("https://aljazeerahalalmeatmarket.com/", ["", "products.html", "visit.html"]),
    "celestial": ("https://celestialairhvac.com/", ["", "about.html"]),
    "bayroot": ("https://bayrootmeats.com/", [""]),
    "dukansyko": ("https://dukansyko.com/", ["", "restaurant.html", "dukan.html"]),
    "albalad": ("https://albaladdeli.com/", ["", "menu.html", "catering.html"]),
}


def page_name(path: str) -> str:
    return "home" if not path else path.replace(".html", "")


def shoot(url: str, width: int, height: int, dest: Path, max_width: int) -> str:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        return f"skip {dest.relative_to(ROOT)}"
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as tmp:
        png = Path(tmp) / "shot.png"
        cmd = [
            CHROME,
            "--headless=old",
            "--disable-gpu",
            "--hide-scrollbars",
            "--no-first-run",
            "--disable-extensions",
            "--mute-audio",
            f"--window-size={width},{height}",
            "--virtual-time-budget=8000",
            "--timeout=20000",
            f"--user-data-dir={tmp}\\profile",
            f"--screenshot={png}",
            url,
        ]
        proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try:
            proc.wait(timeout=45)
        except subprocess.TimeoutExpired:
            subprocess.run(["taskkill", "/T", "/F", "/PID", str(proc.pid)], capture_output=True)
        if not png.exists():
            return f"FAIL {url} {width}"
        img = Image.open(png).convert("RGB")
        if img.width > max_width:
            img = img.resize((max_width, round(img.height * max_width / img.width)), Image.LANCZOS)
        img.save(dest, "WEBP", quality=72, method=6)
        return f"ok   {dest.relative_to(ROOT)} {dest.stat().st_size // 1024} KB"


def jobs():
    for slug, (base, pages) in SITES.items():
        for path in pages:
            yield (base + path, 1440, 900, OUT / slug / f"{page_name(path)}-desktop.webp", 1280)
        yield (base, 390, 844, OUT / slug / "home-mobile.webp", 390)


if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=4) as pool:
        for line in pool.map(lambda job: shoot(*job), list(jobs())):
            print(line, flush=True)
