import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Eye } from 'lucide-react'
import { formatMoney } from '../lib/store'
import { lowStockLabel } from '../lib/catalog'
import { useQuickView } from './QuickView'

export default function ProductCard({ product, priority = false, className = '' }) {
  const { openQuickView } = useQuickView()
  const [showSecondary, setShowSecondary] = useState(false)
  const stockNote = lowStockLabel(product)
  const secondary = product.images?.[1]

  return (
    <article className={`group ${className}`}>
      <div className="relative">
        <Link
          to={`/product/${product.slug}`}
          onMouseEnter={() => secondary && setShowSecondary(true)}
          onFocus={() => secondary && setShowSecondary(true)}
          className="block rounded-[1.5rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-line/15 bg-surface">
            <img
              src={product.images?.[0]}
              alt={`${product.name} — ${product.category}`}
              width="900"
              height="1125"
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              fetchpriority={priority ? 'high' : undefined}
              className="product-image product-image-primary absolute inset-0"
            />
            {secondary && showSecondary && (
              <img
                src={secondary}
                alt=""
                width="900"
                height="1125"
                loading="lazy"
                decoding="async"
                className="product-image product-image-secondary absolute inset-0"
                aria-hidden="true"
              />
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/0 to-transparent"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-2">
              {product.tag && (
                <span className="rounded-full border border-accent/25 bg-bg/80 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-accent backdrop-blur">
                  {product.tag}
                </span>
              )}
              {stockNote && (
                <span className="rounded-full bg-bg/80 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-text/85 backdrop-blur">
                  {stockNote}
                </span>
              )}
            </div>
            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cream/90">
                View piece
                <ArrowUpRight size={13} aria-hidden="true" />
              </span>
              <span className="rounded-full bg-ink/55 px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.16em] text-cream/70 backdrop-blur">
                {product.category}
              </span>
            </div>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => openQuickView(product)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line/20 bg-bg/75 text-text/70 opacity-100 backdrop-blur transition duration-300 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          aria-label={`Quick view ${product.name}`}
          title="Quick view"
        >
          <Eye size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-accent/80">
            {product.category}
          </p>
          <h3 className="mt-1.5 font-display text-[1.05rem] font-semibold uppercase leading-tight tracking-[-0.02em] text-text">
            <Link
              to={`/product/${product.slug}`}
              className="link-underline decoration-accent/60"
            >
              {product.name}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-1.5" aria-hidden="true">
            {(product.colours || []).slice(0, 4).map((colour) => (
              <span
                key={colour.name}
                className="h-2.5 w-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: colour.hex }}
                title={colour.name}
              />
            ))}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[0.86rem] font-medium tabular-nums text-text">
            {formatMoney(product.price)}
          </p>
          {product.compareAt && (
            <p className="mt-1 text-[0.7rem] tabular-nums text-muted/35 line-through">
              {formatMoney(product.compareAt)}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
