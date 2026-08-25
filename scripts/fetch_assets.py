import re
from pathlib import Path
from urllib.request import Request, urlopen

root = Path(__file__).resolve().parents[1]
html_path = root / "data" / "vertex.html"
out_dir = root / "public" / "assets" / "projects" / "vertex"
out_dir.mkdir(parents=True, exist_ok=True)

html = html_path.read_text(encoding="utf-8", errors="ignore") if html_path.exists() else ""
patterns = re.findall(r"(?:src|data-src|content|href)=[\"']([^\"']+)[\"']", html)
urls = []
for u in patterns:
    low = u.lower()
    if any(x in low for x in [".png", ".jpg", ".jpeg", ".webp", ".svg", "wp-content", "uploads", "logo"]):
        if u.startswith("//"):
            u = "https:" + u
        elif u.startswith("/"):
            u = "https://www.vertexreviews.com" + u
        if u.startswith("http"):
            urls.append(u)

# also og:image
for m in re.findall(r'property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html):
    urls.append(m)
for m in re.findall(r'content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', html):
    urls.append(m)

seen = []
for u in urls:
    if u not in seen:
        seen.append(u)

print(f"found {len(seen)} urls")
for i, u in enumerate(seen[:20]):
    print(i, u)
    try:
        req = Request(u, headers={"User-Agent": "Mozilla/5.0"})
        data = urlopen(req, timeout=20).read()
        ext = ".png"
        for e in [".png", ".jpg", ".jpeg", ".webp", ".svg"]:
            if e in u.lower():
                ext = e
                break
        name = f"asset-{i}{ext}"
        if "logo" in u.lower():
            name = f"logo{ext}"
        if "og" in u.lower() or i == 0:
            name = f"homepage{ext}" if i == 0 else name
        (out_dir / name).write_bytes(data)
        print(" saved", name, len(data))
    except Exception as exc:
        print(" fail", exc)
