import os
import urllib.request
import urllib.parse
import time
import socket

# Set socket timeout to prevent hanging forever
socket.setdefaulttimeout(30)

IMAGE_SPECS = {
    # ── HIGH PRIORITY MENU ITEMS ─────────────────────────────────────────────
    "sandwiches/grill.jpg": 
        "A professional close-up food photography of a premium grilled chicken and cheese sandwich, cut diagonally in half, showing grill marks on the golden-brown sourdough bread, melted cheddar and mozzarella cheese oozing out, tender seasoned chicken chunks, and fresh herbs inside. Plated on a dark wooden board, warm cinematic side lighting, elegant restaurant background.",
    
    "sandwiches/chicken_shawarma_grill.jpg": 
        "A professional food photography of a premium Chicken Shawarma Grill Sandwich. Golden-toasted panini-style bread with perfect dark grill marks, filled with sliced spiced shawarma-style chicken, oozing melted cheese, sliced pickles, and garlic sauce. Plated on a slate board, dramatic side lighting, appetizing close-up, commercial quality.",
    
    "pasta/plain.jpg": 
        "A premium restaurant-quality food photography of an authentic plain pasta dish. Perfectly cooked al dente penne pasta tossed in a simple, clean, light white garlic parmesan cream sauce, garnished with fresh basil leaves and a sprinkle of black pepper. Served in a clean white porcelain bowl, sharp focus, modern minimalist style, moody restaurant lighting.",
    
    "pizzas/bonfire.jpg": 
        "A professional commercial food photography of a premium bonfire-spiced chicken pizza. Hand-stretched golden crust, bubbling hot mozzarella cheese pull as a slice is lifted, topped with red onions, fresh coriander, smoky charred chicken chunks, and a light smoky spice sprinkle. Appetizing steam rising, dark slate background, warm dramatic side lighting.",
    
    "platters/sandwich_platter.jpg": 
        "A gourmet food photography of a premium sandwich platter. Multiple neatly sliced halves of a club sandwich arranged beautifully on a large ceramic platter, served with a generous side of crispy golden-yellow french fries, a small white bowl of creamy dip sauce, and hot wings. High-end restaurant presentation, dramatic lighting, sharp focus, commercial food photography.",
    
    "wrap_rolls/behari_roll.jpg": 
        "An authentic Pakistani Chicken Behari Roll. Tender, smoky, chargrilled chicken behari boti pieces wrapped in a flaky, crispy golden-brown paratha bread. Visible green chutney, sliced red onions, and juicy chicken filling. Traditional street food presentation, plated on a dark rustic plate, warm dramatic lighting, photorealistic.",
    
    "broast/chicken_leg.jpg": 
        "A professional restaurant-style food photography of a golden, extra-crispy fried chicken leg broast. Thick, crunchy, craggy golden-brown coating, perfectly seasoned. Presented on a wire rack with a side of dipping sauce and a lemon wedge, hot and fresh, steam rising, professional studio lighting, macro details.",
    
    "toppings/cheese_chicken_dip_sauce.jpg": 
        "A professional gourmet close-up of a creamy white cheese chicken dip sauce. Served in a premium small white ceramic bowl, showing a smooth, rich, creamy cheese sauce with tiny visible chunks of grilled chicken breast and a sprinkle of chopped chives. Plated next to a few crispy golden fries, elegant dark background, commercial quality.",
    
    "toppings/dip_sauce.jpg": 
        "A professional restaurant food photography of a premium creamy garlic dip sauce. Smooth white sauce in a sleek white ceramic bowl, garnished with a tiny sprig of fresh dill and cracked black pepper. Modern clean minimalist plating, dramatic side highlights, upscale restaurant menu image.",
    
    "toppings/peri_peri_sauce.jpg": 
        "An authentic fiery red peri peri sauce in a premium black ceramic dipping bowl. Vibrant orange-red color, smooth thick texture, garnished with a tiny slice of red chili. Plated on a dark slate surface, modern clean setup, sharp focus, commercial food photography.",

    # ── DEALS & COMBOS ──────────────────────────────────────────────────────────
    "deals/deal_1.jpg": 
        "A professional high-end food photography of a fast food combo meal: one premium crispy zinger burger with golden fried chicken fillet, fresh lettuce and mayo, a side of hot crispy french fries in a small container, and a cold soft drink bottle next to it. Arranged on a dark wooden table, dramatic warm lighting, photorealistic.",
    
    "deals/deal_2.jpg": 
        "A premium commercial food photography of a double fast food combo: two identical extra-crispy golden zinger burgers, two portions of crispy golden fries, and a cold bottle of soft drink. Elegant restaurant presentation, moody dark slate background, warm dramatic side lighting, appetizing textures.",
    
    "deals/deal_3.jpg": 
        "A high-end studio food photography of a triple burger combo: three premium zinger burgers with thick crispy chicken fillets, a basket of golden fries, and a large 1-liter bottle of soft drink. Arranged on a dark wood table, warm inviting glow, professional restaurant advertising style.",
    
    "deals/deal_4.jpg": 
        "A professional gourmet food photography of a fast food feast: one small freshly-baked chicken pizza with melted bubbling cheese, one thick crispy zinger burger, and a large cold bottle of soft drink. Served on a dark slate counter, steam rising, commercial quality, appetizing.",
    
    "deals/deal_5.jpg": 
        "A premium advertising food photography of a pizza combo: one medium freshly-baked pan pizza topped with spiced chicken, peppers and olives, a portion of hot golden fries, and a large 1.5-liter bottle of soft drink. Elegant dark background, dramatic side highlights.",
    
    "deals/deal_6.jpg": 
        "A gourmet restaurant food photography of a premium combo: one large loaded pan pizza with abundant cheese and toppings, one crispy golden chicken zinger burger, and a cold 1.5-liter soft drink. Beautifully arranged on a rustic dark wooden table, warm ambient lighting.",
    
    "deals/family_deal_1.jpg": 
        "A professional commercial group shot of a family feast: six identical premium crispy chicken zinger burgers stacked beautifully, with a large 1.5-liter soft drink bottle in the background. Abundant and mouth-watering, warm cinematic lighting, dark restaurant background.",
    
    "deals/family_deal_2.jpg": 
        "A high-end food photography of a pizza party combo: two small freshly-baked deep-pan pizzas with melting cheese and toppings, a basket of crispy golden-yellow fries, and a cold 1-liter soft drink bottle. Arranged on a black slate surface, dramatic shadows.",
    
    "deals/family_deal_3.jpg": 
        "A premium commercial food photography of a family pizza combo: two medium piping hot deep-pan pizzas loaded with chicken, peppers and rich cheese pull, a bowl of crispy golden fries, and a 1.5-liter bottle of soft drink. High-quality food styling, moody lighting.",
    
    "deals/family_deal_4.jpg": 
        "A professional gourmet food photography of an ultimate feast: one giant extra-large (XL) pan pizza loaded with chicken and vegetables, one crispy chicken zinger burger, a basket of hot french fries, and a large 1.5-liter bottle of soft drink. Abundant, appetizing, top-down angle, dark wooden table."
}

