export type SiteConfig = {
  storeName: string
  tagline: string
  logoData: string
  announcement1: string
  announcement2: string
  announcement3: string
  whatsapp: string
  instagram: string
  address: string
  hours: string
  footerText: string
  heroEyebrow: string
  heroTitleLine1: string
  heroTitleAccent: string
  heroTitleLine2: string
  heroBody: string
  heroImage: string
  editorialEyebrow: string
  editorialTitle: string
  editorialBody: string
  editorialImage: string
}

export const defaultSiteConfig: SiteConfig = {
  storeName: 'VANDANA',
  tagline: 'FASHION FOR EVERYONE',
  logoData: '',
  announcement1: 'NEW DROPS EVERY DAY',
  announcement2: 'FASHION FOR EVERYONE',
  announcement3: 'STORE PICKUP IN PUSAD',
  whatsapp: '917083242223',
  instagram: 'vandanapusad',
  address: 'Pusad, Maharashtra 445204',
  hours: 'Open daily • Visit store & DM',
  footerText: 'Everyday fashion, festive favourites and fresh arrivals — curated for everyone.',
  heroEyebrow: "PUSAD'S FASHION DESTINATION",
  heroTitleLine1: 'STYLE',
  heroTitleAccent: 'moves',
  heroTitleLine2: 'WITH YOU.',
  heroBody: 'Fresh silhouettes. New drops every day. A fashion experience built for women, men and little trendsetters.',
  heroImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=88',
  editorialEyebrow: 'THE OCCASION EDIT',
  editorialTitle: 'Make an entrance.',
  editorialBody: 'Celebration-ready silhouettes for every plan on your calendar.',
  editorialImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=88',
}

export const readSiteConfig = (): SiteConfig => {
  if (typeof window === 'undefined') return defaultSiteConfig
  try {
    const raw = window.localStorage.getItem('vandana-site-config')
    return raw ? { ...defaultSiteConfig, ...JSON.parse(raw) } : defaultSiteConfig
  } catch {
    return defaultSiteConfig
  }
}

export const saveSiteConfig = (config: SiteConfig) => {
  window.localStorage.setItem('vandana-site-config', JSON.stringify(config))
}
