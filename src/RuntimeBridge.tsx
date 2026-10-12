import { useEffect } from 'react'
import { defaultProducts, type Product } from './data'
import { readSiteConfig } from './siteConfig'

type CartItem = { product: Product; size: string; qty: number }

type DemoOrder = {
  id: string
  createdAt: string
  status: string
  payment: string
  customer: {
    mobile: string
    email: string
    name: string
    address: string
    city: string
    pincode: string
    state: string
    landmark: string
  }
  items: CartItem[]
  total: number
}

const readJSON = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const text = (selector: string, value: string) => {
  const el = document.querySelector<HTMLElement>(selector)
  if (el && el.textContent !== value) el.textContent = value
}

const attr = (selector: string, name: string, value: string) => {
  const el = document.querySelector<HTMLElement>(selector)
  if (el && el.getAttribute(name) !== value) el.setAttribute(name, value)
}

export default function RuntimeBridge() {
  useEffect(() => {
    let queued = false
    const apply = () => {
      queued = false
      const config = readSiteConfig()
      const announcements = document.querySelectorAll<HTMLElement>('.announcement span')
      ;[config.announcement1, config.announcement2, config.announcement3].forEach((value, index) => {
        const el = announcements[index]
        if (el && el.textContent !== value) el.textContent = value
      })

      text('.brand strong', config.storeName)
      text('.brand small', config.tagline)
      text('.footer-logo', config.storeName)
      text('.hero-copy .eyebrow', config.heroEyebrow)
      text('.hero-copy p', config.heroBody)
      text('.editorial-copy .eyebrow', config.editorialEyebrow)
      text('.editorial-copy h2', config.editorialTitle)
      text('.editorial-copy p', config.editorialBody)
      text('.footer-main > div:first-child p', config.footerText)

      const heroTitle = document.querySelector<HTMLElement>('.hero-copy h1')
      const expectedHero = `${config.heroTitleLine1}<br><i>${config.heroTitleAccent}</i> ${config.heroTitleLine2}`
      if (heroTitle && heroTitle.innerHTML !== expectedHero) heroTitle.innerHTML = expectedHero

      attr('.hero-photo img', 'src', config.heroImage)
      attr('.editorial-banner > img', 'src', config.editorialImage)

      const mark = document.querySelector<HTMLElement>('.brand-mark')
      if (mark) {
        if (config.logoData) {
          mark.textContent = ''
          mark.style.backgroundImage = `url(${config.logoData})`
          mark.style.backgroundSize = 'cover'
          mark.style.backgroundPosition = 'center'
          mark.style.backgroundColor = '#fff'
        } else {
          mark.style.backgroundImage = ''
          mark.style.backgroundColor = ''
          const initial = config.storeName.trim().charAt(0).toUpperCase() || 'V'
          if (mark.textContent !== initial) mark.textContent = initial
        }
      }

      const instagram = config.instagram.replace(/^@/, '').trim()
      document.querySelectorAll<HTMLAnchorElement>('a[href*="instagram.com"]').forEach(link => {
        link.href = `https://instagram.com/${instagram}`
        if (link.classList.contains('social')) link.lastChild && (link.lastChild.textContent = ` @${instagram}`)
      })
      const instaLabel = document.querySelector<HTMLElement>('.instagram-section .eyebrow')
      if (instaLabel) instaLabel.textContent = `@${instagram.toUpperCase()}`

      const whatsapp = config.whatsapp.replace(/\D/g, '')
      document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]').forEach(link => {
        const current = link.href
        const query = current.includes('?') ? current.slice(current.indexOf('?')) : ''
        link.href = `https://wa.me/${whatsapp}${query}`
      })

      const storeColumn = document.querySelector<HTMLElement>('.footer-main > div:nth-child(4)')
      if (storeColumn) {
        const lines = storeColumn.querySelectorAll<HTMLParagraphElement>('p')
        if (lines[0]) lines[0].textContent = config.address
        if (lines[1]) lines[1].textContent = config.hours
      }

      const copyright = document.querySelector<HTMLElement>('.footer-bottom span:first-child')
      if (copyright) copyright.textContent = `© 2026 ${config.storeName}. All rights reserved.`
    }

    const scheduleApply = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(apply)
    }

    scheduleApply()
    const observer = new MutationObserver(scheduleApply)
    observer.observe(document.body, { childList: true, subtree: true })

    const captureOrder = (event: Event) => {
      const form = event.target as HTMLFormElement | null
      if (!form?.classList.contains('checkout-layout')) return
      const cart = readJSON<CartItem[]>('vandana-cart', [])
      if (!cart.length) return

      const inputs = Array.from(form.querySelectorAll<HTMLInputElement>('input'))
      const payment = form.querySelector<HTMLButtonElement>('.payment-options button.active')?.textContent?.trim() || 'UPI'
      const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)
      const order: DemoOrder = {
        id: `VDN-${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
        status: 'New',
        payment,
        customer: {
          mobile: inputs[0]?.value || '',
          email: inputs[1]?.value || '',
          name: `${inputs[2]?.value || ''} ${inputs[3]?.value || ''}`.trim(),
          address: inputs[4]?.value || '',
          city: inputs[5]?.value || '',
          pincode: inputs[6]?.value || '',
          state: inputs[7]?.value || '',
          landmark: inputs[8]?.value || '',
        },
        items: cart,
        total,
      }

      const orders = readJSON<DemoOrder[]>('vandana-orders', [])
      localStorage.setItem('vandana-orders', JSON.stringify([order, ...orders].slice(0, 100)))

      const savedProducts = readJSON<Product[]>('vandana-products', defaultProducts)
      const nextProducts = savedProducts.map(product => {
        const orderedQty = cart.filter(item => item.product.id === product.id).reduce((sum, item) => sum + item.qty, 0)
        return orderedQty ? { ...product, stock: Math.max(0, (product.stock ?? 0) - orderedQty) } : product
      })
      localStorage.setItem('vandana-products', JSON.stringify(nextProducts))
    }

    document.addEventListener('submit', captureOrder, true)
    window.addEventListener('popstate', scheduleApply)
    return () => {
      observer.disconnect()
      document.removeEventListener('submit', captureOrder, true)
      window.removeEventListener('popstate', scheduleApply)
    }
  }, [])

  return null
}
