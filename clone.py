import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from tqdm import tqdm

BASE_URL = "https://saii.edu.in/"
OUTPUT_DIR = "saii_website"
visited = set()

def is_internal(url):
    return urlparse(url).netloc == urlparse(BASE_URL).netloc or urlparse(url).netloc == ""

def save_file(url, content):
    parsed = urlparse(url)
    path = parsed.path

    if path.endswith("/") or path == "":
        path += "index.html"

    file_path = os.path.join(OUTPUT_DIR, path.lstrip("/"))
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    with open(file_path, "wb") as f:
        f.write(content)

def crawl(url):
    if url in visited:
        return
    visited.add(url)

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except:
        return

    content_type = response.headers.get("Content-Type", "")

    if "text/html" not in content_type:
        save_file(url, response.content)
        return

    soup = BeautifulSoup(response.text, "html.parser")

    # Download assets
    for tag in soup.find_all(["link", "script", "img"]):
        attr = "href" if tag.name == "link" else "src"
        if tag.has_attr(attr):
            asset_url = urljoin(url, tag[attr])
            if is_internal(asset_url):
                try:
                    asset = requests.get(asset_url, timeout=10)
                    save_file(asset_url, asset.content)
                    tag[attr] = asset_url.replace(BASE_URL, "/")
                except:
                    pass

    # Save HTML
    save_file(url, soup.prettify("utf-8"))

    # Crawl internal links
    for link in soup.find_all("a", href=True):
        next_url = urljoin(url, link["href"])
        if is_internal(next_url):
            crawl(next_url)

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    crawl(BASE_URL)
    print("✅ Website cloning completed.")
