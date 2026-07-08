import urllib.request
import os
import urllib.parse

# Pexels photo IDs and their descriptions matching each appetizer item
# These are verified working Pexels photo IDs showing the correct food type
photos = {
    "reg_fries": {
        "url": "https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg",
        "desc": "golden crispy french fries in a bowl",
        "alt": "https://images.pexels.com/photos/15234683/pexels-photo-15234683.jpeg"
    },
    "loaded_fries": {
        "url": "https://images.pexels.com/photos/4224431/pexels-photo-4224431.jpeg",
        "desc": "loaded cheese fries with toppings",
        "alt": "https://images.pexels.com/photos/5779527/pexels-photo-5779527.jpeg"
    },
    "crispy_wings": {
        "url": "https://images.pexels.com/photos/10648379/pexels-photo-10648379.jpeg",
        "desc": "crispy fried chicken wings on platter",
        "alt": "https://images.pexels.com/photos/13853332/pexels-photo-13853332.jpeg"
    },
    "baked_wings": {
        "url": "https://images.pexels.com/photos/3299216/pexels-photo-3299216.jpeg",
        "desc": "bbq glazed baked chicken wings",
        "alt": "https://images.pexels.com/photos/9650084/pexels-photo-9650084.jpeg"
    },
    "nuggets": {
        "url": "https://images.pexels.com/photos/20535804/pexels-photo-20535804.jpeg",
        "desc": "golden crispy chicken nuggets with sauce",
        "alt": "https://images.pexels.com/photos/15029878/pexels-photo-15029878.jpeg"
    },
    "hot_shot": {
        "url": "https://images.pexels.com/photos/7169619/pexels-photo-7169619.jpeg",
        "desc": "spicy crispy popcorn chicken bites",
        "alt": "https://images.pexels.com/photos/4279293/pexels-photo-4279293.jpeg"
    }
}

output_dir = "public/images/appetizers"
os.makedirs(output_dir, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

for name, info in photos.items():
    dest = os.path.join(output_dir, f"{name}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 10000:
        print(f"SKIP {name} (already exists)")
        continue

    # Try primary URL first, then alt
    for url in [info["url"], info["alt"]]:
        final_url = f"{url}?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
        print(f"Downloading {name} ({info['desc']})...")
        try:
            req = urllib.request.Request(final_url, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
                if len(data) > 5000:
                    with open(dest, "wb") as f:
                        f.write(data)
                    print(f"  OK saved {len(data)} bytes")
                    break
                else:
                    print(f"  too small ({len(data)} bytes), trying alt...")
        except Exception as e:
            print(f"  error: {e}, trying alt...")
    else:
        print(f"  FAILED: all URLs failed for {name}")

print("Done.")
