# Ուղղումների պլան — WhiteShop-Template

Փաստաթուղթը ամրագրում է բոլոր հայտնաբերված անհամապատասխանությունները 00-core և կապված կանոնների նկատմամբ։

- **Նախահերթ.** 🔴 1 = բարձր · 🟡 2 = միջին · 🟢 3 = ցածր
- **Վերջին թարմացում.** 2026-02-17

---

## Ինչպես օգտագործել

1. Ընտրի՛ր **Փուլ** (ներքևում) և կատարի՛ր կետերը հերթով։
2. Յուրաքանչյուր կետի դիմաց checkbox-ը նշի՛ր `[x]` ավարտելուց հետո։
3. **Որտեղ** — ֆայլ/թղթապանակ; **Ինչ անել** — կոնկրետ քայլեր։

---

## Փուլ 1 — Փաստաթղթեր (սկսել այստեղից)

- [ ] **1.1** 🔴 **Նախագծի չափը 00-core-ում**
  - **Որտեղ:** `.cursor/rules/00-core.mdc` (բաժին «ՆԱԽԱԳԾԻ ՉԱՓԸ»)
  - **Ինչ անել:** Փոխարինել «ՉԱՓԸ ՉԷ ՈՐՈՇՎԵԼ» →  
    `✅ **ՉԱՓԸ. C** — մեծ, կառուցվածք. monorepo (apps/*, packages/*)`

- [ ] **1.2** 🔴 **TECH_CARD.md**
  - **Որտեղ:** `docs/`
  - **Ինչ անել:** Պատճենել `reference/templates/TECH_CARD_TEMPLATE.md` → `docs/TECH_CARD.md`, լրացնել ըստ նախագծի (stack, hosting, API, DB և այլն)

- [ ] **1.3** 🔴 **01-ARCHITECTURE.md**
  - **Որտեղ:** `docs/`
  - **Ինչ անել:** Ստեղծել `docs/01-ARCHITECTURE.md` (reference/templates/ARCHITECTURE_TEMPLATE.md-ից), նկարագրել apps/web, packages/db, packages/ui, packages/design-tokens

- [ ] **1.4** 🔴 **BRIEF.md**
  - **Որտեղ:** `docs/BRIEF.md`
  - **Ինչ անել:** Լրացնել բոլոր բաժինները — նկարագրություն, թիրախային լսարան, ֆունկցիաներ, stack, դիզայն, ինտեգրացիաներ, սահմանափակումներ

- [ ] **1.5** 🟡 **Այլ docs**
  - **Որտեղ:** `docs/`
  - **Ինչ անել:** C չափի համար ավելացնել/լրացնել — PROGRESS.md, DECISIONS.md, 02-TECH_STACK.md, 04-API.md, 05-DATABASE.md (ըստ 00-core docs կառուցվածքի)

- [ ] **1.6** 🔴 **.env.example**
  - **Որտեղ:** արմատ և/կամ `apps/web/`
  - **Ինչ անել:** Ստեղծել `.env.example` (առանց իրական արժեքների), փաստաթղթավորել յուրաքանչյուր env փոփոխական (նկարագրություն, օրինակ)

---

## Փուլ 1.7 — Որակի ստուգումներ (ESLint / Lint)

Նպատակը — ամրապնդել 00-core, 02-coding-standards, 03-typescript կանոնները ավտոմատ ստուգումներով, որպեսզի նոր խախտումներ չթափանցեն։

- [ ] **1.7.1** 🔴 **ESLint + TypeScript արմատում**
  - **Որտեղ:** արմատ — `.eslintrc.js` (կամ `eslint.config.js` ESLint 9 flat config)
  - **Ինչ անել:** Ավելացնել TypeScript parser (`@typescript-eslint/parser`) և plugin (`@typescript-eslint/eslint-plugin`); `extends`-ում ավելացնել `plugin:@typescript-eslint/recommended` կամ `plugin:@typescript-eslint/strict`; rule `@typescript-eslint/no-explicit-any: error` (00-core, 03-typescript — any արգելված)

