import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

function Cursor() {
  const reduce = useReducedMotion()
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.45 })
  const ringY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.45 })

  useEffect(() => {
    if (reduce) return undefined
    document.body.classList.add('has-custom-cursor')

    const handleMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    const handleOver = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      setHovering(
        Boolean(
          target.closest(
            'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]',
          ),
        ),
      )
    }
    const handleDown = () => setPressed(true)
    const handleUp = () => setPressed(false)
    const handleLeave = () => setPressed(false)

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerover', handleOver, { passive: true })
    window.addEventListener('pointerdown', handleDown, { passive: true })
    window.addEventListener('pointerup', handleUp, { passive: true })
    window.addEventListener('blur', handleLeave)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerover', handleOver)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('blur', handleLeave)
    }
  }, [reduce, x, y])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[130] hidden md:block">
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          animate={{
            scale: pressed ? 0.75 : hovering ? 1.7 : 1,
            opacity: hovering ? 0.9 : 0.55,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
        />
      </motion.div>
    </div>
  )
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (fine.matches && !reduce.matches) setEnabled(true)
  }, [])

  if (!enabled) return null
  return <Cursor />
}
