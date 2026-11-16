import { store } from '../lib/store'

export default function Marquee({ items = store.marquee, reverse = false, className = '' }) {
  const content = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-text/65 sm:text-[0.78rem]">
            {item}
          </span>
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`marquee-mask relative overflow-hidden border-y border-line/15 py-4 ${className}`}
      aria-label="Store highlights"
    >
      <div
        className={`flex w-max ${
          reverse ? 'animate-marquee-slow [animation-direction:reverse]' : 'animate-marquee'
        }`}
      >
        {content}
        <div aria-hidden="true">{content}</div>
      </div>
    </div>
  )
}
