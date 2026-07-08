import os
import urllib.request
import urllib.parse
import time

prompts = {
    "flaming": "A professional ultra-HD restaurant food photography of a spicy flaming arabiata pasta, creamy deep-red and orange fiery sauce coating penne pasta, topped with juicy grilled chicken chunks, scattered dried chili flakes, and fresh basil leaves. Served in a wide dark ceramic bowl, cinematic moody lighting, warm red-gold highlights, premium Italian restaurant style, photorealistic",
    "kabab": "A professional food photography of a premium kabab pasta, featuring smooth creamy tomato-cream sauce coating penne pasta, topped with sliced grilled minced chicken seekh kabab pieces with smoky char marks, fresh green herbs, and a drizzle of cream. Dark elegant plate, moody atmospheric lighting, premium restaurant plating, photorealistic",
    "crunchy": "A professional food photography of an indulgent crunchy chicken pasta, creamy rich parmesan sauce coating penne pasta topped with golden-brown crispy fried chicken bites, scattered toasted breadcrumbs for texture, grated parmesan shavings, and fresh green parsley. Dark stone surface, warm side lighting, premium restaurant presentation",
    "lasagna": "A professional ultra-HD food photography of a premium baked lasagna slice served on a dark plate, showing rich layered pasta sheets with creamy white bechamel sauce, golden melted mozzarella cheese on top with slight browning, and rich tomato chicken filling visible at the sides. Fork resting beside, elegant restaurant presentation, cinematic lighting",
    "plain": "A professional food photography of a simple elegant creamy chicken pasta, smooth white cream sauce coating tagliatelle or fettuccine pasta noodles, garnished with a sprinkle of grated parmesan and a single fresh basil leaf. Clean premium Italian restaurant plating on a dark wide plate, soft warm lighting, minimal and appetizing"
}

output_dir = "public/images/pasta"
os.makedirs(output_dir, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

for name, prompt in prompts.items():
    dest = os.path.join(output_dir, f"{name}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 10000:
        print(f"SKIP {name} (already exists)")
        continue
    url = f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?width=800&height=600&nologo=true&private=true&model=flux"
    print(f"Downloading {name}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(dest, "wb") as f:
                f.write(response.read())
        size = os.path.getsize(dest)
        print(f"  OK saved {dest} ({size} bytes)")
        time.sleep(2)
    except Exception as e:
        print(f"  FAIL {name}: {e}")

print("Done.")
