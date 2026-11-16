import { useEffect } from 'react'
import { absoluteImage, store } from '../lib/store'

function upsertMeta(attribute, key, content) {
  if (!content) return
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export default function Seo({
  title,
  description = store.metaDescription,
  image = '/images/products/bourbon-eau-de-parfum.jpg',
  type = 'website',
  jsonLd,
}) {
  const json = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = title ? `${title} — ${store.name}` : `${store.name} — ${store.tagline}`
    const fullImage = absoluteImage(image)
    const url = typeof window !== 'undefined' ? window.location.href : ''

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', store.name)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', fullImage)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', fullImage)
    upsertLink('canonical', url)

    const previous = document.getElementById('seo-jsonld')
    if (previous) previous.remove()
    if (json) {
      const script = document.createElement('script')
      script.id = 'seo-jsonld'
      script.type = 'application/ld+json'
      script.textContent = json
      document.head.appendChild(script)
    }

    return () => {
      const script = document.getElementById('seo-jsonld')
      if (script) script.remove()
    }
  }, [title, description, image, type, json, jsonLd])

  return null
}
