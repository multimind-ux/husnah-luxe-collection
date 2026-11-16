import { MessageCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { store, whatsappLink } from '../lib/store'

export default function MobileBar() {
  const { count, openCart } = useCart()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line/20 bg-bg/90 px-3 pb-[calc(0.7rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-2xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={openCart} className="btn-outline relative w-full">
          <ShoppingBag size={15} aria-hidden="true" />
          Bag
          {count > 0 && (
            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[0.6rem] font-bold text-accentContrast">
              {count}
            </span>
          )}
        </button>
        <a
          href={whatsappLink(store.whatsappGreeting)}
          target="_blank"
          rel="noreferrer"
          className="btn-primary w-full"
        >
          <MessageCircle size={15} aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
