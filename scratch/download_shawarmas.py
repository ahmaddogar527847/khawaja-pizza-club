import os
import urllib.request
import urllib.parse
import time

prompts = {
    "chicken_shawarma": "A professional ultra-HD restaurant food photography of an authentic chicken shawarma wrap, cut in half to show the juicy grilled spiced chicken filling, fresh cucumber, tomatoes, and garlic sauce inside a soft flatbread wrap. Plated on a dark slate board, moody lighting, premium restaurant background, close-up side angle, photorealistic",
    "zinger_shawarma": "A professional close-up food photography of a zinger chicken shawarma wrap, cut in half showing extra-crispy golden-fried zinger chicken tenders, shredded lettuce, and creamy garlic mayo wrapped in a soft flatbread. Dark slate background, warm dramatic side lighting, appetizing texture",
    "cheese_shawarma": "A professional food photography of a hot melted cheese chicken shawarma wrap, with warm melted yellow cheddar and white mozzarella cheese oozing out of the cut end along with tender grilled chicken and creamy garlic sauce. Toasted flatbread wrap with grill marks, cinematic lighting, elegant dark table setting",
    "paratha_shawarma": "A professional food photography of a paratha shawarma roll, wrapped in a crispy, flaky, golden-brown layered paratha flatbread. Visible filling of spiced grilled chicken tikka chunks, sliced red onions, and green herb chutney. Desi restaurant style presentation, plated on a rustic dark plate, moody side lighting, detailed flaky texture",
    "shawarma_platter": "A professional gourmet food photography of a premium shawarma platter. Neatly sliced pieces of chicken shawarma arranged on a large dark platter, served with a side of crispy golden french fries, a small ceramic bowl of creamy garlic dip, a bowl of spicy red sauce, and a fresh salad. Rich details, luxury restaurant plating, cinematic lighting, dark background"
}

output_dir = "public/images/shawarma"
os.makedirs(output_dir, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

for name, prompt in prompts.items():
    url = f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?width=800&height=600&nologo=true&private=true&model=flux"
    dest = os.path.join(output_dir, f"{name}.jpg")
    print(f"Downloading {name} from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(dest, "wb") as f:
                f.write(response.read())
        print(f"Successfully saved {dest}")
        time.sleep(2)  # Avoid rate limiting
    except Exception as e:
        print(f"Error downloading {name}: {e}")
