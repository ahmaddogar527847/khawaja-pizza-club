import os
import urllib.request

photos = {
    "cheese_sauce": {
        "url": "https://images.pexels.com/photos/8439169/pexels-photo-8439169.jpeg",
        "desc": "creamy yellow cheese sauce bowl"
    },
    "chicken_topping": {
        "url": "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg",
        "desc": "grilled chicken breast pieces bowl"
    },
    "dip_sauce": {
        "url": "https://images.pexels.com/photos/4057693/pexels-photo-4057693.jpeg",
        "desc": "creamy garlic dip sauce bowl"
    },
    "peri_peri_sauce": {
        "url": "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg",
        "desc": "fiery red chili peri peri sauce bowl"
    }
}

output_dir = "public/images/toppings"
os.makedirs(output_dir, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}

for name, info in photos.items():
    dest = os.path.join(output_dir, f"{name}.jpg")
    final_url = f"{info['url']}?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
    print(f"Downloading {name} ({info['desc']}) from {final_url}...")
    try:
        req = urllib.request.Request(final_url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(dest, "wb") as f:
                f.write(response.read())
        size = os.path.getsize(dest)
        print(f"  SUCCESS: Saved {dest} ({size} bytes)")
    except Exception as e:
        print(f"  FAIL {name}: {e}")

print("Done.")
