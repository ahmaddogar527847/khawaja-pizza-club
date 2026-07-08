import os
import urllib.request
import urllib.parse
import time

prompts = {
    "cheese_sauce": "A premium, close-up shot of rich, glossy yellow cheddar cheese sauce in a beautiful black ceramic dipping cup, smooth texture, dark cinematic restaurant lighting, premium food photography style, black background",
    "chicken_topping": "A premium, close-up shot of tender grilled chicken breast pieces in a small dark ceramic dish, perfectly seasoned with light golden char marks, glistening surface, dark moody side lighting, professional restaurant food photography",
    "dip_sauce": "A premium, close-up shot of white creamy garlic mayo dipping sauce in a sleek black ceramic bowl, garnished with a tiny pinch of green herbs, dark dramatic restaurant lighting, luxury food photography, black background",
    "peri_peri_sauce": "A premium, close-up shot of a vibrant fiery red-orange peri peri sauce in a small black ceramic dipping cup, dark moody lighting, luxury food photography, black background, rich glossy sauce texture"
}

output_dir = "public/images/toppings"
os.makedirs(output_dir, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

for name, prompt in prompts.items():
    dest = os.path.join(output_dir, f"{name}.jpg")
    url = f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?width=800&height=600&nologo=true&private=true&model=flux"
    print(f"Downloading {name}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=60) as response:
            with open(dest, "wb") as f:
                f.write(response.read())
        size = os.path.getsize(dest)
        print(f"  OK saved {dest} ({size} bytes)")
        time.sleep(3)
    except Exception as e:
        print(f"  FAIL {name}: {e}")

print("Done.")
