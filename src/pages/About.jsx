import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, MessageCircle, Search, Truck } from 'lucide-react'
import Seo from '../components/Seo'
import SectionHeading from '../components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { products, store, whatsappLink } from '../lib/store'

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Find your piece',
    body: 'Browse the edit, open a quick view, and choose your size and colour.',
  },
  {
    icon: MessageCircle,
    number: '02',
    title: 'Send your order',
    body: 'Add to bag and send the pre-filled order to us on WhatsApp. We confirm stock and delivery.',
  },
  {
    icon: Truck,
    number: '03',
    title: 'We arrange delivery',
    body: 'Once confirmed, your piece is packed and sent anywhere in Nigeria.',
  },
]

export default function About() {
  const images = [products[4], products[8], products[12], products[1]]

  return (
    <>
      <Seo title="About" description={store.about.body} />
      <main className="pt-28 sm:pt-32">
        <section className="container-editorial pb-16 sm:pb-24">
          <Reveal>
            <p className="eyebrow">{store.about.eyebrow}</p>
            <h1 className="display mt-5 text-[clamp(3.5rem,10.5vw,10rem)]">
              NOT FOR <span className="text-outline">EVERYONE.</span>
            </h1>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <Reveal delay={0.08} className="flex flex-col justify-between gap-10">
              <div>
                <p className="max-w-md text-sm leading-7 text-muted/55">{store.about.body}</p>
                <p className="mt-5 max-w-md text-sm leading-7 text-muted/40">
                  {store.about.secondary}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/shop" className="btn-primary">
                  Shop the edit
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <a
                  href={whatsappLink(store.whatsappGreeting)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  <MessageCircle size={14} aria-hidden="true" />
                  Talk to us
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {images.map((product, index) => (
                  <div
                    key={product.id}
                    className={`overflow-hidden rounded-[1.5rem] border border-line/15 bg-surface ${
                      index === 1 ? 'mt-8 sm:mt-12' : ''
                    } ${index === 2 ? '-mt-4 sm:-mt-6' : ''} ${
                      index === 3 ? 'mt-4 sm:mt-6' : ''
                    }`}
                  >
                    <img
                      src={product.images?.[0]}
                      alt={`${product.name} — ${product.category}`}
                      width="900"
                      height="1125"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-line/15 bg-surface/25 py-20 sm:py-24">
          <div className="container-editorial">
            <Reveal>
              <SectionHeading
                eyebrow="What we stand for"
                title={
                  <>
                    THE HOUSE <span className="text-outline">CODE.</span>
                  </>
                }
                description="A small set of rules that shape everything we choose, wrap, and send."
              />
            </Reveal>
            <Stagger className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-line/15 bg-line/15 sm:grid-cols-2 lg:grid-cols-4">
              {store.about.values.map((value, index) => (
                <StaggerItem key={value} className="bg-bg p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                      <Check size={14} aria-hidden="true" />
                    </span>
                    <span className="font-display text-[0.62rem] font-semibold tracking-[0.2em] text-muted/55">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-6 font-display text-lg font-bold uppercase leading-tight tracking-[-0.02em]">
                    {value}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="container-editorial py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2 className="display mt-4 text-[clamp(2.8rem,6vw,6rem)]">
                NO CART <span className="text-outline">THEATRE.</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-muted/50">
                Three steps, one conversation. We keep checkout human and delivery clear.
              </p>
            </Reveal>
            <div className="space-y-0">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <Reveal key={step.number} delay={index * 0.06}>
                    <div className="flex gap-5 border-t border-line/15 py-7 first:border-t-0 first:pt-0">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-muted/30">
                            {step.number}
                          </span>
                          <h3 className="font-display text-xl font-bold uppercase tracking-[-0.02em]">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-2 max-w-lg text-xs leading-6 text-muted/60">{step.body}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="container-editorial pb-20 sm:pb-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line/15 bg-accent p-7 text-accentContrast sm:p-12">
              <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] opacity-65">
                    {store.location}
                  </p>
                  <p className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em]">
                    The last detail is rarely an afterthought.
                  </p>
                </div>
                <a
                  href={whatsappLink(store.whatsappGreeting)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-light shrink-0"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Message the house
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}
