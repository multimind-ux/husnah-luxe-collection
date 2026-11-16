import { useCallback, createContext, useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useBodyLock, useFocusTrap } from '../hooks/useFocusTrap'
import { useCart } from '../context/CartContext'
import { formatMoney, productWhatsAppLink } from '../lib/store'
import { lowStockLabel } from '../lib/catalog'
import {
  ColourPicker,
  QuantityStepper,
  SizePicker,
  VariantPicker,
} from './ProductOptions'

const QuickViewContext = createContext(null)

export function QuickViewProvider({ children }) {
  const [product, setProduct] = useState(null)
  const openQuickView = useCallback((nextProduct) => setProduct(nextProduct), [])
  const closeQuickView = useCallback(() => setProduct(null), [])

  return (
    <QuickViewContext.Provider value={{ product, openQuickView, closeQuickView }}>
      {children}
      <AnimatePresence>
        {product && (
          <QuickViewPanel key={product.id} product={product} onClose={closeQuickView} />
        )}
      </AnimatePresence>
    </QuickViewContext.Provider>
  )
}

export function useQuickView() {
  const context = useContext(QuickViewContext)
  if (!context) throw new Error('useQuickView must be used inside QuickViewProvider')
  return context
}

function QuickViewPanel({ product, onClose }) {
  const panelRef = useRef(null)
  const reduce = useReducedMotion()
  const { addItem, openCart } = useCart()
  const [size, setSize] = useState(product.sizes?.[0] || '')
  const [colour, setColour] = useState(product.colours?.[0]?.name || '')
  const [variant, setVariant] = useState(product.variants?.[0] || '')
  const [qty, setQty] = useState(1)
  const stockNote = lowStockLabel(product)
  const outOfStock = Number(product.stock) <= 0

  useBodyLock(true)
  useFocusTrap(true, panelRef, onClose)

  const handleAdd = () => {
    if (outOfStock) return
    const added = addItem(product, { size, colour, variant, qty })
    if (added) {
      onClose()
      openCart()
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[95]"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-ink/75 backdrop-blur-sm"
        aria-label="Close quick view"
      />
      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
        initial={reduce ? false : { x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-line/20 bg-bg shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line/15 bg-bg/90 px-5 py-4 backdrop-blur-xl">
          <span className="eyebrow">Quick view</span>
          <button type="button" onClick={onClose} className="icon-btn" aria-label="Close quick view">
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-line/15 bg-surface">
            <img
              src={product.images?.[0]}
              alt={`${product.name} — ${product.category}`}
              width="900"
              height="1125"
              className="h-full w-full object-cover"
            />
            {stockNote && (
              <span className="absolute left-4 top-4 rounded-full bg-bg/85 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-accent backdrop-blur">
                {stockNote}
              </span>
            )}
          </div>

          <div className="mt-6">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-accent">
              {product.category}
            </p>
            <div className="mt-2 flex items-start justify-between gap-5">
              <h2
                id="quickview-title"
                className="font-display text-[clamp(1.8rem,5vw,3rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]"
              >
                {product.name}
              </h2>
              <p className="shrink-0 pt-1 text-lg font-medium tabular-nums">
                {formatMoney(product.price)}
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted/55">{product.description}</p>
            {product.bundleOptions?.length > 0 && (
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.14em] text-accent/80">
                Bundle pricing available — {product.bundleOptions[0].label}{' '}
                {formatMoney(product.bundleOptions[0].price)}
              </p>
            )}
          </div>

          <div className="mt-7 space-y-6">
            <SizePicker sizes={product.sizes} value={size} onChange={setSize} />
            <ColourPicker colours={product.colours} value={colour} onChange={setColour} />
            <VariantPicker
              variants={product.variants}
              value={variant}
              onChange={setVariant}
              label={product.variantLabel || 'Scent'}
            />
          </div>

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-line/15 pt-5">
            <QuantityStepper
              value={qty}
              max={Math.max(1, product.stock)}
              onChange={setQty}
            />
            <span className="text-[0.65rem] uppercase tracking-[0.14em] text-muted/40">
              {outOfStock ? 'Sold out' : `${product.stock} in stock`}
            </span>
          </div>

          <div className="mt-6 grid gap-2.5">
            <button
              type="button"
              onClick={handleAdd}
              disabled={outOfStock}
              className="btn-primary magnetic-glow w-full"
            >
              {outOfStock ? 'Sold out' : `Add to bag — ${formatMoney(product.price * qty)}`}
            </button>
            <a
              href={productWhatsAppLink(product, { size, colour, variant, qty })}
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full"
            >
              Order on WhatsApp
            </a>
          </div>

          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="mt-6 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text/55 transition hover:text-accent"
          >
            Full details
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </motion.aside>
    </motion.div>
  )
}
