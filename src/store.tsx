import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import type { Product } from './data'

type CartItem = { product: Product; size: string; qty: number }
type Store = {
  cart: CartItem[]
  wishlist: Product[]
  addToCart: (product: Product, size?: string) => void
  removeFromCart: (id: number, size: string) => void
  updateQty: (id: number, size: string, qty: number) => void
  toggleWishlist: (product: Product) => void
  isWishlisted: (id: number) => boolean
  cartCount: number
  subtotal: number
  clearCart: () => void
}

const StoreContext = createContext<Store | null>(null)

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => read('vandana-cart', []))
  const [wishlist, setWishlist] = useState<Product[]>(() => read('vandana-wishlist', []))

  useEffect(() => localStorage.setItem('vandana-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('vandana-wishlist', JSON.stringify(wishlist)), [wishlist])

  const addToCart = (product: Product, size = product.sizes[0]) => {
    setCart(current => {
      const found = current.find(i => i.product.id === product.id && i.size === size)
      if (found) return current.map(i => i === found ? { ...i, qty: i.qty + 1 } : i)
      return [...current, { product, size, qty: 1 }]
    })
  }

  const removeFromCart = (id: number, size: string) => setCart(c => c.filter(i => !(i.product.id === id && i.size === size)))
  const updateQty = (id: number, size: string, qty: number) => setCart(c => c.map(i => i.product.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i))
  const toggleWishlist = (product: Product) => setWishlist(c => c.some(p => p.id === product.id) ? c.filter(p => p.id !== product.id) : [...c, product])
  const isWishlisted = (id: number) => wishlist.some(p => p.id === id)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)
  const clearCart = () => setCart([])

  const value = useMemo(() => ({ cart, wishlist, addToCart, removeFromCart, updateQty, toggleWishlist, isWishlisted, cartCount, subtotal, clearCart }), [cart, wishlist, cartCount, subtotal])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useStore must be used inside StoreProvider')
  return value
}
