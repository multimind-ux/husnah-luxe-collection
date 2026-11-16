import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import Magnetic from '../components/Magnetic'
import { formatMoney, products, store } from '../lib/store'

const HomeSections = lazy(() => import('../components/HomeSections'))

function Hero() {
  const heroRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const mainY = useTransform(scrollYProgress, [0, 1], [0, -48])
  const floatY = useTransform(scrollYProgress, [0, 1], [0, 34])
  const featured = products.find((product) => product.featured) || products[0]
  const heroImage = store.hero.featuredImage || featured.images?.[0]
  const floatingA = products.find((product) => product.category === 'Scarves') || products[0]
  const floatingB = products.find((product) => product.category === 'Combos') || products[4]
  const avatarProducts = [products[1], products[5], products[9]]

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pb-16 pt-24 sm:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent/5 blur-[100px]"
        aria-hidden="true"
      />

      <div className="container-editorial relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          <p className="eyebrow">{store.hero.eyebrow}</p>
        </motion.div>

        <h1 className="display mt-5 text-[clamp(1.8rem,8.4vw,9rem)] text-text">
          {store.hero.titleLines.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.88,
                  delay: 0.08 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`block ${index === store.hero.outlinedLine ? 'text-outline' : ''}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 pb-2"
          >
            <p className="max-w-md text-pretty text-sm leading-7 text-muted/55 sm:text-base">
              {store.hero.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link to="/shop" className="btn-primary magnetic-glow">
                  {store.hero.primaryCta}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </Magnetic>
              <a href="#collections" className="btn-outline">
                {store.hero.secondaryCta}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden="true">
                {avatarProducts.map((product) => (
                  <span
                    key={product.id}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-bg bg-surface"
                  >
                    <img
                      src={product.images?.[0]}
                      alt=""
                      width="900"
                      height="1125"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </span>
                ))}
              </div>
              <p className="text-[0.6rem] uppercase leading-5 tracking-[0.16em] text-muted/40">
                {products.length} pieces.
                <br />
                One point of view.
              </p>
            </div>
          </motion.div>

          <div className="relative flex min-h-[430px] w-full items-center justify-center sm:min-h-[520px] lg:min-h-[540px]">
            <div
              className="absolute left-1/2 top-1/2 h-[68%] w-[64%] -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-accent/20 blur-[80px]"
              aria-hidden="true"
            />

            <motion.div
              style={{ y: reduce ? 0 : mainY }}
              className="relative z-10 w-[66%] max-w-[360px]"
            >
              <Link
                to={`/product/${featured.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[2rem] border border-line/20 bg-surface shadow-card"
              >
                <img
                  src={heroImage}
                  srcSet="/images/products/bourbon-eau-de-parfum-hero-360.webp 360w, /images/products/bourbon-eau-de-parfum-hero-480.webp 480w, /images/products/bourbon-eau-de-parfum-hero.webp 600w"
                  sizes="(max-width: 640px) 240px, 360px"
                  alt={`${featured.name} — ${featured.category}`}
                  width="600"
                  height="750"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute left-4 top-4 rounded-full border border-accent/25 bg-bg/70 px-3 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur">
                  Featured drop
                </div>
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                  <div>
                    <p className="text-[0.55rem] uppercase tracking-[0.2em] text-cream/55">
                      {featured.category}
                    </p>
                    <p className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-cream sm:text-2xl">
                      {featured.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium tabular-nums text-cream">
                      {formatMoney(featured.price)}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1 text-[0.55rem] uppercase tracking-[0.14em] text-cream/55">
                      View piece
                      <ArrowUpRight size={11} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: reduce ? 0 : floatY }}
              className="absolute left-0 top-8 z-20 w-24 sm:left-2 sm:w-32"
            >
              <Link
                to={`/product/${floatingA.slug}`}
                className="group block overflow-hidden rounded-2xl border border-line/20 bg-surface shadow-soft"
                aria-label={`${floatingA.category} — view ${floatingA.name}`}
              >
                <img
                  src={floatingA.images?.[0]}
                  alt=""
                  width="900"
                  height="1125"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="block px-3 py-2 text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-text/60">
                  {floatingA.category}
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, x: 20, y: -16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.75, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: reduce ? 0 : floatY }}
              className="absolute bottom-8 right-0 z-20 w-28 sm:right-2 sm:w-36"
            >
              <Link
                to={`/product/${floatingB.slug}`}
                className="group block overflow-hidden rounded-2xl border border-line/20 bg-surface shadow-soft"
                aria-label={`${floatingB.category} — view ${floatingB.name}`}
              >
                <img
                  src={floatingB.images?.[0]}
                  alt=""
                  width="900"
                  height="1125"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="block px-3 py-2 text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-text/60">
                  {floatingB.category}
                </span>
              </Link>
            </motion.div>

            <span className="absolute -right-1 top-1/2 hidden -translate-y-1/2 rotate-90 text-[0.52rem] uppercase tracking-[0.4em] text-muted/30 lg:block">
              {store.location}
            </span>
          </div>
        </div>
      </div>

      <a
        href="#collections"
        className="container-editorial mt-10 hidden items-center gap-2 text-[0.56rem] uppercase tracking-[0.2em] text-muted/35 transition hover:text-accent lg:flex"
      >
        <ArrowDown size={13} aria-hidden="true" />
        Scroll to explore
      </a>
    </section>
  )
}


export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <HomeSections />
      </Suspense>
    </>
  )
}
