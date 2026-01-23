import os
import shutil

SOURCE_DIR = "saii_website"
TARGET_DIR = "node_site"
PUBLIC_DIR = os.path.join(TARGET_DIR, "public")

def convert_php_to_html():
    print("Converting PHP files to HTML...")

    for root, _, files in os.walk(SOURCE_DIR):
        for file in files:
            src_path = os.path.join(root, file)
            rel_path = os.path.relpath(src_path, SOURCE_DIR)
            dest_path = os.path.join(PUBLIC_DIR, rel_path)

            os.makedirs(os.path.dirname(dest_path), exist_ok=True)

            if file.endswith(".php"):
                dest_path = dest_path.replace(".php", ".html")

                with open(src_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()

                content = content.replace("<?php", "").replace("?>", "")

                with open(dest_path, "w", encoding="utf-8") as f:
                    f.write(content)

            else:
                shutil.copy2(src_path, dest_path)

def create_server_files():
    print(" Creating Node.js server files...")

    os.makedirs(TARGET_DIR, exist_ok=True)

    server_js = """\
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
"""

    with open(os.path.join(TARGET_DIR, "server.js"), "w", encoding="utf-8") as f:
        f.write(server_js)

    package_json = """\
{
  "name": "node-static-site",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
"""

    with open(os.path.join(TARGET_DIR, "package.json"), "w", encoding="utf-8") as f:
        f.write(package_json)

def main():
    convert_php_to_html()
    create_server_files()
    print("Node.js conversion COMPLETE")

if __name__ == "__main__":
    main()
