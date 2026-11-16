import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Search, SearchX, SlidersHorizontal, X } from 'lucide-react'
import Seo from '../components/Seo'
import ProductCard from '../components/ProductCard'
import {
  allColours,
  allSizes,
  categoryNames,
  filterProducts,
  priceBands,
  sortOptions,
  sortProducts,
} from '../lib/catalog'
import { formatMoney, products, store } from '../lib/store'

function FilterRow({ label, children }) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-16 shrink-0 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted/40">
        {label}
      </span>
      <div className="no-scrollbar flex min-w-0 gap-2 overflow-x-auto pb-1">{children}</div>
    </div>
  )
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const reduce = useReducedMotion()
  const urlCategory = searchParams.get('category')
  const urlSort = searchParams.get('sort')
  const [category, setCategory] = useState(
    categoryNames.includes(urlCategory) ? urlCategory : 'All',
  )
  const [size, setSize] = useState('All')
  const [colour, setColour] = useState('All')
  const [price, setPrice] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(
    sortOptions.some((option) => option.id === urlSort) ? urlSort : 'featured',
  )

  useEffect(() => {
    const next = searchParams.get('category')
    if (next && categoryNames.includes(next) && next !== category) setCategory(next)
  }, [searchParams, category])

  useEffect(() => {
    const next = searchParams.get('sort')
    if (next && sortOptions.some((option) => option.id === next) && next !== sort) {
      setSort(next)
    }
  }, [searchParams, sort])

  useEffect(() => {
    const params = new URLSearchParams()
    if (category !== 'All') params.set('category', category)
    if (sort !== 'featured') params.set('sort', sort)
    setSearchParams(params, { replace: true })
  }, [category, sort, setSearchParams])

  const filtered = useMemo(
    () =>
      sortProducts(
        filterProducts(products, { category, size, colour, price, search }),
        sort,
      ),
    [category, size, colour, price, search, sort],
  )

  const activeCount = [
    category !== 'All',
    size !== 'All',
    colour !== 'All',
    price !== 'All',
    search.trim() !== '',
    sort !== 'featured',
  ].filter(Boolean).length

  const clearAll = () => {
    setCategory('All')
    setSize('All')
    setColour('All')
    setPrice('All')
    setSearch('')
    setSort('featured')
  }

  const title = category === 'All' ? 'THE EDIT.' : `${category.toUpperCase()}.`

  return (
    <>
      <Seo
        title={category === 'All' ? 'Shop' : `${category} — Shop`}
        description={`Shop the ${store.name} edit — ${store.description}`}
      />
      <main className="pt-28 sm:pt-32">
        <section className="container-editorial pb-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Shop</p>
              <h1 className="display mt-4 text-[clamp(3.4rem,9vw,9rem)]">
                {category === 'All' ? (
                  <>
                    THE <span className="text-outline">EDIT.</span>
                  </>
                ) : (
                  <>
                    {category.toUpperCase().slice(0, -1)}
                    <span className="text-outline">{category.toUpperCase().slice(-1)}.</span>
                  </>
                )}
              </h1>
            </div>
            <p className="hidden max-w-[16rem] pb-2 text-right text-xs leading-6 text-muted/40 md:block">
              {products.length} pieces, chosen closely. Filter the edit or search for something
              specific.
            </p>
          </div>
        </section>

        <section className="container-editorial" aria-label="Product filters">
          <div className="border-y border-line/15 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted/35"
                  aria-hidden="true"
                />
                <label htmlFor="shop-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="shop-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search the edit…"
                  className="field py-3 pl-11 pr-10"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted/40 transition hover:text-accent"
                    aria-label="Clear search"
                  >
                    <X size={13} aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 md:justify-end">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted/40">
                  {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
                </span>
                <div className="relative">
                  <SlidersHorizontal
                    size={13}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted/35"
                    aria-hidden="true"
                  />
                  <label htmlFor="shop-sort" className="sr-only">
                    Sort products
                  </label>
                  <select
                    id="shop-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="field appearance-none py-2.5 pl-8 pr-9 text-[0.65rem] uppercase tracking-[0.1em]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id} className="bg-bg text-text">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted/35"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <FilterRow label="Category">
                {['All', ...categoryNames].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={`chip ${category === item ? 'chip-active' : ''}`}
                  >
                    {item}
                    {item !== 'All' && (
                      <span className="text-[0.55rem] opacity-55">
                        {products.filter((product) => product.category === item).length}
                      </span>
                    )}
                  </button>
                ))}
              </FilterRow>

              <FilterRow label="Size">
                {['All', ...allSizes].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    aria-pressed={size === item}
                    className={`chip ${size === item ? 'chip-active' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </FilterRow>

              <FilterRow label="Colour">
                {[{ name: 'All' }, ...allColours].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setColour(item.name)}
                    aria-pressed={colour === item.name}
                    className={`chip ${colour === item.name ? 'chip-active' : ''}`}
                  >
                    {item.hex && (
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-white/20"
                        style={{ backgroundColor: item.hex }}
                        aria-hidden="true"
                      />
                    )}
                    {item.name}
                  </button>
                ))}
              </FilterRow>

              <FilterRow label="Price">
                <button
                  type="button"
                  onClick={() => setPrice('All')}
                  aria-pressed={price === 'All'}
                  className={`chip ${price === 'All' ? 'chip-active' : ''}`}
                >
                  All
                </button>
                {priceBands.map((band) => (
                  <button
                    key={band.id}
                    type="button"
                    onClick={() => setPrice(band.id)}
                    aria-pressed={price === band.id}
                    className={`chip ${price === band.id ? 'chip-active' : ''}`}
                  >
                    {band.label}
                  </button>
                ))}
              </FilterRow>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 py-5">
            <p className="text-[0.6rem] uppercase tracking-[0.14em] text-muted/35">
              Showing {filtered.length} of {products.length}
            </p>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-accent"
              >
                Clear all
                <X size={12} aria-hidden="true" />
              </button>
            )}
          </div>

          {filtered.length ? (
            <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-10 pb-24 sm:gap-x-6 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? {} : { opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <ProductCard product={product} priority={index < 4} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-line/20 px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line/15 bg-surface">
                <SearchX size={24} className="text-accent" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold uppercase tracking-tight">
                Nothing matched
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted/45">
                Try another word, loosen a filter, or start with the full edit.
              </p>
              <button type="button" onClick={clearAll} className="btn-primary mt-7">
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
