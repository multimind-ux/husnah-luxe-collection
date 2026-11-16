import { Link } from 'react-router-dom'
import { store } from '../lib/store'

export default function BrandMark({ className = '', onClick }) {
  const words = store.name.trim().split(/\s+/)
  const primary = words[0] || store.name
  const secondary = words.slice(1).join(' ') || 'Atelier'
  const initials =
    words.length > 1
      ? words
          .slice(0, 2)
          .map((word) => word[0])
          .join('')
      : store.name.slice(0, 2).toUpperCase()

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-accent/55 bg-accent/10 font-display text-[0.68rem] font-bold tracking-[0.08em] text-accent transition duration-500 group-hover:bg-accent group-hover:text-accentContrast">
        <span className="absolute inset-x-0 top-0 h-px bg-accent/60" />
        <span className="absolute inset-y-0 right-0 w-px bg-accent/30" />
        {initials}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.78rem] font-bold uppercase tracking-[0.24em] text-text">
          {primary}
        </span>
        <span
          className={`mt-1 font-sans font-medium uppercase text-accent ${
            secondary.length > 10
              ? 'text-[0.44rem] tracking-[0.22em]'
              : 'text-[0.52rem] tracking-[0.38em]'
          }`}
        >
          {secondary}
        </span>
      </span>
    </Link>
  )
}
