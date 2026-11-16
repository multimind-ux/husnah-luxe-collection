import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'images', 'placeholders')
mkdirSync(outDir, { recursive: true })

const palette = {
  Fragrance: {
    word: 'FRAGRANCE',
    sub: 'SCENT STUDY',
  },
  Bags: {
    word: 'BAGS',
    sub: 'FORM STUDY',
  },
  Jewelry: {
    word: 'JEWELRY',
    sub: 'METAL STUDY',
  },
  Accessories: {
    word: 'ACCESSORIES',
    sub: 'DETAIL STUDY',
  },
}

function artFor(category, n, alt) {
  const shift = alt ? 26 : -14
  const rotate = alt ? -5 : 3
  const g = `transform="translate(${shift} 0) rotate(${rotate} 450 570)"`

  if (category === 'Fragrance') {
    return `
      <g ${g}>
        <rect x="392" y="286" width="116" height="52" rx="14" fill="url(#metal)" opacity=".9"/>
        <rect x="414" y="338" width="72" height="46" rx="8" fill="#F5F1EA" opacity=".22"/>
        <rect x="330" y="380" width="240" height="348" rx="34" fill="#F5F1EA" opacity=".08" stroke="#F5F1EA" stroke-opacity=".3"/>
        <rect x="354" y="430" width="192" height="214" rx="18" fill="none" stroke="url(#metal)" stroke-width="2" opacity=".9"/>
        <text x="450" y="520" text-anchor="middle" fill="#F5F1EA" fill-opacity=".82" font-family="Arial, sans-serif" font-size="28" letter-spacing="8">NOIR</text>
        <text x="450" y="566" text-anchor="middle" fill="#D4AF37" font-family="Arial, sans-serif" font-size="13" letter-spacing="5">ATELIER</text>
        <line x1="450" y1="590" x2="450" y2="616" stroke="#D4AF37" stroke-width="2" opacity=".75"/>
      </g>`
  }

  if (category === 'Bags') {
    return `
      <g ${g}>
        <path d="M342 470 C342 380 558 380 558 470" fill="none" stroke="url(#metal)" stroke-width="18" stroke-linecap="round"/>
        <rect x="300" y="458" width="300" height="268" rx="24" fill="#F5F1EA" opacity=".08" stroke="#F5F1EA" stroke-opacity=".32" stroke-width="2"/>
        <path d="M300 528 H600" stroke="#D4AF37" stroke-opacity=".55" stroke-width="2"/>
        <rect x="420" y="512" width="60" height="34" rx="8" fill="url(#metal)" opacity=".9"/>
        <circle cx="450" cy="529" r="5" fill="#0B0B0C"/>
        <path d="M366 598 H534" stroke="#F5F1EA" stroke-opacity=".22" stroke-width="2"/>
      </g>`
  }

  if (category === 'Jewelry') {
    return alt
      ? `
      <g ${g}>
        <circle cx="382" cy="570" r="128" fill="none" stroke="url(#metal)" stroke-width="24" opacity=".95"/>
        <circle cx="524" cy="570" r="104" fill="none" stroke="#F5F1EA" stroke-opacity=".38" stroke-width="5"/>
        <path d="M524 466 L558 510 L524 570 L490 510 Z" fill="#F5F1EA" fill-opacity=".14" stroke="url(#metal)" stroke-width="3"/>
      </g>`
      : `
      <g ${g}>
        <circle cx="450" cy="584" r="142" fill="none" stroke="url(#metal)" stroke-width="28"/>
        <path d="M450 424 L512 500 L450 566 L388 500 Z" fill="#F5F1EA" fill-opacity=".12" stroke="url(#metal)" stroke-width="4"/>
        <circle cx="450" cy="500" r="22" fill="url(#metal)" opacity=".8"/>
      </g>`
  }

  return alt
    ? `
      <g ${g}>
        <rect x="296" y="500" width="308" height="186" rx="24" fill="#F5F1EA" opacity=".07" stroke="#F5F1EA" stroke-opacity=".3" stroke-width="2"/>
        <rect x="328" y="536" width="244" height="12" rx="6" fill="url(#metal)" opacity=".9"/>
        <rect x="328" y="572" width="180" height="6" rx="3" fill="#F5F1EA" fill-opacity=".24"/>
        <rect x="328" y="598" width="220" height="6" rx="3" fill="#F5F1EA" fill-opacity=".14"/>
        <circle cx="560" cy="636" r="16" fill="url(#metal)" opacity=".85"/>
      </g>`
    : `
      <g ${g}>
        <rect x="270" y="510" width="164" height="144" rx="54" fill="none" stroke="url(#metal)" stroke-width="14"/>
        <rect x="466" y="510" width="164" height="144" rx="54" fill="none" stroke="url(#metal)" stroke-width="14"/>
        <path d="M434 570 C446 548 454 548 466 570" fill="none" stroke="url(#metal)" stroke-width="14" stroke-linecap="round"/>
        <path d="M270 550 L216 520" stroke="url(#metal)" stroke-width="12" stroke-linecap="round"/>
        <path d="M630 550 L684 520" stroke="url(#metal)" stroke-width="12" stroke-linecap="round"/>
      </g>`
}

