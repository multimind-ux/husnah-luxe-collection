import { chromium } from 'playwright-core'

const executablePath =
  process.env.CHROME_PATH ||
  '/home/abdulbasit/.cache/ms-playwright/chromium-1254/chrome-linux64/chrome'
const url = process.env.URL || 'http://127.0.0.1:4173/'
const out = process.env.OUT || '/tmp/opencode/noir-desktop.png'
const width = Number(process.env.WIDTH || 1440)
const height = Number(process.env.HEIGHT || 1200)
const fullPage = process.env.FULL === '1'
const mobile = process.env.MOBILE === '1'

const browser = await chromium.launch({
  executablePath,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
  isMobile: mobile,
  hasTouch: mobile,
})
const page = await context.newPage()
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`)
})
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
await page.addInitScript(() => {
  try {
    window.sessionStorage.setItem('noir-intro-seen', '1')
  } catch (error) {
    /* ignore */
  }
})
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await page.screenshot({ path: out, fullPage })
console.log(`saved ${out} (${width}x${height}, fullPage=${fullPage})`)
if (errors.length) console.log(errors.join('\n'))
else console.log('no browser errors')
await browser.close()