- [ ] **1.7.2** 🔴 **Չափերի rule-ներ (02-coding-standards)**
  - **Որտեղ:** արմատ ESLint config
  - **Ինչ անել:** Ավելացնել `max-lines: ['warn', { max: 300 }]`, `max-depth: ['warn', 3]`, `max-lines-per-function: ['warn', { max: 50 }]` (կամ error, ըստ պահանջի)

- [ ] **1.7.3** 🟡 **Named export (00-core)**
  - **Որտեղ:** արմատ ESLint config
  - **Ինչ անել:** Ավելացնել `import/no-default-export` (eslint-plugin-import) — error; Next.js `app/` page/layout route ֆայլերի համար կարգավորել ignore/exception (օր. ignore pattern `**/app/**/page.tsx`, `**/layout.tsx`)

- [ ] **1.7.4** 🔴 **Արմատում lint script**
  - **Որտեղ:** արմատ `package.json`
  - **Ինչ անել:** Ավելացնել `"lint": "turbo run lint"` (կամ `eslint .` / workspace-ներում lint); ապահովել, որ `apps/web`-ում `npm run lint` արդեն կա և աշխատում է

- [ ] **1.7.5** 🟡 **apps/web — next lint և խիստ TypeScript**
  - **Որտեղ:** `apps/web/` — `.eslintrc.cjs` կամ արմատ config-ի override
  - **Ինչ անել:** Համոզվել, որ `next lint` օգտագործում է `eslint-config-next` և (անհրաժեշտության դեպքում) արմատի TypeScript strict rule-ները; եթե արմատ config-ը extend է արվում — override-ում միացնել `@typescript-eslint/no-explicit-any: error`

- [ ] **1.7.6** 🟡 **CI-ում lint**
  - **Որտեղ:** CI config (GitHub Actions / այլ) — `.github/workflows/` կամ նման
  - **Ինչ անել:** Ավելացնել job/step — `pnpm run lint` (կամ `npm run lint`) build-ից առաջ; lint ձախողում = pipeline ձախողում

---

## Փուլ 2 — Կրիտիկական կոդ

- [ ] **2.1** 🔴 **TypeScript `any`**
  - **Որտեղ:** lib/services, app/api, components, hooks (~100+ ֆայլ)
  - **Ինչ անել:** Փոխարինել `: any` / `as any` կոնկրետ տիպերով։ Սկսել API routes-ի `catch (error: any)` և services-ից

- [ ] **2.2** 🔴 **next.config — ignoreBuildErrors**
  - **Որտեղ:** `apps/web/next.config.js`
  - **Ինչ անել:** Հեռացնել `ignoreBuildErrors: true` (typescript բլոկից); ուղղել build-ի TS սխալները, որ build-ը ձախողվի սխալի դեպքում

- [ ] **3.1** 🔴 **Logger (console → logger)**
  - **Որտեղ:** API routes, lib/services, components
  - **Ինչ անել:** Ներմուծել կենտրոնացված logger (օր. pino/winston կամ պարզ wrapper); API/services/components-ում `console.log`/`console.error`/`console.warn` փոխարինել logger-ով (scripts/ — կարող են մնալ console)

- [ ] **5.1** 🔴 **Մեծ ֆայլեր (>300 տող)**
  - **Որտեղ:** `apps/web/components/ProductCard.tsx` (~730), `apps/web/components/RelatedProducts.tsx` (~598)
  - **Ինչ անել:** Բաժանել ենթակոմպոնենտների, hooks, util; յուրաքանչյուր ֆայլ ≤300 տող

- [ ] **6.1** 🔴 **Դատարկ catch**
  - **Որտեղ:** `apps/web/app/products/[slug]/useProductPage.ts` — `catch (err) { }`
  - **Ինչ անել:** Ավելացնել լոգ (logger) և/կամ օգտատիրոջ համար sansitive error; չթողնել դատարկ catch

- [ ] **6.3** 🔴 **error: any API catch-ում**
  - **Որտեղ:** auth/login, auth/register և այլ `route.ts`
  - **Ինչ անել:** Օգտագործել `unknown` + type guard կամ custom AppError; catch-ում any չթողնել

---

## Փուլ 3 — Մնացած

