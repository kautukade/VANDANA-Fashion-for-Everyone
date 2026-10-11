export type Product = {
  id: number
  slug: string
  name: string
  category: 'Women' | 'Men' | 'Kids'
  subcategory: string
  price: number
  mrp: number
  image: string
  image2: string
  badge?: string
  sizes: string[]
  colors: string[]
  rating: number
  description: string
}

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=86`

export const products: Product[] = [
  {
    id: 1,
    slug: 'midnight-bloom-kurta-set',
    name: 'Midnight Bloom Kurta Set',
    category: 'Women',
    subcategory: 'Ethnic Wear',
    price: 1899,
    mrp: 2599,
    image: img('photo-1583391733956-6c78276477e2'),
    image2: img('photo-1610030469983-98e550d6193c'),
    badge: 'NEW',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Midnight Blue', 'Wine'],
    rating: 4.8,
    description: 'A polished festive kurta set with a comfortable silhouette, refined detailing and an easy all-day drape.'
  },
  {
    id: 2,
    slug: 'wide-leg-butterfly-denim',
    name: 'Wide-Leg Butterfly Denim',
    category: 'Women',
    subcategory: 'Jeans',
    price: 1299,
    mrp: 1899,
    image: img('photo-1542272604-787c3835535d'),
    image2: img('photo-1541099649105-f69ad21f3246'),
    badge: 'TRENDING',
    sizes: ['26', '28', '30', '32', '34'],
    colors: ['Vintage Blue'],
    rating: 4.7,
    description: 'Statement wide-leg denim with playful embroidered accents, a high-rise waist and a relaxed street-style fit.'
  },
  {
    id: 3,
    slug: 'scarlet-evening-dress',
    name: 'Scarlet Evening Dress',
    category: 'Women',
    subcategory: 'Dresses',
    price: 1599,
    mrp: 2299,
    image: img('photo-1566174053879-31528523f8ae'),
    image2: img('photo-1496747611176-843222e1e57c'),
    badge: 'BESTSELLER',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Scarlet', 'Black'],
    rating: 4.9,
    description: 'A confident occasion dress designed with clean lines, flattering structure and a modern feminine finish.'
  },
  {
    id: 4,
    slug: 'heritage-check-shirt',
    name: 'Heritage Check Shirt',
    category: 'Men',
    subcategory: 'Shirts',
    price: 899,
    mrp: 1299,
    image: img('photo-1603252109303-2751441dd157'),
    image2: img('photo-1598033129183-c4f50c736f10'),
    badge: 'NEW',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Brown Check', 'Blue Check'],
    rating: 4.6,
    description: 'An everyday checked shirt in a soft breathable weave, cut for a smart casual look that works from day to night.'
  },
  {
    id: 5,
    slug: 'urban-black-overshirt',
    name: 'Urban Black Overshirt',
    category: 'Men',
    subcategory: 'Shirts',
    price: 1199,
    mrp: 1699,
    image: img('photo-1617137968427-85924c800a22'),
    image2: img('photo-1618886614638-80e3c103d31a'),
    badge: 'LIMITED',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Stone'],
    rating: 4.8,
    description: 'A structured overshirt with a premium hand feel, minimal detailing and an easy layer-friendly silhouette.'
  },
  {
    id: 6,
    slug: 'classic-straight-denim',
    name: 'Classic Straight Denim',
    category: 'Men',
    subcategory: 'Jeans',
    price: 1399,
    mrp: 1999,
    image: img('photo-1542272604-787c3835535d'),
    image2: img('photo-1473966968600-fa801b869a1a'),
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Indigo', 'Washed Black'],
    rating: 4.5,
    description: 'Clean straight-fit denim built for daily wear with a versatile wash and dependable comfort.'
  },
  {
    id: 7,
    slug: 'little-star-party-dress',
    name: 'Little Star Party Dress',
    category: 'Kids',
    subcategory: 'Girls',
    price: 999,
    mrp: 1499,
    image: img('photo-1519238263530-99bdd11df2ea'),
    image2: img('photo-1622290291468-a28f7a7dc6a8'),
    badge: 'CUTE PICK',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Rose', 'Sky'],
    rating: 4.9,
    description: 'A cheerful occasion dress with soft lining and playful volume, made for celebrations and picture-perfect moments.'
  },
  {
    id: 8,
    slug: 'junior-weekend-coord',
    name: 'Junior Weekend Co-ord',
    category: 'Kids',
    subcategory: 'Boys',
    price: 849,
    mrp: 1199,
    image: img('photo-1503919545889-aef636e10ad4'),
    image2: img('photo-1607453998774-d533f65dac99'),
    badge: 'NEW',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: ['Olive', 'Sand'],
    rating: 4.7,
    description: 'An easy two-piece co-ord designed for active days, with a clean modern look and breathable comfort.'
  },
  {
    id: 9,
    slug: 'ivory-textured-shirt',
    name: 'Ivory Textured Shirt',
    category: 'Men',
    subcategory: 'Shirts',
    price: 949,
    mrp: 1399,
    image: img('photo-1596755094514-f87e34085b2c'),
    image2: img('photo-1602810318383-e386cc2a3ccf'),
    sizes: ['M', 'L', 'XL'],
    colors: ['Ivory', 'Sage'],
    rating: 4.6,
    description: 'A refined textured shirt with an elevated minimal finish for dinners, events and polished casual dressing.'
  },
  {
    id: 10,
    slug: 'emerald-festive-kurta',
    name: 'Emerald Festive Kurta',
    category: 'Women',
    subcategory: 'Ethnic Wear',
    price: 1499,
    mrp: 2099,
    image: img('photo-1597983073514-4ae7c6c2f15d'),
    image2: img('photo-1583391733975-47e3c9f91e10'),
    badge: 'FESTIVE',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Emerald', 'Maroon'],
    rating: 4.8,
    description: 'Festive color, graceful fall and wearable comfort come together in this elegant day-to-evening kurta.'
  },
  {
    id: 11,
    slug: 'minimal-ribbed-top',
    name: 'Minimal Ribbed Top',
    category: 'Women',
    subcategory: 'Tops',
    price: 699,
    mrp: 999,
    image: img('photo-1525507119028-ed4c629a60a3'),
    image2: img('photo-1483985988355-763728e1935b'),
    badge: 'EVERYDAY',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Black', 'Blue'],
    rating: 4.5,
    description: 'A soft ribbed wardrobe essential with a clean neckline and close, comfortable fit for effortless layering.'
  },
  {
    id: 12,
    slug: 'premium-cargo-pants',
    name: 'Premium Cargo Pants',
    category: 'Men',
    subcategory: 'Bottomwear',
    price: 1299,
    mrp: 1799,
    image: img('photo-1506629082955-511b1aa562c8'),
    image2: img('photo-1515886657613-9f3515b0c78f'),
    badge: 'TRENDING',
    sizes: ['30', '32', '34', '36'],
    colors: ['Olive', 'Black', 'Beige'],
    rating: 4.7,
    description: 'Utility-inspired cargo pants with a modern tapered shape, roomy pockets and day-long comfort.'
  }
]

export const categories = [
  { name: 'Women', eyebrow: 'THE EDIT', image: img('photo-1490481651871-ab68de25d43d') },
  { name: 'Men', eyebrow: 'MODERN ESSENTIALS', image: img('photo-1488161628813-04466f872be2') },
  { name: 'Kids', eyebrow: 'LITTLE ICONS', image: img('photo-1503454537195-1dcabb73ffb9') }
]
