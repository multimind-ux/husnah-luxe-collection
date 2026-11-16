import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import Seo from '../components/Seo'
import ProductRail from '../components/ProductRail'
import {
  ColourPicker,
  QuantityStepper,
  SizePicker,
  VariantPicker,
} from '../components/ProductOptions'
import { useCart } from '../context/CartContext'
import { getProduct, getRelatedProducts } from '../lib/store'
import { lowStockLabel } from '../lib/catalog'
import {
  absoluteImage,
  formatMoney,
  productWhatsAppLink,
  store,
  whatsappLink,
} from '../lib/store'

export default function Product() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const reduce = useReducedMotion()
  const { addItem, openCart } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [size, setSize] = useState(product?.sizes?.[0] || '')
  const [colour, setColour] = useState(product?.colours?.[0]?.name || '')
  const [variant, setVariant] = useState(product?.variants?.[0] || '')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const related = useMemo(() => (product ? getRelatedProducts(product, 4) : []), [product])

  if (!product) {
    return (
      <>
        <Seo title="Piece not found" />
        <main className="container-editorial flex min-h-[70svh] flex-col items-center justify-center pb-20 pt-32 text-center">
          <p className="eyebrow">Not found</p>
          <h1 className="display mt-4 text-[clamp(3rem,9vw,8rem)]">
            THIS PIECE <span className="text-outline">MOVED.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted/50">
            It may have sold out or left the edit. Browse the full shop for what’s in.
          </p>
          <Link to="/shop" className="btn-primary mt-7">
            Back to the shop
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </main>
      </>
    )
  }

  const stockNote = lowStockLabel(product)
  const outOfStock = Number(product.stock) <= 0
  const images = product.images?.length ? product.images : ['/images/placeholders/fragrance-1.svg']

  const handleAdd = () => {
    if (outOfStock) return
    const success = addItem(product, { size, colour, variant, qty })
    if (success) {
      setAdded(true)
      openCart()
      window.setTimeout(() => setAdded(false), 2200)
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images.map((image) => absoluteImage(image)),
    description: product.description,
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'NGN',
      price: product.price,
      availability: outOfStock
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    },
  }

  return (
    <>
      <Seo
        title={product.name}
        description={product.description}
        image={images[0]}
        type="product"
        jsonLd={jsonLd}
      />
      <main className="pt-28 sm:pt-32">
        <div className="container-editorial">
          <nav
            className="flex flex-wrap items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.16em] text-muted/35"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="transition hover:text-accent">
              Home
            </Link>
            <ChevronRight size={11} aria-hidden="true" />
            <Link to="/shop" className="transition hover:text-accent">
              Shop
            </Link>
            <ChevronRight size={11} aria-hidden="true" />
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="transition hover:text-accent"
            >
              {product.category}
            </Link>
            <ChevronRight size={11} aria-hidden="true" />
            <span className="text-text/55">{product.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-24">
            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line/15 bg-surface">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={`${product.name} — ${product.category}`}
                    width="900"
                    height="1125"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? {} : { opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
                  aria-hidden="true"
                />
                {product.tag && (
                  <span className="absolute left-4 top-4 rounded-full border border-accent/25 bg-bg/80 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-accent backdrop-blur">
                    {product.tag}
                  </span>
                )}
                {stockNote && (
                  <span className="absolute right-4 top-4 rounded-full bg-bg/80 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-text/80 backdrop-blur">
                    {stockNote}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-3 flex gap-3" role="group" aria-label="Product images">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`h-20 w-16 overflow-hidden rounded-xl border transition sm:h-24 sm:w-20 ${
                        activeImage === index
                          ? 'border-accent'
                          : 'border-line/15 opacity-55 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        width="900"
                        height="1125"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-accent">
                {product.category}
              </p>
              <h1 className="display mt-3 text-[clamp(2.8rem,6vw,5.5rem)]">{product.name}</h1>
              <div className="mt-5 flex flex-wrap items-end gap-3">
                <p className="font-display text-2xl font-bold tabular-nums text-text">
                  {formatMoney(product.price)}
                </p>
                {product.compareAt && (
                  <p className="pb-1 text-sm tabular-nums text-muted/35 line-through">
                    {formatMoney(product.compareAt)}
                  </p>
                )}
                {stockNote && (
                  <span className="pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-accent">
                    {stockNote}
                  </span>
                )}
              </div>
              <p className="mt-5 max-w-lg text-sm leading-7 text-muted/55">{product.description}</p>

              {product.bundleOptions?.length > 0 && (
                <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/[0.06] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-accent">
                      Bundle pricing
                    </p>
                    <a
                      href={whatsappLink(
                        `Hi ${store.name}, I'd like to ask about the ${product.name} bundle pricing.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-text/55 transition hover:text-accent"
                    >
                      Ask about bundles
                      <ArrowUpRight size={11} aria-hidden="true" />
                    </a>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.bundleOptions.map((bundle) => (
                      <span
                        key={bundle.qty}
                        className="rounded-full border border-accent/20 bg-bg/50 px-3 py-1.5 text-[0.62rem] tabular-nums text-text/75"
                      >
                        {bundle.label} — {formatMoney(bundle.price)}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-[0.6rem] leading-5 text-muted/35">
                    Bundle totals are confirmed on WhatsApp. Single-piece price is shown above.
                  </p>
                </div>
              )}

              <div className="mt-7 space-y-6 border-t border-line/15 pt-6">
                <SizePicker sizes={product.sizes} value={size} onChange={setSize} />
                <ColourPicker colours={product.colours} value={colour} onChange={setColour} />
                <VariantPicker
                  variants={product.variants}
                  value={variant}
                  onChange={setVariant}
                  label={product.variantLabel || 'Scent'}
                />
              </div>

              <div className="mt-7 flex items-center justify-between gap-4">
                <QuantityStepper
                  value={qty}
                  max={Math.max(1, product.stock)}
                  onChange={setQty}
                />
                <span className="text-[0.62rem] uppercase tracking-[0.14em] text-muted/35">
                  {outOfStock ? 'Currently sold out' : `${product.stock} in stock`}
                </span>
              </div>

              <div className="mt-6 grid gap-2.5">
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={outOfStock}
                  className="btn-primary magnetic-glow w-full"
                >
                  {outOfStock
                    ? 'Sold out'
                    : added
                      ? 'Added to bag'
                      : `Add to bag — ${formatMoney(product.price * qty)}`}
                </button>
                <a
                  href={productWhatsAppLink(product, { size, colour, variant, qty })}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline w-full"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Order on WhatsApp
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-line/15 bg-surface/40 p-4">
                <div className="flex items-start gap-3">
                  <Truck size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-text/75">
                      {store.deliveryNote}
                    </p>
                    <p className="mt-1 text-[0.68rem] leading-5 text-muted/40">
                      Delivery is arranged and confirmed on WhatsApp. No online payment, no
                      account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 border-t border-line/15 pt-6">
                <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted/45">
                  The details
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {product.details?.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-[0.7rem] leading-5 text-muted/55"
                    >
                      <Check size={13} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center gap-4 text-[0.58rem] uppercase tracking-[0.14em] text-muted/30">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={12} aria-hidden="true" />
                  Carefully packed
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle size={12} aria-hidden="true" />
                  Human support
                </span>
              </div>

              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="mt-8 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-text/50 transition hover:text-accent"
              >
                <ArrowLeft size={13} aria-hidden="true" />
                More {product.category}
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <ProductRail
            eyebrow="Styled together"
            title={
              <>
                COMPLETE <span className="text-outline">THE LOOK</span>
              </>
            }
            description="Pieces that sit well beside this one."
            products={related}
            viewAllHref="/shop"
          />
        )}
      </main>
    </>
  )
}
