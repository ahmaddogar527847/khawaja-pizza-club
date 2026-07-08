import os
import urllib.request
from PIL import Image, ImageEnhance

# Paths
brain_dir = r"C:\Users\USER\.gemini\antigravity\brain\cd50470c-2a6a-4545-9303-835d5adf50be"
out_dir = r"c:\Users\USER\Downloads\Kawaja_Pizza_Club\public\images\pizzas"
os.makedirs(out_dir, exist_ok=True)

print("Created target directory:", out_dir)

# 1. 11 Generated Premium PNG Images
generated_pizzas = [
    {"src": "real_tikka_pizza_1779218104290.png", "dest": "real_tikka.jpg"},
    {"src": "cheese_lover_pizza_1779218166672.png", "dest": "cheese_lover.jpg"},
    {"src": "behari_kabab_pizza_1779218354284.png", "dest": "behari_kabab.jpg"},
    {"src": "chipotle_pizza_1779218557970.png", "dest": "chipotle.jpg"},
    {"src": "bbq_texas_pizza_1779218587805.png", "dest": "bbq_texas.jpg"},
    {"src": "super_supreme_pizza_1779218613738.png", "dest": "super_supreme.jpg"},
    {"src": "bonfire_pizza.png", "dest": "bonfire.jpg"},
    {"src": "tandoori_pizza.png", "dest": "tandoori.jpg"},
    {"src": "creamy_delight_pizza.png", "dest": "creamy_delight.jpg"},
    {"src": "fajita_sicilian_pizza.png", "dest": "fajita_sicilian.jpg"},
    {"src": "peri_peri_hot_pizza.png", "dest": "peri_peri_hot.jpg"},
]

def crop_and_resize(img, size=800):
    width, height = img.size
    min_dim = min(width, height)
    left = int((width - min_dim) / 2)
    top = int((height - min_dim) / 2)
    right = int((width + min_dim) / 2)
    bottom = int((height + min_dim) / 2)
    
    cropped = img.crop((left, top, right, bottom))
    resized = cropped.resize((size, size), Image.Resampling.LANCZOS)
    return resized

def apply_cinematic_grading(img):
    # Make it slightly darker, more contrasty to fit the luxury gold/black theme
    # Enhance contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.18)
    
    # Decrease brightness slightly for moody dark luxury food photoshoot style
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(0.92)
    
    # Enhance sharpness slightly
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.15)
    
    return img

print("\n--- PROCESSING GENERATED PIZZAS ---")
for pizza in generated_pizzas:
    src_path = os.path.join(brain_dir, pizza["src"])
    dest_path = os.path.join(out_dir, pizza["dest"])
    
    if os.path.exists(src_path):
        print(f"Processing {pizza['src']} -> {pizza['dest']}")
        with Image.open(src_path) as img:
            # Convert to RGB (in case of RGBA PNGs)
            img_rgb = img.convert("RGB")
            # Crop to square and resize to 800x800
            processed = crop_and_resize(img_rgb, 800)
            # Save optimized
            processed.save(dest_path, "JPEG", quality=90, optimize=True)
            print(f"Successfully optimized and saved to {dest_path}")
    else:
        print(f"WARNING: Source image {src_path} NOT found!")

# 2. 6 Unsplash Premium Pizzas (Downloaded, Cropped, and Cinematically Graded)
unsplash_pizzas = [
    {"id": "1593560708920-61dd98c46a4e", "dest": "bar_bq.jpg", "name": "Bar BQ Pizza"},
    {"id": "1534308983496-4fabb1a015ee", "dest": "peri_peri_deep_dish.jpg", "name": "Peri Peri Deep Dish"},
    {"id": "1573821663912-569905455b1c", "dest": "kabab_crust.jpg", "name": "Kabab Crust Pizza"},
    {"id": "1585238342024-78d387f4a707", "dest": "cheese_crust.jpg", "name": "Cheese Crust Pizza"},
    {"id": "1528137871618-79d2761e3fd5", "dest": "tikka_royal.jpg", "name": "Tikka Royal Pizza"},
    {"id": "1588315029754-2dd089d39a1a", "dest": "shahi_kabab.jpg", "name": "Shahi Kabab Pizza"},
]

print("\n--- PROCESSING UNSPLASH PIZZAS ---")
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for pizza in unsplash_pizzas:
    url = f"https://images.unsplash.com/photo-{pizza['id']}?w=1200&q=95"
    dest_path = os.path.join(out_dir, pizza["dest"])
    
    print(f"Downloading {pizza['name']} from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        temp_path = dest_path + ".tmp"
        with urllib.request.urlopen(req) as response, open(temp_path, 'wb') as out_file:
            out_file.write(response.read())
            
        # Load and process
        with Image.open(temp_path) as img:
            img_rgb = img.convert("RGB")
            # Crop to square and resize to 800x800
            processed = crop_and_resize(img_rgb, 800)
            # Apply cinematic color grading
            graded = apply_cinematic_grading(processed)
            # Save optimized
            graded.save(dest_path, "JPEG", quality=90, optimize=True)
            print(f"Successfully processed, graded, and saved {pizza['name']} to {dest_path}")
            
        # Clean up temp file
        os.remove(temp_path)
    except Exception as e:
        print(f"ERROR downloading or processing {pizza['name']}: {e}")

print("\nAll 17 pizzas processing complete!")
