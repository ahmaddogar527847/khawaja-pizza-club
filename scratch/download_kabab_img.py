import urllib.request
import os

# List of pasta-with-meat Pexels/Pixabay photos to try
# Looking for: pasta with minced meat / kabab pieces in tomato cream sauce
candidates = [
    # Pasta bolognese / pasta with meat sauce
    ("https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg", "4518843"),
    ("https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg", "1279330"),
    ("https://images.pexels.com/photos/3890119/pexels-photo-3890119.jpeg", "3890119"),
    ("https://images.pexels.com/photos/5949887/pexels-photo-5949887.jpeg", "5949887"),
    ("https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg", "2664216"),
]

out_dir = r"C:\Users\USER\Downloads\Kawaja_Pizza_Club\public\images\pasta"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

for url, name in candidates:
    out_path = os.path.join(out_dir, f"kabab_candidate_{name}.jpg")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        with open(out_path, "wb") as f:
            f.write(data)
        print(f"OK  [{len(data):,} bytes] -> {out_path}")
    except Exception as e:
        print(f"FAIL {url}: {e}")

print("Done.")
