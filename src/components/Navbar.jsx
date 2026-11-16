import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight, Mail, Menu, MessageCircle, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { mailtoHref, store, whatsappLink } from '../lib/store'
import BrandMark from './BrandMark'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { count, openCart } = useCart()
  const { scrollY } = useScroll()
  const location = useLocation()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 16)
    if (menuOpen) {
      setHidden(false)
      return
    }
    if (latest > previous && latest > 120) setHidden(true)
    else setHidden(false)
  })

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const handleKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? '-110%' : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-colors duration-500 ${
          scrolled || menuOpen
            ? 'border-b border-line/15 bg-bg/80 backdrop-blur-2xl'
            : 'bg-gradient-to-b from-bg/85 via-bg/40 to-transparent'
        }`}
      >
        <div className="hidden border-b border-line/10 sm:block">
          <div className="container-editorial flex h-8 items-center justify-between gap-4">
            <p className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-muted/45">
              {store.announcement}
            </p>
            <p className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-accent/80">
              {store.deliveryNote}
            </p>
          </div>
        </div>

        <div className="container-editorial flex h-16 items-center justify-between gap-4 sm:h-[70px]">
          <BrandMark onClick={() => setMenuOpen(false)} />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative py-2 text-[0.64rem] font-semibold uppercase tracking-[0.22em] transition ${
                    isActive ? 'text-accent' : 'text-text/60 hover:text-text'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px bg-accent transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden="true"
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={openCart}
              className="icon-btn relative"
              aria-label={`Open bag${count ? `, ${count} items` : ''}`}
            >
              <ShoppingBag size={16} strokeWidth={1.6} aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.55rem] font-bold leading-none text-accentContrast">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="icon-btn md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={17} aria-hidden="true" />
              ) : (
                <Menu size={17} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line/10 md:hidden"
            >
              <div className="container-editorial py-6">
                <nav className="flex flex-col" aria-label="Mobile navigation">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.end}
                        className={({ isActive }) =>
                          `flex items-center justify-between border-b border-line/10 py-4 font-display text-2xl font-bold uppercase tracking-tight ${
                            isActive ? 'text-accent' : 'text-text'
                          }`
                        }
                      >
                        {link.label}
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-6 grid gap-2">
                  <a
                    href={whatsappLink(store.whatsappGreeting)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full"
                  >
                    <MessageCircle size={15} aria-hidden="true" />
                    WhatsApp us
                  </a>
                  <a href={mailtoHref()} className="btn-outline w-full">
                    <Mail size={15} aria-hidden="true" />
                    {store.email}
                  </a>
                </div>
                <p className="mt-5 text-[0.6rem] uppercase tracking-[0.18em] text-muted/35">
                  {store.location} · {store.hours}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
