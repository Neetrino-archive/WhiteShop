# Neon Database Migration Guide

## Խնդիր

Երբ փոխում եք Vercel-ում `DATABASE_URL`-ը Neon բազային, Prisma migrations-ները չեն աշխատում ավտոմատ: Սա առաջացնում է error-ներ, ինչպիսին է:

```
The table `public.categories` does not exist in the current database.
```

## Լուծում

Օգտագործեք migration script-ը, որը աշխատեցնում է բոլոր Prisma migrations-ները Neon բազայում:

### Քայլ 1: Ստեղծեք `.env` ֆայլ (եթե չունեք)

Root directory-ում ստեղծեք `.env` ֆայլ և ավելացրեք ձեր Neon database connection string-ը:

```env
DATABASE_URL="postgresql://neondb_owner:npg_4NFk3DcLajCP@ep-bold-bonus-ahakkqdf-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require&client_encoding=UTF8"
```

**Կարևոր:** Ավելացրեք `&client_encoding=UTF8` պարամետրը հայերենի և այլ UTF-8 նիշերի համար:

### Քայլ 2: Աշխատեցրեք Migration Script-ը

```bash
npm run deploy:neon-migrations
```

Կամ ուղղակիորեն:

```bash
tsx scripts/deploy-neon-migrations.ts
```

### Ինչ է անում Script-ը

1. ✅ Ստուգում է, որ `DATABASE_URL` environment variable-ը սահմանված է
2. ✅ Ավելացնում է `client_encoding=UTF8` պարամետրը (եթե չկա)
3. ✅ Generate անում է Prisma Client-ը
4. ✅ Deploy անում է բոլոր migrations-ները Neon բազայում
5. ✅ Ցույց է տալիս հստակ error messages, եթե ինչ-որ բան սխալ է

### Script-ի առավելությունները

- ✅ **Անվտանգ** - չի փորձում ստեղծել նոր migrations, միայն աշխատեցնում է գոյություն ունեցողները
- ✅ **Idempotent** - կարող եք աշխատեցնել մի քանի անգամ, չի կոտրի գոյություն ունեցող տվյալները
- ✅ **Հստակ Logging** - ցույց է տալիս, թե ինչ է տեղի ունենում յուրաքանչյուր քայլում
- ✅ **Error Handling** - հստակ error messages և troubleshooting tips

### Troubleshooting

#### Error: "DATABASE_URL environment variable is not set"

**Լուծում:** Ստեղծեք `.env` ֆայլ root directory-ում և ավելացրեք `DATABASE_URL`:

```env
DATABASE_URL="postgresql://..."
```

#### Error: "Connection timeout" կամ "Connection refused"

**Լուծում:** 
- Ստուգեք, որ Neon database-ը ակտիվ է
- Ստուգեք, որ connection string-ը ճիշտ է
- Ստուգեք network connectivity

#### Error: "Migration already applied"

**Լուծում:** Սա նորմալ է: Script-ը չի փորձում կրկնել արդեն աշխատեցված migrations-ները:

#### Error: "Table already exists"

**Լուծում:** Prisma migrations-ները օգտագործում են `IF NOT EXISTS` checks, ուրեմն սա չպետք է լինի: Եթե տեսնում եք այս error-ը, ստուգեք, որ migrations-ները ճիշտ են:

### Vercel Deployment

Vercel-ում migrations-ները ավտոմատ չեն աշխատում: Երկու տարբերակ կա:

#### Տարբերակ 1: Build Command-ում (Առաջարկվող)

Vercel project settings-ում ավելացրեք build command-ին:

```bash
cd packages/db && npm run db:migrate:deploy && cd ../.. && npm run build
```

#### Տարբերակ 2: Manual Migration

Աշխատեցրեք migration script-ը locally, նախքան deploy անելը:

```bash
npm run deploy:neon-migrations
```

Հետո deploy անեք Vercel-ում:

### Ստուգում

Migration-ից հետո ստուգեք, որ աղյուսակները ստեղծվել են:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Կամ օգտագործեք Prisma Studio:

```bash
cd packages/db
npm run db:studio
```

## Անվտանգություն

- ✅ Script-ը չի փորձում ստեղծել նոր migrations
- ✅ Script-ը չի ջնջում գոյություն ունեցող տվյալները
- ✅ Script-ը կարող եք աշխատեցնել մի քանի անգամ
- ✅ Script-ը օգտագործում է `prisma migrate deploy`, որը անվտանգ է production-ի համար

## Հաջորդ Քայլեր

Migration-ից հետո:

1. ✅ Ստուգեք, որ բոլոր աղյուսակները ստեղծվել են
2. ✅ Restart անեք Vercel deployment-ը
3. ✅ Ստուգեք, որ application-ը աշխատում է

## Աջակցություն

Եթե հանդիպում եք խնդիրների, ստուգեք:

1. `DATABASE_URL` environment variable-ը
2. Neon database connection-ը
3. Network connectivity-ն
4. Prisma migrations-ների status-ը

