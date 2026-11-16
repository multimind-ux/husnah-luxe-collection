import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MessageCircle, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useBodyLock, useFocusTrap } from '../hooks/useFocusTrap'
import { formatMoney, orderWhatsAppLink, store } from '../lib/store'
import { QuantityStepper } from './ProductOptions'

const emptyForm = { name: '', phone: '', address: '', note: '' }

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, updateQty, removeItem, clearCart } = useCart()
  const panelRef = useRef(null)
  const reduce = useReducedMotion()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  useBodyLock(isOpen)
  useFocusTrap(isOpen, panelRef, closeCart)

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setError('')
    setSent(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!items.length) return
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('Please add your name, phone number and delivery address.')
      return
    }
    setError('')
    const link = orderWhatsAppLink(items, form)
    window.open(link, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart"
          className="fixed inset-0 z-[90]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            onClick={closeCart}
            className="absolute inset-0 h-full w-full bg-ink/75 backdrop-blur-sm"
            aria-label="Close bag"
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[500px] flex-col border-l border-line/20 bg-bg shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line/15 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <ShoppingBag size={17} className="text-accent" aria-hidden="true" />
                <h2
                  id="cart-title"
                  className="font-display text-lg font-bold uppercase tracking-[0.08em]"
                >
                  Your bag <span className="text-accent">({count})</span>
                </h2>
              </div>
              <button type="button" onClick={closeCart} className="icon-btn" aria-label="Close bag">
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              {!items.length ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line/15 bg-surface">
                    <ShoppingBag size={24} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight">
                    Your bag is empty
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-muted/50">
                    Start with the new edit. Your pieces will stay here until you’re ready.
                  </p>
                  <Link to="/shop" onClick={closeCart} className="btn-primary mt-7">
                    Shop the edit
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-5">
                    <AnimatePresence initial={false} mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          key={item.key}
                          layout
                          initial={reduce ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? {} : { opacity: 0, x: 20 }}
                          transition={{ duration: 0.28, ease: 'easeOut' }}
                          className="flex gap-4"
                        >
                          <Link
                            to={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="shrink-0 overflow-hidden rounded-xl border border-line/15 bg-surface"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              width="900"
                              height="1125"
                              loading="lazy"
                              className="h-24 w-20 object-cover"
                            />
                          </Link>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <Link
                                  to={`/product/${item.slug}`}
                                  onClick={closeCart}
                                  className="line-clamp-2 font-display text-sm font-semibold uppercase leading-tight tracking-tight text-text hover:text-accent"
                                >
                                  {item.name}
                                </Link>
                                <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.12em] text-muted/40">
                                  {[item.size, item.colour, item.variant]
                                    .filter(Boolean)
                                    .join(' · ') || 'Standard'}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.key)}
                                className="text-muted/35 transition hover:text-accent"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 size={14} aria-hidden="true" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                              <QuantityStepper
                                compact
                                value={item.qty}
                                max={Math.max(1, item.stock)}
                                onChange={(qty) => updateQty(item.key, qty)}
                              />
                              <p className="text-sm font-medium tabular-nums text-text">
                                {formatMoney(item.price * item.qty)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="mt-6 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted/35 transition hover:text-accent"
                  >
                    Clear bag
                  </button>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-line/15 bg-surface/40 px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted/45">
                    Subtotal
                  </span>
                  <motion.span
                    key={subtotal}
                    initial={reduce ? false : { opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-xl font-bold tabular-nums text-text"
                  >
                    {formatMoney(subtotal)}
                  </motion.span>
                </div>
                <p className="mt-1 text-[0.62rem] leading-5 text-muted/35">
                  Delivery and payment details are confirmed on WhatsApp.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <div>
                    <label htmlFor="checkout-name" className="sr-only">
                      Full name
                    </label>
                    <input
                      id="checkout-name"
                      className="field"
                      placeholder="Full name"
                      autoComplete="name"
                      value={form.name}
                      onChange={updateField('name')}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="sr-only">
                      Phone number
                    </label>
                    <input
                      id="checkout-phone"
                      className="field"
                      placeholder="Phone number"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={updateField('phone')}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-address" className="sr-only">
                      Delivery address
                    </label>
                    <textarea
                      id="checkout-address"
                      className="field min-h-20 resize-none"
                      placeholder="Delivery address"
                      autoComplete="street-address"
                      value={form.address}
                      onChange={updateField('address')}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-note" className="sr-only">
                      Order note
                    </label>
                    <input
                      id="checkout-note"
                      className="field"
                      placeholder="Note (optional)"
                      value={form.note}
                      onChange={updateField('note')}
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-accent" role="alert">
                      {error}
                    </p>
                  )}
                  {sent && (
                    <p className="text-xs leading-5 text-accent" role="status">
                      WhatsApp should be open with your order. Send the message to confirm it.
                    </p>
                  )}
                  <button type="submit" className="btn-primary magnetic-glow w-full">
                    <MessageCircle size={15} aria-hidden="true" />
                    Send order on WhatsApp
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                  <p className="text-center text-[0.58rem] uppercase tracking-[0.14em] text-muted/30">
                    No account. No card forms. Just a conversation.
                  </p>
                </form>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