- [ ] **2.3** 🟡 **@ts-expect-error / @ts-ignore**
  - **Որտեղ:** `admin-products-update.service.ts`, `admin-products-create.service.ts` (revalidateTag)
  - **Ինչ անել:** Լուծել revalidateTag տիպի խնդիրը (declaration merging կամ Next types), հեռացնել @ts-expect-error

- [ ] **3.2** 🟡 **Debug console.log**
  - **Որտեղ:** `lib/services/products-find-transform.service.ts` (🎨 Processing variants…)
  - **Ինչ անել:** Հեռացնել կամ փոխարինել logger.debug (միայն dev)

- [ ] **4.1** 🟡 **Inline styles**
  - **Որտեղ:** TeamCarousel, RelatedProducts, ProductReviews, ProductLabels, ProductCard, PriceFilter, HomeCategoriesSidebar, Header, ColorPaletteSelector, ColorFilter, CategoryNavigation, ProductAttributesSelector, OrderDetailsModal, contact/page, orders/[number]/page
  - **Ինչ անել:** Դինամիկ արժեքներ → Tailwind arbitrary values կամ CSS variables; static → Tailwind դասեր

- [ ] **5.2** 🟡 **Այլ 300+ տող ֆայլեր**
  - **Որտեղ:** components, app/admin, hooks
  - **Ինչ անել:** Ստուգել line count, անհրաժեշտության դեպքում բաժանել մոդուլների

- [ ] **6.2** 🟡 **API վալիդացիա Zod-ով**
  - **Որտեղ:** auth/register, auth/login և մյուս API routes
  - **Ինչ անել:** Բոլոր API boundaries-ում body/params վալիդացնել Zod schema-ով (Zod արդեն dependency-ում է)

- [ ] **7.1** 🟡 **Package manager → pnpm**
  - **Որտեղ:** արմատ (package-lock.json)
  - **Ինչ անել:** corepack enable; pnpm-workspace.yaml; pnpm install; ջնջել package-lock.json; README/scripts-ում npm → pnpm

- [ ] **8.1** 🟢 **JSDoc**
  - **Որտեղ:** lib/services, public API
  - **Ինչ անել:** Ավելացնել JSDoc (նկարագրություն, @param, @returns) հրապարակային ֆունկցիաների համար

- [ ] **9.1** 🟡 **TODO բիզնես-լոգիկայում**
  - **Որտեղ:** orders.service.ts (discount, tax, customerLocale, paymentUrl), admin.service.new.ts
  - **Ինչ անել:** Կամ իրականացնել TODO-ները, կամ գրանցել DECISIONS.md/issue և հեռացնել/փոխարինել մեկնաբանությունները

- [ ] **9.2** 🟡 **eslint-disable**
  - **Որտեղ:** admin/users, admin/products, admin/page, useOrders, useVariantGeneration, admin/messages
  - **Ինչ անել:** react-hooks/exhaustive-deps — ավելացնել dependency կամ կարճ մեկնաբանություն; no-unused-vars — ուղղել

- [ ] **9.3** 🟢 **Magic արժեքներ**
  - **Որտեղ:** products-filters.service.ts (SIZE_ORDER)
  - **Ինչ անել:** Տեղափոխել constants ֆայլ, անվանված export

- [ ] **9.4** 🟡 **localhost / env**
  - **Որտեղ:** search.service, cache.service, api-client, products/page
  - **Ինչ անել:** URL-ները env-ից (MEILI_HOST, REDIS_URL, NEXT_PUBLIC_APP_URL); localhost fallback միայն NODE_ENV=development

---

## Ամփոփ

| Փուլ    | Կետեր      | Նախահերթ |
|---------|-------------|-----------|
| Փուլ 1  | 1.1–1.6     | Փաստաթղթեր |
| Փուլ 1.7| 1.7.1–1.7.6 | Որակի ստուգումներ (ESLint / Lint) |
| Փուլ 2  | 2.1, 2.2, 3.1, 5.1, 6.1, 6.3 | Կրիտիկական կոդ |
| Փուլ 3  | 2.3, 3.2, 4.1, 5.2, 6.2, 7.1, 8.1, 9.1–9.4 | Մնացած |

Յուրաքանչյուր կետ ավարտելուց հետո նշի՛ր checkbox-ը `[x]`։
