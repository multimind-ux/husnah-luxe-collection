import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import MobileBar from './MobileBar'
import FloatingWhatsApp from './FloatingWhatsApp'
import CustomCursor from './CustomCursor'
import IntroLoader from './IntroLoader'
import ScrollToTop from './ScrollToTop'

function AnimatedOutlet() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? {} : { opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}

export default function StoreLayout() {
  return (
    <div className="min-h-screen overflow-x-clip pb-20 md:pb-0">
      <ScrollToTop />
      <Navbar />
      <AnimatedOutlet />
      <Footer />
      <CartDrawer />
      <MobileBar />
      <FloatingWhatsApp />
      <CustomCursor />
      <IntroLoader />
    </div>
  )
}
