import { useState } from 'react'
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import Seo from '../components/Seo'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { mailtoHref, store, telHref, whatsappLink } from '../lib/store'

export default function Contact() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError('Please add your name and a short message.')
      return
    }
    setError('')
    const text = `Hi ${store.name}, my name is ${name.trim()}. ${message.trim()}`
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <>
      <Seo title="Contact" description={store.contact.body} />
      <main className="pt-28 sm:pt-32">
        <section className="container-editorial pb-16 sm:pb-24">
          <Reveal>
            <p className="eyebrow">{store.contact.eyebrow}</p>
            <h1 className="display mt-5 text-[clamp(3.8rem,11vw,10rem)]">
              SAY <span className="text-outline">HELLO.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted/55">{store.contact.body}</p>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <Reveal delay={0.08}>
              <p className="max-w-md text-sm leading-7 text-muted/40">{store.contact.title}</p>
              <Stagger className="mt-8">
                <StaggerItem>
                  <a
                    href={whatsappLink(store.whatsappGreeting)}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-5 border-t border-line/15 py-5"
                  >
                    <span className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                        <MessageCircle size={17} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-muted/35">
                          WhatsApp
                        </span>
                        <span className="mt-1 block text-sm text-text transition group-hover:text-accent">
                          {store.phone}
                        </span>
                        <span className="mt-1 block text-[0.68rem] leading-5 text-muted/35">
                          {store.responseTime}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 text-muted/25 transition group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <a
                    href={telHref()}
                    className="group flex items-start justify-between gap-5 border-t border-line/15 py-5"
                  >
                    <span className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                        <Phone size={17} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-muted/35">
                          Call
                        </span>
                        <span className="mt-1 block text-sm text-text transition group-hover:text-accent">
                          {store.phone}
                        </span>
                        <span className="mt-1 block text-[0.68rem] leading-5 text-muted/35">
                          {store.hours}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 text-muted/25 transition group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <a
                    href={mailtoHref()}
                    className="group flex items-start justify-between gap-5 border-t border-line/15 py-5"
                  >
                    <span className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                        <Mail size={17} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-muted/35">
                          Email
                        </span>
                        <span className="mt-1 block break-all text-sm text-text transition group-hover:text-accent">
                          {store.email}
                        </span>
                        <span className="mt-1 block text-[0.68rem] leading-5 text-muted/35">
                          For longer notes and collaborations.
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 text-muted/25 transition group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start gap-4 border-t border-line/15 py-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                      <MapPin size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-muted/35">
                        Studio
                      </p>
                      <p className="mt-1 text-sm text-text">{store.location}</p>
                      <p className="mt-1 text-[0.68rem] leading-5 text-muted/35">
                        {store.address}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>

              <div className="mt-8 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.16em] text-muted/30">
                <Clock size={12} aria-hidden="true" />
                {store.hours}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <form
                onSubmit={handleSubmit}
                className="rounded-[1.75rem] border border-line/15 bg-surface/45 p-6 sm:p-8"
              >
                <p className="eyebrow">Send a note</p>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-none tracking-[-0.04em] sm:text-4xl">
                  START A <span className="text-outline">CONVERSATION.</span>
                </h2>
                <p className="mt-4 text-xs leading-6 text-muted/45">
                  This form opens WhatsApp with your message already written. No account, no
                  inbox black hole.
                </p>

                <div className="mt-7 space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-muted/40"
                    >
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      className="field"
                      placeholder="Name"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                        setError('')
                        setSent(false)
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-muted/40"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      className="field min-h-32 resize-none"
                      placeholder="What are you looking for?"
                      value={message}
                      onChange={(event) => {
                        setMessage(event.target.value)
                        setError('')
                        setSent(false)
                      }}
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-accent" role="alert">
                      {error}
                    </p>
                  )}
                  {sent && (
                    <p className="text-xs leading-5 text-accent" role="status">
                      WhatsApp should be open with your note. Send it to reach us.
                    </p>
                  )}
                  <button type="submit" className="btn-primary magnetic-glow w-full">
                    <Send size={14} aria-hidden="true" />
                    Send on WhatsApp
                  </button>
                  <a
                    href={mailtoHref()}
                    className="block text-center text-[0.6rem] font-medium uppercase tracking-[0.16em] text-muted/35 transition hover:text-accent"
                  >
                    Or email {store.email}
                  </a>
                </div>
              </form>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line/15 bg-surface/25 py-16 sm:py-20">
          <div className="container-editorial">
            <Reveal>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="eyebrow">Orders</p>
                  <h2 className="display mt-3 text-[clamp(2.4rem,5.5vw,5.5rem)]">
                    READY WHEN <span className="text-outline">YOU ARE.</span>
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-muted/45">
                    Choose a piece, send your order, and we’ll confirm the rest directly.
                  </p>
                </div>
                <a
                  href={whatsappLink(store.whatsappGreeting)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary magnetic-glow shrink-0"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Order on WhatsApp
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
