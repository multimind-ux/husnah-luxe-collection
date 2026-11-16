import { useCallback, useEffect, useState } from 'react'
import { INTRO_KEY, store } from '../lib/store'

export default function IntroLoader() {
  const [visible, setVisible] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      return !window.sessionStorage.getItem(INTRO_KEY)
    } catch (error) {
      return false
    }
  })
  const [leaving, setLeaving] = useState(false)

  const finish = useCallback(() => {
    setVisible(false)
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1')
    } catch (error) {
      /* ignore */
    }
  }, [])

  const hide = useCallback(() => {
    setLeaving(true)
    window.setTimeout(finish, 260)
  }, [finish])

  useEffect(() => {
    if (!visible) return undefined
    const timer = window.setTimeout(hide, 650)
    const handleKey = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter') hide()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', handleKey)
    }
  }, [visible, hide])

  if (!visible) return null

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-[200] border-b border-accent/20 bg-bg/95 backdrop-blur-xl ${
        leaving ? 'animate-intro-bar-out' : ''
      }`}
      role="status"
      aria-label={`Loading ${store.name}`}
    >
      <div className="container-editorial flex h-11 items-center gap-3 sm:gap-5">
        <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.18em] text-text/80">
          {store.name}
        </span>
        <span className="h-px flex-1 overflow-hidden bg-text/10">
          <span className="animate-intro-progress block h-full origin-left bg-accent" />
        </span>
        <button
          type="button"
          onClick={hide}
          className="pointer-events-auto text-[0.55rem] font-medium uppercase tracking-[0.18em] text-muted/45 transition hover:text-accent"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