output_base = "public/images"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def download_image(rel_path, prompt):
    dest = os.path.join(output_base, rel_path)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    
    # URL encode the prompt and format for pollinations AI using Flux model for top quality
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=800&height=600&nologo=true&private=true&model=flux"
    
    print(f"\n[+] Processing: {rel_path}")
    
    for attempt in range(1, 4):
        print(f"    - Attempt {attempt} to download from Pollinations...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response:
                content = response.read()
                if len(content) < 5000:
                    raise Exception("Downloaded file is too small, likely an error response.")
                with open(dest, "wb") as f:
                    f.write(content)
            print(f"    [ok] Successfully saved to {dest} ({len(content)} bytes)")
            return True
        except Exception as e:
            print(f"    [fail] Attempt {attempt} failed: {e}")
            if attempt < 3:
                time.sleep(3)
    return False

def main():
    print("[start] Starting premium image download process for Khawaja Pizza Club...")
    success_count = 0
    fail_count = 0
    
    start_time = time.time()
    
    for rel_path, prompt in IMAGE_SPECS.items():
        if download_image(rel_path, prompt):
            success_count += 1
        else:
            fail_count += 1
        # Gentle rate limit sleep
        time.sleep(1.5)
        
    duration = time.time() - start_time
    print("\n" + "="*50)
    print("[done] Download completed!")
    print(f"    - Successful downloads: {success_count}/{len(IMAGE_SPECS)}")
    print(f"    - Failed downloads: {fail_count}/{len(IMAGE_SPECS)}")
    print(f"    - Total duration: {duration:.1f} seconds")
    print("="*50)

if __name__ == "__main__":
    main()
