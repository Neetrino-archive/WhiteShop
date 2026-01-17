# Plan: Fix Quantity Management for Variants

## 📋 Խնդիր

Ներկայիս կառուցվածքում quantity-ն կարող է սխալ կիսվել generate variants-ի ժամանակ: Երբ գնում են անում (օր. Red + S), quantity-ն հանվում է բոլոր գույների ու չափերի համար:

## ✅ Լուծում

### Ներկայիս կառուցվածք (արդեն ճիշտ է)
- `ProductVariant` - արդեն կոնկրետ combination է (Red + S)
- `ProductVariant.stock` - quantity-ն պահվում է յուրաքանչյուր variant-ի համար առանձին
- `ProductVariantOption` - պահում է attribute values

### Խնդիրը (լուծված)
Generate variants-ի ժամանակ ստեղծվում էր մի variant բոլոր արժեքներով, ոչ թե յուրաքանչյուր combination-ի համար առանձին variant:

### Լուծում (կիրառված)
1. ✅ **Update generate variants logic** - հիմա ստեղծվում են բոլոր հնարավոր combinations-ները (Red+S, Red+M, Green+S, Green+M)
2. ✅ **Յուրաքանչյուր variant ունի իր quantity-ն** - quantity-ն չի կիսվում variant-ների միջև
3. ✅ **Stock management արդեն ճիշտ է** - order-ի ժամանակ quantity-ն հանվում է միայն այդ variant-ից

## 🔧 Փոփոխություններ

### 1. Update Variant Generation Logic
- Երբ generate variants-ը ստեղծում է variants, յուրաքանչյուրը պետք է ունենա իր quantity-ն
- Quantity-ն չպետք է կիսվի variant-ների միջև

### 2. Update Stock Management
- Երբ գնում են անում, quantity-ն պետք է հանվի միայն այդ variant-ից
- Ստուգել cart service-ը և order service-ը

### 3. Frontend Compatibility
- UI-ն չպետք է փոխվի
- Quantity input-ը պետք է մնա յուրաքանչյուր variant-ի համար

## 📝 Implementation Steps

1. ✅ Վերլուծել ներկայիս variant generation logic-ը
2. ✅ Update generate variants - ապահովել, որ յուրաքանչյուր variant ստանում է իր quantity-ն
3. ✅ Ստուգել stock management - ապահովել, որ quantity-ն հանվում է միայն այդ variant-ից
4. ✅ Test - ստուգել, որ frontend-ը չի կոտրվում

## ⚠️ Risks

- Frontend-ի UI-ն կարող է փոխվել, եթե quantity-ի կառավարումը փոխվի
- Existing variants-ները կարող են ունենալ սխալ quantity

## 🎯 Expected Result

- ✅ Յուրաքանչյուր variant (Red + S, Green + M, etc.) ունի իր quantity-ն
- ✅ Երբ գնում են անում Red + S, quantity-ն հանվում է միայն Red + S variant-ից
- ✅ Frontend-ի UI-ն չի փոխվում

## 📦 Կիրառված փոփոխություններ

### 1. `apps/web/app/admin/products/add/page.tsx`
- ✅ Update `generateVariantsFromAttributes` - հիմա ստեղծում է բոլոր հնարավոր combinations-ները
- ✅ Յուրաքանչյուր combination-ի համար ստեղծվում է առանձին variant իր quantity-ով
- ✅ Update `variant-all` references - հիմա օգտագործվում է `variant-combination-` prefix

### 2. Database Schema
- ✅ Schema-ն արդեն ճիշտ է - `ProductVariant.stock` պահում է quantity-ն յուրաքանչյուր variant-ի համար
- ✅ Ոչ մի schema փոփոխություն պետք չէ

### 3. Stock Management
- ✅ Order service-ը արդեն ճիշտ է - quantity-ն հանվում է միայն այդ variant-ից
- ✅ Cart service-ը արդեն ճիշտ է - ստուգում է variant-ի stock-ը