for (const [category, meta] of Object.entries(palette)) {
  const folder = category.toLowerCase()
  for (let n = 1; n <= 4; n += 1) {
    for (const alt of [false, true]) {
      const suffix = alt ? '-alt' : ''
      const fileName = `${folder}-${n}${suffix}.svg`
      const art = artFor(category, n, alt)
      const lineOffset = alt ? 48 : 0
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1125" viewBox="0 0 900 1125" role="img" aria-label="${meta.word.toLowerCase()} placeholder image">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B0B0C"/>
      <stop offset=".55" stop-color="#141416"/>
      <stop offset="1" stop-color="#1B1B1E"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="58%">
      <stop offset="0" stop-color="#D4AF37" stop-opacity=".2"/>
      <stop offset=".55" stop-color="#D4AF37" stop-opacity=".05"/>
      <stop offset="1" stop-color="#D4AF37" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F5E6AE"/>
      <stop offset=".45" stop-color="#D4AF37"/>
      <stop offset="1" stop-color="#8C6A18"/>
    </linearGradient>
  </defs>
  <rect width="900" height="1125" fill="url(#bg)"/>
  <rect width="900" height="1125" fill="url(#glow)"/>
  <g stroke="#F5F1EA" stroke-opacity=".055" stroke-width="1">
    <line x1="${90 + lineOffset}" y1="0" x2="${90 + lineOffset}" y2="1125"/>
    <line x1="${270 + lineOffset}" y1="0" x2="${270 + lineOffset}" y2="1125"/>
    <line x1="${630 - lineOffset}" y1="0" x2="${630 - lineOffset}" y2="1125"/>
    <line x1="${810 - lineOffset}" y1="0" x2="${810 - lineOffset}" y2="1125"/>
    <line x1="0" y1="${150 + lineOffset}" x2="900" y2="${150 + lineOffset}"/>
    <line x1="0" y1="${850 - lineOffset}" x2="900" y2="${850 - lineOffset}"/>
  </g>
  <g fill="#F5F1EA" font-family="Arial, Helvetica, sans-serif">
    <text x="60" y="86" font-size="17" letter-spacing="7" fill-opacity=".78">HUSNAH LUXE</text>
    <text x="840" y="86" text-anchor="end" font-size="12" letter-spacing="4" fill-opacity=".38">${String(n).padStart(2, '0')} / 04</text>
    <text x="60" y="218" font-size="64" letter-spacing="10" fill="none" stroke="#F5F1EA" stroke-opacity=".38" stroke-width="1.4">${meta.word}</text>
    <text x="62" y="250" font-size="12" letter-spacing="6" fill="#D4AF37" fill-opacity=".8">${meta.sub}</text>
    <text x="60" y="1016" font-size="12" letter-spacing="5" fill-opacity=".36">IMAGE PLACEHOLDER</text>
    <text x="60" y="1052" font-size="22" letter-spacing="4" fill-opacity=".78">COMING SOON</text>
  </g>
  ${art}
  <rect x="1" y="1" width="898" height="1123" fill="none" stroke="#F5F1EA" stroke-opacity=".12"/>
</svg>
`
      writeFileSync(join(outDir, fileName), svg, 'utf8')
    }
  }
}

writeFileSync(
  join(root, 'public', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0B0B0C"/><rect x="6" y="6" width="52" height="52" rx="10" fill="none" stroke="#D4AF37" stroke-opacity=".55"/><text x="32" y="42" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="2" fill="#D4AF37">HL</text></svg>`,
  'utf8',
)

console.log(`Generated placeholder images in ${outDir}`)
