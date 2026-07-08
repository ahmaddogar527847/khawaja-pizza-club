import os
import urllib.request
import urllib.parse
import time

prompts = {
    "khawaja_special_zinger": "A professional ultra-HD restaurant food photography of a signature crispy chicken zinger burger, featuring a thick and extra-crispy golden-brown fried chicken breast fillet, toasted sesame seed brioche bun, fresh green lettuce, a slice of ripe red tomato, and special burger sauce dripping down slightly. Plated on a dark slate surface, moody lighting with warm gold highlights, premium restaurant environment, side angle close-up, photorealistic",
    "zinger": "A professional food photography of a classic chicken zinger burger, featuring a golden-fried crispy chicken fillet, soft sesame seed bun, creamy white coleslaw visible inside, fresh lettuce. Simple elegant plating, warm side lighting, dark slate background, realistic restaurant menu photo",
    "zinger_chipotle": "A professional close-up food photography of a gourmet crispy chicken zinger burger, featuring a thick crispy chicken fillet, smoky orange chipotle mayo sauce dripping down, sliced green jalapeños, and a touch of light green avocado cream inside a toasted bun. Elegant dark moody restaurant background, cinematic lighting",
    "zinger_cheese": "A professional ultra-HD food photography of a melted cheese zinger burger, featuring a crispy golden-fried chicken fillet, double layers of melted yellow cheddar cheese draped over the chicken, fresh lettuce, and pickle slices inside a toasted sesame bun. Studio food lighting, dark background, appetizing, photorealistic",
    "mighty_zinger": "A professional cinematic food photography of a massive double mighty zinger burger, towering stack with two thick and extra-crispy golden-fried chicken breast fillets, melted cheese slices between them, fresh lettuce, sliced tomatoes, premium gourmet sauce, toasted brioche bun. Plated on a luxury dark plate, moody atmospheric restaurant background, dramatic warm lighting, extremely premium and expensive look",
    "chicken_patty": "A clean professional food photography of a classic chicken patty burger, featuring a juicy grilled ground chicken patty with light grill marks, plain toasted sesame bun, fresh lettuce, tomato slice, red onion ring, and house burger sauce. Simple and neat presentation, bright and clean modern dining background, value tier menu photography",
    "tower": "A professional studio food photography of a tall towering chicken burger, layered stack featuring a crispy fried chicken fillet, a slice of melted cheese, a golden-brown crispy potato hash brown patty, fresh lettuce, and special sauce in a toasted sesame bun. Tall composition, clean side view, elegant dark wood table, restaurant presentation",
    "crunch": "A professional close-up photography of a super crunchy chicken burger, featuring an ultra-crispy heavily battered fried chicken fillet with a craggy cornflake crust, creamy tangy coleslaw, and a visible drizzle of spicy red sriracha sauce inside a toasted artisanal bun. Sharp focus on crunchy textures, dark slate background, warm light highlights",
    "special_zinger": "A professional gourmet food photography of a special recipe zinger burger, featuring a golden-brown crispy fried chicken breast fillet with a unique house-recipe coating, signature orange-colored secret sauce, toasted brioche bun, and fresh green lettuce. Clean and elegant composition, high-end restaurant food styling, soft background blur"
}

output_dir = "public/images/burgers"
os.makedirs(output_dir, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

for name, prompt in prompts.items():
    # Fetching 800x600 size (4:3 aspect ratio) matching the original design
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
