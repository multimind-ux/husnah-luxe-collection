import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { mailtoHref, store, telHref, whatsappLink } from '../lib/store'
import BrandMark from './BrandMark'

const shopLinks = [
  { to: '/shop', label: 'The edit' },
  { to: '/shop?category=Fragrance', label: 'Fragrance' },
  { to: '/shop?category=Scarves', label: 'Scarves' },
  { to: '/shop?category=Combos', label: 'Combos' },
  { to: '/shop?category=Body%20%26%20Essentials', label: 'Body & Essentials' },
]

const houseLinks = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/shop', label: 'New arrivals' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/15 bg-surface/30">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-editorial relative py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <p className="eyebrow">Have a question?</p>
            <h2 className="display mt-5 text-[clamp(3.2rem,8vw,8rem)]">
              LET’S <span className="text-outline">TALK.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted/50">
              Tell us what you’re looking for, ask about a piece, or send your order directly.
              A real person will reply.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(store.whatsappGreeting)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary magnetic-glow"
              >
                <MessageCircle size={15} aria-hidden="true" />
                Message us on WhatsApp
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={mailtoHref()} className="btn-outline">
                <Mail size={15} aria-hidden="true" />
                Email us
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <div>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-accent">
                Shop
              </p>
              <ul className="mt-5 space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs text-muted/50 transition hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-accent">
                House
              </p>
              <ul className="mt-5 space-y-3">
                {houseLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs text-muted/50 transition hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {store.instagramUrl && store.instagram && (
                  <li>
                    <a
                      href={store.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted/50 transition hover:text-text"
                    >
                      <Instagram size={12} aria-hidden="true" />
                      {store.instagram}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-line/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={whatsappLink(store.whatsappGreeting)}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3"
          >
            <MessageCircle size={16} className="mt-0.5 text-accent" aria-hidden="true" />
            <span>
              <span className="block text-[0.56rem] uppercase tracking-[0.2em] text-muted/35">
                WhatsApp
              </span>
              <span className="mt-1 block text-xs text-text/70 transition group-hover:text-accent">
                {store.phone}
              </span>
            </span>
          </a>
          <a href={telHref()} className="group flex items-start gap-3">
            <Phone size={16} className="mt-0.5 text-accent" aria-hidden="true" />
            <span>
              <span className="block text-[0.56rem] uppercase tracking-[0.2em] text-muted/35">
                Call
              </span>
              <span className="mt-1 block text-xs text-text/70 transition group-hover:text-accent">
                {store.phone}
              </span>
            </span>
          </a>
          <a href={`mailto:${store.email}`} className="group flex items-start gap-3">
            <Mail size={16} className="mt-0.5 text-accent" aria-hidden="true" />
            <span>
              <span className="block text-[0.56rem] uppercase tracking-[0.2em] text-muted/35">
                Email
              </span>
              <span className="mt-1 block break-all text-xs text-text/70 transition group-hover:text-accent">
                {store.email}
              </span>
            </span>
          </a>
          <div className="flex items-start gap-3">
            <MapPin size={16} className="mt-0.5 text-accent" aria-hidden="true" />
            <span>
              <span className="block text-[0.56rem] uppercase tracking-[0.2em] text-muted/35">
                Studio
              </span>
              <span className="mt-1 block text-xs text-text/70">{store.location}</span>
              <span className="mt-1 flex items-center gap-1 text-[0.6rem] text-muted/35">
                <Clock size={10} aria-hidden="true" />
                {store.hours}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <BrandMark />
          <p className="max-w-md text-[0.68rem] leading-6 text-muted/40">{store.description}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-[0.56rem] uppercase tracking-[0.18em] text-muted/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {store.name}. All rights reserved.
          </p>
          <p>{store.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
