# Husnah Luxe Collection

A dark-luxury editorial storefront for **Husnah Luxe Collection**, built as a separate project from Jibola Collection.

- **Store name in the UI:** Husnah Luxe Collection
- **Working project folder:** `/home/abdulbasit/noir-atelier`
- **Storefront type:** frontend-only, WhatsApp checkout
- **Stack:** React + Vite + Tailwind CSS + React Router + Framer Motion + lucide-react

## Run locally

```bash
cd /home/abdulbasit/noir-atelier
npm install
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Interaction QA (requires the preview server to be running):

```bash
npm run qa
```

## What is included

- Dark editorial theme by default (`#0B0B0C`) with a light-mode toggle.
- Syne display type, Inter body type, grain, glow, oversized/outlined headlines.
- Home, Shop, Product, About, Contact and NotFound pages.
- Shop filters for category, size, colour and price, plus search and sorting.
- Product gallery, size/colour/scent options, bundle pricing display, related products.
- Persistent cart in `localStorage` (`noir-cart-v1`).
- Animated cart drawer with a WhatsApp checkout form.
- WhatsApp order message prefilled with item, size, colour, variant, quantity, price, subtotal, customer name, phone, address and note.
- Quick view drawer, scroll reveals, hover image swap, marquees, page transitions, custom desktop cursor, intro loader and mobile sticky action bar.
- SEO tags, Open Graph tags, product structured data (`Product` JSON-LD), `vercel.json` rewrite for SPA deployment.

## Data and assets

All store content is driven by two files:

```text
src/data/store.json       Brand, contact, categories, homepage and page copy
src/data/products.json    Products, prices, stock, options, images and details
```

Product photography lives in:

```text
public/images/products/   Main product images and generated detail images
public/images/placeholders/  Fallback SVG placeholders
```

Images in `public/images/products/` use clean filenames and WebP delivery. Each product has a main image and a generated `-alt.webp` detail crop. Product cards only request the detail image after hover/focus, which keeps the initial shop grid lighter. The homepage hero also has 360w / 480w / 600w WebP variants and a preload tag in `index.html`.

### Replace or add a product

1. Add the image(s) to `public/images/products/` (WebP is preferred).
2. Add or update the product object in `src/data/products.json`.
3. Use a unique `id` and `slug`.
4. Keep `images` as an array. The first image is the card/gallery main image; the second is the hover/detail image. Both are `.webp` in the current data.
5. Set `category` to one of the names in `store.json` → `categories`.
6. `sizes` is an array of strings.
7. `colours` is an array of objects: `{ "name": "Navy blue", "hex": "#1E2A44" }`.
8. `variants` is an array of scent/variant names. Set `variantLabel` to `"Scent"` or another label if needed.
9. `bundleOptions` is an array of `{ "qty", "label", "price" }` objects. Bundle prices are displayed on the product page and must be confirmed on WhatsApp; the cart uses the single-piece price.
10. Update `stock`, `tag`, `featured`, `newArrival` and `bestSeller` as needed.

### Replace the store details

Edit `src/data/store.json`:

- `name`, `shortName`, `tagline`, `description`, `metaDescription`
- `whatsapp` — international format, no `+` or spaces (currently `2347080059463`)
- `phone` — display format
- `email` — **currently a placeholder:** `hello@husnahluxe.example`
- `instagramUrl` — leave empty to hide the Instagram link in the footer
- `location`, `address`, `hours`, `announcement`, `deliveryNote`
- `hero`, `marquee`, `categories`, `why`, `about`, `trust`, `contact`

The current email address, stock counts and Instagram link have not been supplied by the store owner. Replace them before launch.

## Product copy rules

The visible product copy deliberately avoids designer-brand names and does not use “original” or “genuine” claims. Some product photos still show packaging labels; that is expected because the photos are the store’s own product shots. Keep the text copy clean when adding new products.

## Bundle pricing

The current data includes:

- UAE Jersey Scarf: 6 pieces for ₦17,000; dozen for ₦34,000.
- Mini Jersey Scarf: from 3 pieces at ₦1,900 each.
- Double-Layer Inner Cap: 3 for ₦2,000; 6 for ₦3,900; 12 for ₦7,200.

These are shown on the product page with a WhatsApp enquiry link. The cart intentionally uses the single-piece price because bundle totals need a manual quantity confirmation. If bundle checkout should be automatic later, the cart pricing model will need a quantity-tier calculation.

## Placeholder assets

The original placeholder SVG generator is still available:

```bash
npm run generate:placeholders
```

It regenerates fallback images in `public/images/placeholders/` and the favicon. The real product photography is now in `public/images/products/` and is used by default.

## Deployment

The site is ready for a static Vercel deployment. `vercel.json` rewrites all routes to `index.html` so React Router routes work on refresh.

Recommended flow:

1. Create a new GitHub repository for this project.
2. Push this folder. Do not push it into the Jibola repository.
3. Import the repository into Vercel as a Vite project.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add the production domain after the store owner supplies final branding/contact details.
7. Replace the placeholder email and any placeholder stock counts before going live.

## QA checklist

- `npm run build` passes.
- Home, Shop, Product, About, Contact and NotFound routes load.
- Theme toggle persists via `localStorage`.
- Quick view opens, options update, add-to-cart works.
- Cart drawer opens, quantities update, WhatsApp checkout opens the correct prefilled message.
- Shop filters and search update the URL and grid.
- Product images load and hover swaps work on desktop.
- Mobile sticky bar does not cover the form controls.
- Run Lighthouse mobile and confirm performance/accessibility/best-practices/SEO are at least 80.

## Relationship to Jibola Collection

Jibola Collection remains a separate project and is not modified by this repository. This storefront uses its own branding, products, contact details and assets.
