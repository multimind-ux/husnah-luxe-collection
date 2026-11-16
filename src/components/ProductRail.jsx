import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal'
import SectionHeading from './SectionHeading'
import ProductCard from './ProductCard'

export default function ProductRail({
  eyebrow,
  title,
  description,
  products,
  viewAllHref = '/shop',
}) {
  const railRef = useRef(null)

  if (!products?.length) return null

  const scroll = (direction) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.82, 680),
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-20 sm:py-28" aria-label={`${title} carousel`}>
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            action={
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={() => scroll(-1)}
                    className="icon-btn"
                    aria-label={`Scroll ${title} left`}
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scroll(1)}
                    className="icon-btn"
                    aria-label={`Scroll ${title} right`}
                  >
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
                <Link
                  to={viewAllHref}
                  className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text/60 transition hover:text-accent"
                >
                  View all
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            }
          />
        </Reveal>

        <div
          ref={railRef}
          className="no-scrollbar snap-rail mt-10 flex gap-4 overflow-x-auto pb-2 sm:gap-5"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-item w-[76vw] max-w-[330px] shrink-0 sm:w-[46vw] lg:w-[24vw]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
