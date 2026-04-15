#!/usr/bin/env python3
import os
import requests
import base64
import json
from pathlib import Path

# GitHub config
GITHUB_TOKEN = "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"
GITHUB_USERNAME = "oneboxonelovee-netizen"
REPO_NAME = "domtextilev2"
GITHUB_API = f"https://api.github.com/repos/{GITHUB_USERNAME}/{REPO_NAME}/contents"

# Vercel config
VERCEL_TOKEN = "vercel_token_placeholder"  # Will be set later if needed

# Get all files from domtextilev2 directory
PROJECT_DIR = r"c:\Users\max\Documents\domtextilev2"

def upload_files_to_github():
    """Upload all files to GitHub repository"""
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    files_uploaded = 0
    errors = []
    
    for root, dirs, files in os.walk(PROJECT_DIR):
        # Skip .git folder
        if '.git' in dirs:
            dirs.remove('.git')
        
        for file in files:
            file_path = os.path.join(root, file)
            relative_path = os.path.relpath(file_path, PROJECT_DIR)
            
            try:
                with open(file_path, 'rb') as f:
                    content = f.read()
                
                # Encode content to base64
                encoded_content = base64.b64encode(content).decode('utf-8')
                
                # Prepare GitHub API request
                api_url = f"{GITHUB_API}/{relative_path}"
                payload = {
                    "message": f"Add {relative_path}",
                    "content": encoded_content,
                    "branch": "main"
                }
                
                print(f"📤 Uploading: {relative_path}...", end=" ")
                response = requests.put(api_url, headers=headers, json=payload)
                
                if response.status_code in [201, 200]:
                    print("✅")
                    files_uploaded += 1
                else:
                    error_msg = f"{relative_path}: {response.status_code} - {response.text}"
                    print(f"❌")
                    errors.append(error_msg)
                    
            except Exception as e:
                error_msg = f"{relative_path}: {str(e)}"
                print(f"❌")
                errors.append(error_msg)
    
    print(f"\n✅ Загружено файлов: {files_uploaded}")
    if errors:
        print(f"\n⚠️ Ошибки ({len(errors)}):")
        for error in errors:
            print(f"  - {error}")
    
    return files_uploaded > 0

if __name__ == "__main__":
    print("🚀 Загрузка DomTextil v2.0 на GitHub...\n")
    
    if upload_files_to_github():
        print("\n✅ GitHub upload complete!")
        print(f"🔗 Repository: https://github.com/{GITHUB_USERNAME}/{REPO_NAME}")
    else:
        print("\n❌ Upload failed!")
