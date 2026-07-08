import os
import urllib.request
import mimetypes
import uuid
from PIL import Image, ImageEnhance

# Paths
brain_dir = r"C:\Users\USER\.gemini\antigravity\brain\22ffc82b-a9f3-45b0-82e6-bae0998d0d85"
out_dir = r"c:\Users\USER\Downloads\Kawaja_Pizza_Club\public\images\pizzas"
os.makedirs(out_dir, exist_ok=True)

print("Created target directory:", out_dir)

pizzas_to_process = [
    {"src": "fajita_sicilian.png", "dest": "fajita_sicilian.jpg", "name": "Fajita Sicilian Pizza"},
    {"src": "tandoori.png", "dest": "tandoori.jpg", "name": "Tandoori Pizza"},
    {"src": "bar_bq.png", "dest": "bar_bq.jpg", "name": "Bar BQ Pizza"},
    {"src": "peri_peri_hot.png", "dest": "peri_peri_hot.jpg", "name": "Peri Peri Hot Pizza"},
    {"src": "bonfire.png", "dest": "bonfire.jpg", "name": "Bonfire Pizza"},
    {"src": "creamy_delight.png", "dest": "creamy_delight.jpg", "name": "Creamy Delight Pizza"},
    {"src": "peri_peri_deep_dish.png", "dest": "peri_peri_deep_dish.jpg", "name": "Peri Peri Deep Dish"},
    {"src": "kabab_crust.png", "dest": "kabab_crust.jpg", "name": "Kabab Crust Pizza"},
    {"src": "cheese_crust.png", "dest": "cheese_crust.jpg", "name": "Cheese Crust Pizza"},
    {"src": "crown_crust.png", "dest": "crown_crust.jpg", "name": "Crown Crust Pizza"},
    {"src": "peri_peri_xtreme.png", "dest": "peri_peri_xtreme.jpg", "name": "Peri Peri Xtreme"},
    {"src": "mild_xtreme.png", "dest": "mild_xtreme.jpg", "name": "Mild Xtreme"},
    {"src": "crunchy_xtreme.png", "dest": "crunchy_xtreme.jpg", "name": "Crunchy Xtreme"},
    {"src": "tikka_royal.png", "dest": "tikka_royal.jpg", "name": "Tikka Royal Pizza"},
    {"src": "super_crunch.png", "dest": "super_crunch.jpg", "name": "Super Crunch"},
    {"src": "super_labisto.png", "dest": "super_labisto.jpg", "name": "Super Labisto"},
    {"src": "shahi_kabab.png", "dest": "shahi_kabab.jpg", "name": "Shahi Kabab Pizza"},
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
    # Enhance contrast to match the luxury gold/black theme
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.18)
    
    # Decrease brightness slightly for moody dark luxury food photoshoot style
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(0.92)
    
    # Enhance sharpness slightly
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.15)
    
    return img

def upload_to_catbox(file_path):
    url = "https://catbox.moe/user/api.php"
    boundary = "----WebKitFormBoundary" + str(uuid.uuid4().hex)
    
    with open(file_path, "rb") as f:
        file_content = f.read()
        
    filename = os.path.basename(file_path)
    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        mime_type = "application/octet-stream"
        
    parts = []
    # reqtype field
    parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"reqtype\"\r\n\r\nfileupload\r\n".encode('utf-8'))
    # file field
    parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"fileToUpload\"; filename=\"{filename}\"\r\nContent-Type: {mime_type}\r\n\r\n".encode('utf-8'))
    parts.append(file_content)
    parts.append(f"\r\n--{boundary}--\r\n".encode('utf-8'))
    
    body = b"".join(parts)
    
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            res_text = response.read().decode('utf-8').strip()
            return res_text
    except Exception as e:
        print(f"Error uploading {file_path} to catbox.moe: {e}")
        return None

results = {}

print("\n--- PROCESSING GENERATED PIZZAS ---")
for pizza in pizzas_to_process:
    src_path = os.path.join(brain_dir, pizza["src"])
    dest_path = os.path.join(out_dir, pizza["dest"])
    
    if os.path.exists(src_path):
        print(f"\nProcessing {pizza['name']}...")
        with Image.open(src_path) as img:
            # Convert to RGB (in case of RGBA PNGs)
            img_rgb = img.convert("RGB")
            # Crop to square and resize to 800x800
            processed = crop_and_resize(img_rgb, 800)
            # Apply cinematic color grading
            graded = apply_cinematic_grading(processed)
            # Save optimized
            graded.save(dest_path, "JPEG", quality=90, optimize=True)
            print(f"Optimized and saved to local path: {dest_path}")
            
            # Upload to cloud CDN
            print(f"Uploading {pizza['name']} to Catbox.moe...")
            cloud_url = upload_to_catbox(dest_path)
            if cloud_url:
                print(f"Success! Cloud URL: {cloud_url}")
                results[pizza["name"]] = {
                    "local": f"/images/pizzas/{pizza['dest']}",
                    "cloud": cloud_url
                }
            else:
                print(f"Failed to upload {pizza['name']} to cloud.")
    else:
        print(f"WARNING: Source image {src_path} NOT found!")

print("\nProcessing complete. Summary of uploads:")
for name, paths in results.items():
    print(f"'{name}': {{ local: '{paths['local']}', cloud: '{paths['cloud']}' }},")
