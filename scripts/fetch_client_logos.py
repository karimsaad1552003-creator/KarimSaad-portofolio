"""Download client logos published on ascendrasol.com into public/assets/clients/<slug>/logo.webp."""

import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "clients"

LOGOS = {
    "cluckies": "cluckies.webp",
    "darna": "darna.webp",
    "aljazeera": "aljazeera.webp",
    "celestial": "celestial-air.webp",
    "bayroot": "bayroot.webp",
    "dukansyko": "dokan-syko.webp",
    "albalad": "al-balad-deli.webp",
}

for slug, name in LOGOS.items():
    url = f"https://ascendrasol.com/assets/logos/{name}"
    dest = OUT / slug / "logo.webp"
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    dest.write_bytes(urllib.request.urlopen(req, timeout=30).read())
    print(f"{slug}: {dest.stat().st_size // 1024} KB")
