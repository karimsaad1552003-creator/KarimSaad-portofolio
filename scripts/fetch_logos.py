import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "logos"
OUT.mkdir(parents=True, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=25).read().decode("utf-8", "ignore")


def abs_url(base: str, src: str) -> str:
    if src.startswith("//"):
        return "https:" + src
    if src.startswith("/"):
        origin = base.split("/")[0] + "//" + base.split("/")[2]
        return origin + src
    if src.startswith("http"):
        return src
    return base.rstrip("/") + "/" + src


pages = {
    "ascendra": "https://ascendrasol.com/",
    "vertex": "https://www.vertexreviews.com/",
}

for name, page in pages.items():
    html = fetch(page)
    print("====", name, len(html))
    found = []
    for src in re.findall(r"""(?:src|href|content)=["']([^"']+)["']""", html):
        low = src.lower()
        if any(x in low for x in ["logo", "icon", "brand", ".svg", ".png", ".webp", "apple-touch"]):
            found.append(abs_url(page, src))
    # unique preserve order
    seen = []
    for u in found:
        if u not in seen:
            seen.append(u)
    for i, u in enumerate(seen[:15]):
        print(i, u)
        try:
            req = urllib.request.Request(u, headers=UA)
            data = urllib.request.urlopen(req, timeout=25).read()
            ext = ".png"
            for e in [".svg", ".png", ".webp", ".jpg", ".jpeg", ".ico"]:
                if e in u.lower().split("?")[0]:
                    ext = e
                    break
            path = OUT / f"{name}-{i}{ext}"
            path.write_bytes(data)
            print("  saved", path.name, len(data))
        except Exception as exc:
            print("  fail", exc)
