# Migration Instructions - Add Colors and ImageUrl to AttributeValue

## Խնդիր
Prisma Client-ը փորձում է օգտագործել `colors` և `imageUrl` column-ները `attribute_values` table-ում, բայց դրանք դեռ չկան database-ում:

## Լուծում

### Քայլ 1: Database Migration

Աշխատեցրեք migration-ը database-ում:

#### Տարբերակ 1: Prisma db push (Արագ, Development-ի համար)

```bash
cd packages/db
npx prisma db push
```

#### Տարբերակ 2: SQL Migration (Ուղղակիորեն Database-ում)

Եթե ունեք database connection, կարող եք աշխատեցնել SQL migration-ը ուղղակիորեն:

1. Բացեք `packages/db/prisma/migrations/add_colors_and_image_to_attribute_value.sql`
2. Աշխատեցրեք SQL-ը ձեր database-ում (pgAdmin, DBeaver, psql, կամ այլ tool):

```sql
-- Add colors column (JSONB) to store array of color hex codes
ALTER TABLE "attribute_values" 
ADD COLUMN IF NOT EXISTS "colors" JSONB;

-- Add imageUrl column (TEXT) to store image URL/path
ALTER TABLE "attribute_values" 
ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;

-- Create index on colors for better query performance (optional)
CREATE INDEX IF NOT EXISTS "attribute_values_colors_idx" ON "attribute_values" USING GIN ("colors");
```

#### Տարբերակ 3: Prisma migrate (Production-ի համար)

```bash
cd packages/db
npx prisma migrate dev --name add_colors_and_image_to_attribute_value
```

### Քայլ 2: Regenerate Prisma Client

Migration-ից հետո regenerate անեք Prisma Client-ը:

```bash
cd packages/db
npx prisma generate
```

### Քայլ 3: Restart Development Server

Restart անեք Next.js development server-ը:

1. Stop անել server-ը (Ctrl+C)
2. Restart անել:
   ```bash
   npm run dev
   ```

## Ստուգում

Migration-ից հետո ստուգեք, որ column-ները ստեղծվել են:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'attribute_values' 
AND column_name IN ('colors', 'imageUrl');
```

## Նշում

Migration-ը օգտագործում է `ADD COLUMN IF NOT EXISTS`, այնպես որ այն անվտանգ է աշխատեցնել նույնիսկ եթե column-ները արդեն գոյություն ունեն:

## Environment Variables

Համոզվեք, որ `.env` ֆայլում կա `DATABASE_URL`:

```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public&client_encoding=UTF8"
```
