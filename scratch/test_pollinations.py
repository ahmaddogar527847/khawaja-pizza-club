import os
import urllib.request
import urllib.parse

prompt = "garlic dip sauce in a black bowl"
url = f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?width=800&height=600&nologo=true&private=true"
dest = "public/images/toppings/test_dip.jpg"

os.makedirs("public/images/toppings", exist_ok=True)
headers = {"User-Agent": "Mozilla/5.0"}

print(f"Downloading test dip from: {url}")
try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as response:
        with open(dest, "wb") as f:
            f.write(response.read())
    print(f"SUCCESS: Saved {dest} ({os.path.getsize(dest)} bytes)")
except Exception as e:
    print(f"FAILED: {e}")
