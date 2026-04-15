$token = "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"
$owner = "oneboxonelovee-netizen"
$repo = "domtextilev2"
$projectPath = "c:\Users\max\Documents\domtextilev2"

$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github.v3+json"
}

$filesUploaded = 0
$errors = 0

Write-Host "[*] Loading DomTextil v2.0 to GitHub...`n"

# Get all files
Get-ChildItem -Path $projectPath -Recurse -File | ForEach-Object {
    $file = $_
    $relativePath = $file.FullName.Substring($projectPath.Length + 1)
    
    # Skip .git and other unnecessary files
    if ($relativePath -like ".git*" -or $relativePath -like "upload_to_github.py" -or $relativePath -like "upload_github.ps1") {
        return
    }
    
    try {
        $content = [System.IO.File]::ReadAllBytes($file.FullName)
        $base64Content = [Convert]::ToBase64String($content)
        
        $apiUrl = "https://api.github.com/repos/$owner/$repo/contents/$($relativePath.Replace('\', '/'))"
        
        Write-Host "[+] Uploading: $relativePath..." -NoNewline
        
        $payload = @{
            message = "Add $relativePath"
            content = $base64Content
            branch = "main"
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri $apiUrl -Method PUT -Headers $headers -Body $payload -ErrorAction Stop
        
        Write-Host " [OK]"
        $filesUploaded++
    } catch {
        Write-Host " [ERROR]"
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        $errors++
    }
    
    # Small delay to avoid rate limiting
    Start-Sleep -Milliseconds 500
}

Write-Host "`n[+] Files uploaded: $filesUploaded"
if ($errors -gt 0) {
    Write-Host "[!] Errors: $errors" -ForegroundColor Yellow
}

Write-Host "`n[+] GitHub upload complete!"
Write-Host "[*] Repository: https://github.com/$owner/$repo"
