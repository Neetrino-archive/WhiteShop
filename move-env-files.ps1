# Script to find and move all .env files to env folder
$rootPath = "C:\Users\user\Desktop\white shop\White-Shop-templete\WhiteShop-Template"
$envFolder = Join-Path $rootPath "env"

# Create env folder if it doesn't exist
if (-not (Test-Path $envFolder)) {
    New-Item -ItemType Directory -Path $envFolder | Out-Null
}

# Find all .env files recursively
$envFiles = Get-ChildItem -Path $rootPath -Filter ".env*" -Recurse -Force -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notlike "*node_modules*" -and $_.FullName -notlike "*env\*" }

Write-Host "Found $($envFiles.Count) .env files:"
foreach ($file in $envFiles) {
    Write-Host "  $($file.FullName)"
    $destination = Join-Path $envFolder $file.Name
    # If file with same name exists, add parent folder name
    if (Test-Path $destination) {
        $parentName = Split-Path (Split-Path $file.FullName -Parent) -Leaf
        $newName = "$parentName-$($file.Name)"
        $destination = Join-Path $envFolder $newName
    }
    Move-Item -Path $file.FullName -Destination $destination -Force
    Write-Host "    -> Moved to $destination"
}

Write-Host "Done!"

