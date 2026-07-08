import os
import urllib.request

urls = {
    "special_zinger": "https://images.pexels.com/photos/8743886/pexels-photo-8743886.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=300",
    "zinger": "https://images.pexels.com/photos/4315148/pexels-photo-4315148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=300",
    "zinger_chipotle": "https://images.pexels.com/photos/14822887/pexels-photo-14822887.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=300",
    "zinger_cheese": "https://images.pexels.com/photos/9509204/pexels-photo-9509204.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=300",
    "mighty_zinger": "https://images.pexels.com/photos/4300412/pexels-photo-4300412.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=300",
    "chicken_patty": "https://images.pexels.com/photos/17121731/pexels-photo-17121731.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=300",
    "tower": "https://images.pexels.com/photos/18987002/pexels-photo-18987002.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=300",
    "crunch": "https://images.pexels.com/photos/20652774/pexels-photo-20652774.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=300",
    "special_zinger2": "https://images.pexels.com/photos/4392635/pexels-photo-4392635.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=300",
}
folder = "tmp_burger_inspect"
os.makedirs(folder, exist_ok=True)
for name, url in urls.items():
    path = os.path.join(folder, f"{name}.jpg")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp, open(path, "wb") as out:
        out.write(resp.read())
    print(name, "saved", path)
