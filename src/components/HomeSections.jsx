import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  PackageCheck,
  Sparkles,
  Truck,
} from 'lucide-react'
import Marquee from './Marquee'
import SectionHeading from './SectionHeading'
import ProductRail from './ProductRail'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { formatMoney, products, store, whatsappLink } from '../lib/store'

const whyIcons = [Sparkles, Truck, MessageCircle, PackageCheck]

function CollectionTile({ category, className = '' }) {
  const count = products.filter((product) => product.category === category.name).length

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className={`group relative block overflow-hidden rounded-[1.5rem] border border-line/15 bg-surface ${className}`}
    >
      <img
        src={category.image}
        alt=""
        width="900"
        height="1125"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-85"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/5"
        aria-hidden="true"
      />
      <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
        <p className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-cream/55">
          {count} pieces
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-[-0.04em] text-cream sm:text-4xl">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-cream/55">{category.caption}</p>
      </div>
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-ink/30 text-cream/75 backdrop-blur transition duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accentContrast">
        <ArrowUpRight size={15} aria-hidden="true" />
      </span>
    </Link>
  )
}

function BentoSection() {
  const featured = products.find((product) => product.featured) || products[0]
  const [first, second, third, fourth] = store.categories

  return (
    <section id="collections" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            eyebrow="The edit"
            title={
              <>
                FOUR <span className="text-outline">OBSESSIONS.</span>
              </>
            }
            description="A tight edit, arranged by mood. Start where you are, or take the whole point of view."
            action={
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text/60 transition hover:text-accent"
              >
                Shop everything
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="grid auto-rows-[190px] grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-[230px_230px_260px] md:gap-4">
            <CollectionTile
              category={first}
              className="col-span-2 row-span-2 min-h-[420px] md:col-span-5 md:row-span-2 md:min-h-0"
            />
            <CollectionTile category={second} className="col-span-1 md:col-span-4" />
            <CollectionTile category={third} className="col-span-1 md:col-span-3" />

            <Link
              to={`/product/${featured.slug}`}
              className="group relative col-span-2 overflow-hidden rounded-[1.5rem] border border-line/15 bg-surface md:col-span-7"
            >
              <img
                src={featured.images?.[1] || featured.images?.[0]}
                alt=""
                width="900"
                height="1125"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-85"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-ink/10"
                aria-hidden="true"
              />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 sm:inset-x-6 sm:top-6">
                <span className="rounded-full border border-accent/30 bg-bg/50 px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-accent backdrop-blur">
                  Featured drop
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition group-hover:border-accent group-hover:bg-accent group-hover:text-accentContrast">
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </div>
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                <p className="text-[0.54rem] uppercase tracking-[0.2em] text-cream/55">
                  {featured.category}
                </p>
                <h3 className="mt-1.5 font-display text-3xl font-bold uppercase tracking-[-0.04em] text-cream sm:text-4xl">
                  {featured.name}
                </h3>
                <p className="mt-1 text-sm text-cream/60">{formatMoney(featured.price)}</p>
              </div>
            </Link>

            <CollectionTile category={fourth} className="col-span-1 md:col-span-4" />

            <Link
              to="/about"
              className="col-span-1 flex min-h-[220px] flex-col justify-between rounded-[1.5rem] border border-accent/20 bg-accent p-5 text-accentContrast transition duration-300 hover:brightness-105 md:col-span-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] opacity-65">
                  The house code
                </p>
                <ArrowUpRight size={16} aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold uppercase leading-[0.95] tracking-[-0.04em] sm:text-3xl">
                  Fewer pieces.
                  <br />
                  More intention.
                </p>
                <p className="mt-3 text-[0.62rem] font-medium uppercase tracking-[0.16em] opacity-65">
                  Read our story
                </p>
              </div>
            </Link>

            <Link
              to="/shop"
              className="group col-span-2 flex min-h-[220px] flex-col justify-between rounded-[1.5rem] border border-line/15 bg-surface/50 p-5 transition hover:border-accent/40 md:col-span-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  The full edit
                </p>
                <ArrowUpRight
                  size={16}
                  className="text-text/40 transition group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.04em] sm:text-4xl">
                  {products.length} pieces.
                  <br />
                  <span className="text-outline">No noise.</span>
                </p>
                <p className="mt-3 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted/40">
                  Shop all
                </p>
              </div>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function WhyStrip() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            eyebrow="Why shop with us"
            title={
              <>
                LESS NOISE. <span className="text-outline">MORE CARE.</span>
              </>
            }
            description="A smaller shop means a closer look at every order, every box, and every conversation."
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-line/15 bg-line/15 sm:grid-cols-2 lg:grid-cols-4">
          {store.why.map((item, index) => {
            const Icon = whyIcons[index] || Sparkles
            return (
              <StaggerItem key={item.title} className="relative bg-bg p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                    <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-display text-[0.62rem] font-semibold tracking-[0.2em] text-muted/55">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-muted/60">{item.body}</p>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

function TrustSection() {
  const imageA = products[5]
  const imageB = products[9]

  return (
    <section className="py-20 sm:py-28">
      <div className="container-editorial grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-line/15 bg-surface">
              <img
                src={imageA.images?.[0]}
                alt={`${imageA.name} — ${imageA.category}`}
                width="900"
                height="1125"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-10 aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-line/15 bg-surface">
              <img
                src={imageB.images?.[0]}
                alt={`${imageB.name} — ${imageB.category}`}
                width="900"
                height="1125"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="glass-panel absolute bottom-5 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:bottom-8 sm:left-6">
            <Truck size={18} className="text-accent" aria-hidden="true" />
            <div>
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-text/80">
                {store.deliveryNote}
              </p>
              <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.12em] text-muted/40">
                Arranged on WhatsApp
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">{store.trust.eyebrow}</p>
          <h2 className="display mt-4 text-[clamp(2.5rem,5vw,5rem)] leading-[0.94] text-text">
            {store.trust.title}
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted/50">{store.trust.body}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {store.trust.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-xs leading-5 text-muted/60">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={10} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink(store.whatsappGreeting)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary magnetic-glow mt-8"
          >
            <MessageCircle size={15} aria-hidden="true" />
            Order on WhatsApp
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default function HomeSections() {
  const newArrivals = products.filter((product) => product.newArrival)
  const bestSellers = products.filter((product) => product.bestSeller)

  return (
    <>
      <Marquee />
      <BentoSection />

      <ProductRail
        eyebrow="Just in"
        title={
          <>
            NEW <span className="text-outline">ARRIVALS</span>
          </>
        }
        description="The latest pieces to land in the edit. Limited quantities, first come."
        products={newArrivals}
        viewAllHref="/shop?sort=newest"
      />

      <WhyStrip />

      <ProductRail
        eyebrow="Most wanted"
        title={
          <>
            BEST <span className="text-outline">SELLERS</span>
          </>
        }
        description="The pieces that keep coming back. Reordered, restocked, and still moving."
        products={bestSellers}
        viewAllHref="/shop?sort=featured"
      />

      <TrustSection />
    </>
  )
}
