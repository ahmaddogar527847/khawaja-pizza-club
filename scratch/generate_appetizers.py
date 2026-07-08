import os
import urllib.request
import urllib.parse
import time

prompts = {
    "reg_fries": "A professional ultra-HD restaurant food photography of golden crispy french fries, perfectly salted, piled high in a premium black ceramic bowl, light golden-brown potato texture, lightly salted surface, clean simple presentation on a dark slate table, soft warm side lighting, cinematic restaurant food photography, premium fast-food quality, realistic and appetizing",
    "loaded_fries": "A professional ultra-HD restaurant food photography of indulgent loaded cheese fries, golden crispy fries generously topped with melted yellow cheddar cheese sauce, sliced green jalapeños, dollops of white sour cream, crispy fried onion bits, and grilled chicken pieces scattered on top. Served on a dark plate, warm moody lighting, luxury indulgence food styling, premium restaurant presentation, photorealistic",
    "crispy_wings": "A professional ultra-HD restaurant food photography of crispy fried chicken wings, golden-brown crunchy breaded coating with textured crispy flakes, arranged neatly on a dark slate platter with a small white dipping sauce bowl in the center, garnished with fresh parsley, warm dramatic side lighting that highlights the crispy texture, premium restaurant appetizer styling, photorealistic",
    "baked_wings": "A professional ultra-HD restaurant food photography of sticky oven-baked BBQ chicken wings, glazed in a rich dark caramelized smoky barbecue sauce with a glossy sticky finish, slight char marks from roasting, scattered white sesame seeds on top, served on a rustic dark wooden board, warm amber lighting, premium casual restaurant plating, photorealistic",
    "nuggets": "A professional ultra-HD restaurant food photography of golden crispy chicken nuggets, perfectly fried with a light golden crumb coating, arranged on a dark stone plate with a small dish of red tomato ketchup dipping sauce, a few nuggets stacked, soft warm restaurant lighting, simple and clean premium fast-food presentation, highly detailed and realistic",
    "hot_shot": "A professional ultra-HD restaurant food photography of spicy fiery popcorn chicken bites, small golden-brown crispy chicken pieces coated in a vibrant red-orange spicy seasoning powder, scattered red chili flakes, served in a small dark ceramic bowl with a creamy white ranch dipping sauce on the side, moody warm lighting, premium snack presentation, photorealistic texture detail"
}

output_dir = "public/images/appetizers"
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
        with urllib.request.urlopen(req, timeout=60) as response:
            with open(dest, "wb") as f:
                f.write(response.read())
        size = os.path.getsize(dest)
        print(f"  OK saved {dest} ({size} bytes)")
        time.sleep(3)
    except Exception as e:
        print(f"  FAIL {name}: {e}")

print("Done.")
