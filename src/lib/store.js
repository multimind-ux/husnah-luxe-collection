import storeData from '../data/store.json'
import productData from '../data/products.json'

export const store = storeData
export const products = productData
export const CART_KEY = 'noir-cart-v1'
export const THEME_KEY = 'noir-theme'
export const INTRO_KEY = 'noir-intro-seen'

export function formatMoney(value, currency = store.currency) {
  const amount = Number(value) || 0
  return `${currency}${amount.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
}

export function getProduct(slug) {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return products.slice(0, limit)
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  )
  const rest = products.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  )
  return [...sameCategory, ...rest].slice(0, limit)
}

export function whatsappNumber() {
  return String(store.whatsapp || '').replace(/\D/g, '')
}

export function whatsappLink(message = '') {
  const number = whatsappNumber()
  const base = number ? `https://wa.me/${number}` : 'https://wa.me/'
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function productWaMessage(product, options = {}) {
  if (!product) return store.whatsappGreeting
  const details = [
    options.size ? `Size: ${options.size}` : null,
    options.colour ? `Colour: ${options.colour}` : null,
    options.variant ? `Variant: ${options.variant}` : null,
    options.qty && options.qty > 1 ? `Quantity: ${options.qty}` : null,
  ].filter(Boolean)
  return [
    `Hi ${store.name}, I'm interested in the ${product.name}.`,
    '',
    `Price: ${formatMoney(product.price)}`,
    ...details,
    '',
    `Is it available?`,
  ].join('\n')
}

export function orderWaMessage(items = [], customer = {}) {
  const lines = items.map((item, index) => {
    const options = [
      item.size ? `Size: ${item.size}` : null,
      item.colour ? `Colour: ${item.colour}` : null,
      item.variant ? `Variant: ${item.variant}` : null,
    ].filter(Boolean)
    return [
      `${index + 1}. ${item.name}`,
      options.length ? `   ${options.join(' · ')}` : null,
      `   Qty: ${item.qty} — ${formatMoney(item.price * item.qty)}`,
    ]
      .filter(Boolean)
      .join('\n')
  })

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return [
    `Hello ${store.name}, I'd like to place an order.`,
    '',
    ...lines,
    '',
    `Total: ${formatMoney(total)}`,
    '',
    customer.name ? `Name: ${customer.name}` : null,
    customer.phone ? `Phone: ${customer.phone}` : null,
    customer.address ? `Address: ${customer.address}` : null,
    customer.note ? `Note: ${customer.note}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

export function orderWhatsAppLink(items, customer) {
  return whatsappLink(orderWaMessage(items, customer))
}

export function productWhatsAppLink(product, options) {
  return whatsappLink(productWaMessage(product, options))
}

export function telHref() {
  return `tel:${String(store.phone || '').replace(/[^\d+]/g, '')}`
}

export function mailtoHref(subject = `Enquiry from the ${store.name} website`) {
  return `mailto:${store.email}?subject=${encodeURIComponent(subject)}`
}

export function absoluteImage(path) {
  if (!path) return ''
  if (/^https?:\/\//.test(path)) return path
  if (typeof window === 'undefined') return path
  return new URL(path, window.location.origin).href
}
