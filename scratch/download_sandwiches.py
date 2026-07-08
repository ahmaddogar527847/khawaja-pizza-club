import os
import urllib.request
import urllib.parse
import time

prompts = {
    "peninie": "A professional ultra-HD restaurant food photography of a toasted chicken panini sandwich, pressed on a grill showing clean grill marks on the premium golden-brown toasted bread, filled with sliced grilled chicken breast, melted provolone cheese, and fresh spinach. Plated on a dark slate board, warm side lighting, premium café background, close-up side angle, photorealistic",
    "grill": "A professional food photography of a golden-grilled chicken and cheese sandwich, cut diagonally in half showing toasted sourdough bread, melted cheddar and mozzarella cheese oozing out, tender chicken chunks, and green herb mayo. Plated on a wooden board, warm lighting, moody dark background, realistic café menu photo",
    "bbq": "A professional food photography of a premium BBQ chicken sandwich, featuring toasted bread loaded with shredded chicken in smoky dark brown BBQ sauce, melted cheese, and golden caramelized onions. Dark moody background, warm highlights, close-up view showing rich saucy texture, appetizing",
    "mexican": "A professional close-up food photography of a spicy Mexican chicken sandwich, loaded with grilled chicken strips, bright green sliced jalapeños, red salsa, melted cheese, and a dollop of white sour cream in a toasted premium roll. Colorful fresh ingredients, dynamic food styling, dark slate background, warm lighting",
    "club": "A professional studio food photography of a classic triple-decker club sandwich, cut into quarters held with toothpicks. Layered toasted bread sheets with grilled chicken breast slices, melted cheese, fresh green lettuce, and red tomato slices. Elegant restaurant presentation on a dark ceramic plate, side view, realistic"
}

output_dir = "public/images/sandwiches"
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
