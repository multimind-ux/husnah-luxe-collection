import { formatMoney, products, store } from './store'

export const categoryNames = store.categories.map((category) => category.name)

export const allSizes = Array.from(
  new Set(products.flatMap((product) => product.sizes || [])),
).sort((a, b) => {
  const order = ['One size', 'S', 'M', 'L', '6', '7', '8', '9']
  const first = order.indexOf(a)
  const second = order.indexOf(b)
  if (first !== -1 || second !== -1) {
    return (first === -1 ? 99 : first) - (second === -1 ? 99 : second)
  }
  return a.localeCompare(b)
})

export const allColours = Array.from(
  products
    .flatMap((product) => product.colours || [])
    .reduce((map, colour) => {
      if (!map.has(colour.name)) map.set(colour.name, colour)
      return map
    }, new Map())
    .values(),
)

export const priceBands = [
  {
    id: 'under-5',
    label: `Under ${formatMoney(5000)}`,
    test: (product) => product.price < 5000,
  },
  {
    id: '5-10',
    label: `${formatMoney(5000)} – ${formatMoney(9999)}`,
    test: (product) => product.price >= 5000 && product.price < 10000,
  },
  {
    id: '10-20',
    label: `${formatMoney(10000)} – ${formatMoney(19999)}`,
    test: (product) => product.price >= 10000 && product.price < 20000,
  },
  {
    id: '20-plus',
    label: `${formatMoney(20000)}+`,
    test: (product) => product.price >= 20000,
  },
]

export function categoryMeta(name) {
  return store.categories.find((category) => category.name === name)
}

export function lowStockLabel(product) {
  if (!product) return null
  if (product.stock <= 0) return 'Sold out'
  if (product.stock <= 3) return `Only ${product.stock} left`
  return null
}

export function filterProducts(list, filters = {}) {
  const {
    category = 'All',
    size = 'All',
    colour = 'All',
    price = 'All',
    search = '',
  } = filters

  const term = search.trim().toLowerCase()
  const band = priceBands.find((item) => item.id === price)

  return list.filter((product) => {
    if (category !== 'All' && product.category !== category) return false
    if (size !== 'All' && !(product.sizes || []).includes(size)) return false
    if (
      colour !== 'All' &&
      !(product.colours || []).some((item) => item.name === colour)
    ) {
      return false
    }
    if (band && !band.test(product)) return false
    if (term) {
      const haystack = [
        product.name,
        product.category,
        product.description,
        product.tag,
        ...(product.sizes || []),
        ...(product.colours || []).map((item) => item.name),
        ...(product.variants || []),
        ...(product.bundleOptions || []).map((bundle) => bundle.label),
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(term)) return false
    }
    return true
  })
}

export function sortProducts(list, sort = 'featured') {
  const copy = [...list]
  if (sort === 'price-asc') return copy.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') return copy.sort((a, b) => b.price - a.price)
  if (sort === 'name') return copy.sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'newest') {
    return copy.sort((a, b) => {
      const rank = (product) => (product.newArrival ? 2 : 0) + (product.bestSeller ? 1 : 0)
      return rank(b) - rank(a)
    })
  }
  return copy.sort((a, b) => {
    const rank = (product) => (product.featured ? 4 : 0) + (product.newArrival ? 2 : 0) + (product.bestSeller ? 1 : 0)
    return rank(b) - rank(a)
  })
}

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name: A–Z' },
]
