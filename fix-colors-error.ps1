# PowerShell script to fix colors and imageUrl columns error
# This script will add the missing columns to the database

Write-Host "Fixing colors and imageUrl columns error..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if we're in the right directory
if (-not (Test-Path "packages\db\prisma\schema.prisma")) {
    Write-Host "Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Step 2: Navigate to packages/db
Set-Location packages\db

Write-Host "Step 1: Pushing schema to database (this will add missing columns)..." -ForegroundColor Yellow
Write-Host ""

# Step 3: Run prisma db push
try {
    npx prisma db push --accept-data-loss
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Schema pushed successfully!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "prisma db push failed. Trying alternative method..." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Please run the SQL script manually:" -ForegroundColor Yellow
        Write-Host "  1. Open QUICK_FIX_COLORS.sql" -ForegroundColor Yellow
        Write-Host "  2. Run it in your PostgreSQL client (pgAdmin, DBeaver, etc.)" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host ""
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Run QUICK_FIX_COLORS.sql manually in your database" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 2: Generating Prisma client..." -ForegroundColor Yellow
Write-Host ""

# Step 4: Generate Prisma client
try {
    npx prisma generate
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Prisma client generated successfully!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "prisma generate failed. Make sure Next.js server is stopped." -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host ""
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure Next.js server is stopped before running this script" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "All done! Now restart your Next.js dev server:" -ForegroundColor Green
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""

# Return to root
Set-Location ..\..
