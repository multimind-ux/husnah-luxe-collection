import { MessageCircle } from 'lucide-react'
import { store, whatsappLink } from '../lib/store'

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(store.whatsappGreeting)}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 md:flex"
      aria-label="Ask a question on WhatsApp"
    >
      <span className="translate-x-2 rounded-full border border-line/15 bg-bg/85 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-text/65 opacity-0 backdrop-blur-xl transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Ask on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accentContrast shadow-glow transition duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/20 [animation-duration:2.8s]" />
        <MessageCircle size={22} strokeWidth={1.7} aria-hidden="true" />
      </span>
    </a>
  )
}
