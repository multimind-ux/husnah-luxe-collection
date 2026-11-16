import { Link } from 'react-router-dom'
import { ArrowUpRight, Home } from 'lucide-react'
import Seo from '../components/Seo'
import { store } from '../lib/store'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <main className="container-editorial flex min-h-[80svh] flex-col items-center justify-center pb-20 pt-32 text-center">
        <p className="eyebrow">404 · Off the edit</p>
        <h1 className="display mt-4 text-[clamp(6rem,22vw,18rem)] leading-[0.72]">
          <span className="text-outline">LOST</span>
          <span className="block text-accent">THE PLOT.</span>
        </h1>
        <p className="mt-7 max-w-md text-sm leading-7 text-muted/50">
          This page isn’t part of the edit. Head back to the shop or start again at the front
          door of {store.name}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="btn-primary">
            Shop the edit
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link to="/" className="btn-outline">
            <Home size={14} aria-hidden="true" />
            Back home
          </Link>
        </div>
      </main>
    </>
  )
}
