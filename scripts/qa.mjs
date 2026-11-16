import { chromium } from 'playwright-core'

const executablePath =
  process.env.CHROME_PATH ||
  '/home/abdulbasit/.cache/ms-playwright/chromium-1254/chrome-linux64/chrome'
const base = process.env.URL || 'http://127.0.0.1:4173'

const browser = await chromium.launch({
  executablePath,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
})
await context.addInitScript(() => {
  try {
    sessionStorage.setItem('noir-intro-seen', '1')
    if (!sessionStorage.getItem('qa-init')) {
      localStorage.removeItem('noir-cart-v1')
      sessionStorage.setItem('qa-init', '1')
    }
  } catch (error) {
    /* ignore */
  }
})
const page = await context.newPage()
const errors = []
const checks = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`)
})
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))

function check(name, condition, detail = '') {
  if (!condition) throw new Error(`${name}${detail ? ` — ${detail}` : ''}`)
  checks.push(name)
}

async function wait(ms = 600) {
  await page.waitForTimeout(ms)
}

try {
  await page.goto(base, { waitUntil: 'networkidle' })
  await wait(600)
  check('home title uses the real store name', (await page.title()).includes('Husnah Luxe Collection'))

  const bodyText = await page.locator('body').innerText()
  check('no leftover Noir Atelier copy', !/Noir Atelier/i.test(bodyText))
  check('hero headline renders', bodyText.includes('DARK') && bodyText.includes('DELIVERED.'))
  check('featured product renders', /Bourbon Eau de Parfum/i.test(bodyText))

  const heroImage = page.locator('main img, section img').first()
  check(
    'hero image loaded',
    await heroImage.evaluate((img) => img.complete && img.naturalWidth > 0),
  )

  await wait(900)
  const loadedBody = await page.locator('body').innerText()
  check('below-fold sections lazy-load', /NEW ARRIVALS/i.test(loadedBody))
  check('bundle rail content is present', /UAE JERSEY SCARF/i.test(loadedBody))

  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  check('light theme applied', (await page.locator('html.light').count()) === 1)
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  check('dark theme restored', (await page.locator('html.light').count()) === 0)

  await page.goto(`${base}/shop`, { waitUntil: 'networkidle' })
  await wait(500)
  check('shop shows all 22 products', (await page.locator('article').count()) === 22)

  await page.getByRole('button', { name: /^Scarves/ }).click()
  await wait()
  check('Scarves filter returns 8', (await page.locator('article').count()) === 8)

  await page.goto(`${base}/shop`, { waitUntil: 'networkidle' })
  await page.getByLabel('Search products').fill('Bourbon')
  await wait()
  check('search finds Bourbon', (await page.locator('article').count()) === 1)
  check(
    'Bourbon result is correct',
    /Bourbon/i.test(await page.locator('article').first().innerText()),
  )

  await page.getByLabel('Search products').fill('')
  await page.getByLabel('Sort products').selectOption('price-asc')
  await wait()
  check(
    'price sort puts the lowest price first',
    /Double-Layer Inner Cap/i.test(await page.locator('article').first().innerText()),
  )

  await page.locator('article').first().getByRole('button', { name: /Quick view/ }).click()
  await wait()
  const quickView = page.getByRole('dialog').filter({ hasText: 'Quick view' })
  check('quick view opens', await quickView.isVisible())
  await quickView.getByRole('button', { name: /Add to bag/ }).click()
  await wait(500)
  const cartDialog = page.getByRole('dialog').filter({ hasText: 'Your bag' })
  check('quick view add opens the cart', await cartDialog.isVisible())
  check(
    'quick view item is in the cart',
    /Double-Layer Inner Cap/i.test(await cartDialog.innerText()),
  )
  await cartDialog.getByRole('button', { name: 'Close bag' }).click()
  await wait()

  await page.goto(`${base}/product/uae-jersey-scarf`, { waitUntil: 'networkidle' })
  await wait()
  const scarfText = await page.locator('main').innerText()
  check('bundle pricing is shown on the product page', scarfText.includes('6 pieces — ₦17,000'))
  check('dozen bundle is shown', scarfText.includes('Dozen — ₦34,000'))

  await page.goto(`${base}/product/pocket-perfume-25ml`, { waitUntil: 'networkidle' })
  await wait()
  check('variant picker shows the first scent', (await page.locator('main').innerText()).includes('Flare'))
  await page.getByRole('button', { name: 'Forever', exact: true }).click()
  await wait(150)
  const waHref = await page
    .getByRole('link', { name: /Order on WhatsApp/ })
    .first()
    .getAttribute('href')
  check('product WhatsApp number is correct', waHref.includes('wa.me/2347080059463'))
  check(
    'product WhatsApp message contains selection',
    decodeURIComponent(waHref).includes('Variant: Forever') &&
      decodeURIComponent(waHref).includes('Price: ₦5,000'),
  )

  await page.getByRole('button', { name: /Add to bag/ }).first().click()
  await wait(500)
  const cartAfterVariant = page.getByRole('dialog').filter({ hasText: 'Your bag' })
  check('variant add opens the cart', await cartAfterVariant.isVisible())
  check(
    'variant line is stored in the cart',
    /Forever/i.test(await cartAfterVariant.innerText()),
  )

  await page.evaluate(() => {
    window.__opened = null
    window.open = (url) => {
      window.__opened = url
      return null
    }
  })
  await cartAfterVariant.getByLabel('Full name').fill('Test Customer')
  await cartAfterVariant.getByLabel('Phone number').fill('08012345678')
  await cartAfterVariant.getByLabel('Delivery address').fill('12 Test Street, Lagos')
  await cartAfterVariant.getByRole('button', { name: /Send order on WhatsApp/ }).click()
  await wait(300)
  const orderUrl = await page.evaluate(() => window.__opened)
  check('checkout opens a WhatsApp URL', Boolean(orderUrl) && orderUrl.startsWith('https://wa.me/2347080059463'))
  const orderMessage = decodeURIComponent(orderUrl.split('?text=')[1] || '')
  check('checkout includes the customer name', orderMessage.includes('Name: Test Customer'))
  check('checkout includes the customer phone', orderMessage.includes('Phone: 08012345678'))
  check('checkout includes the address', orderMessage.includes('Address: 12 Test Street, Lagos'))
  check('checkout includes the selected variant', orderMessage.includes('Variant: Forever'))
  check('checkout includes a total', orderMessage.includes('Total: ₦'))

  await page.reload({ waitUntil: 'networkidle' })
  await wait()
  await page.getByRole('button', { name: /Open bag/ }).click()
  await wait(300)
  const persistedCart = page.getByRole('dialog').filter({ hasText: 'Your bag' })
  check('cart persists after reload', await persistedCart.isVisible())
  check(
    'persisted cart still has items',
    /Pocket Perfume 25ml/i.test(await persistedCart.innerText()),
  )
  await persistedCart.getByRole('button', { name: 'Close bag' }).click()

  for (const path of ['/about', '/contact', '/missing-page']) {
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
    await wait(250)
    const text = await page.locator('body').innerText()
    check(`${path} renders`, text.length > 100)
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(base, { waitUntil: 'networkidle' })
  await wait(500)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  )
  check('mobile home has no horizontal overflow', overflow <= 1, `overflow ${overflow}px`)
  await page.getByRole('button', { name: 'Open menu' }).click()
  await wait()
  check('mobile menu opens', (await page.locator('nav[aria-label="Mobile navigation"]').count()) === 1)
  check('mobile menu shows all links', (await page.locator('nav[aria-label="Mobile navigation"] a').count()) === 4)
  check('mobile sticky bag action is visible', await page.getByRole('button', { name: /Open bag/ }).isVisible())

  await page.goto(`${base}/shop`, { waitUntil: 'networkidle' })
  await wait(500)
  const shopOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  )
  check('mobile shop has no horizontal overflow', shopOverflow <= 1, `overflow ${shopOverflow}px`)

  check('no browser errors', errors.length === 0, errors.join(' | '))
  console.log(`PASS — ${checks.length} checks`)
  for (const item of checks) console.log(`  ✓ ${item}`)
} catch (error) {
  console.error(`FAIL — ${error.message}`)
  console.error(`Completed checks: ${checks.length}`)
  for (const item of checks) console.error(`  ✓ ${item}`)
  if (errors.length) console.error(`Browser errors:\n${errors.join('\n')}`)
  process.exitCode = 1
} finally {
  await browser.close()
}
