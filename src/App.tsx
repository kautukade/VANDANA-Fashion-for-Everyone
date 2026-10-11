import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Bag, Check, ChevronDown, Heart, Instagram, Menu, Minus, Plus, Search, ShieldCheck, ShoppingBag, Sparkles, Star, Truck, UserRound, X, Zap } from 'lucide-react'
import { categories, products, type Product } from './data'
import { useStore } from './store'
import HeroScene from './HeroScene'

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [pathname])
  return null
}

function Header() {
  const { cartCount, wishlist } = useStore()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/shop?q=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  return <>
    <div className="announcement"><span>NEW DROPS EVERY DAY</span><b>•</b><span>FASHION FOR EVERYONE</span><b>•</b><span>STORE PICKUP IN PUSAD</span></div>
    <header className="header">
      <Link to="/" className="brand" aria-label="Vandana home">
        <span className="brand-mark">V</span>
        <span><strong>VANDANA</strong><small>FASHION FOR EVERYONE</small></span>
      </Link>
      <nav className="desktop-nav">
        <NavLink to="/shop?sort=new">New In</NavLink>
        <NavLink to="/shop?cat=Women">Women</NavLink>
        <NavLink to="/shop?cat=Men">Men</NavLink>
        <NavLink to="/shop?cat=Kids">Kids</NavLink>
        <NavLink to="/shop?offer=1">Offers</NavLink>
      </nav>
      <div className="header-actions">
        <button className="icon-btn search-trigger" onClick={() => navigate('/shop')} aria-label="Search"><Search size={19} /></button>
        <Link className="icon-btn" to="/wishlist" aria-label="Wishlist"><Heart size={19}/>{wishlist.length > 0 && <em>{wishlist.length}</em>}</Link>
        <Link className="icon-btn" to="/cart" aria-label="Cart"><Bag size={20}/>{cartCount > 0 && <em>{cartCount}</em>}</Link>
        <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
      </div>
    </header>
    <AnimatePresence>
      {open && <motion.aside className="mobile-menu" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring', damping:28, stiffness:260}}>
        <div className="mobile-menu-top"><span className="brand-word">VANDANA</span><button onClick={() => setOpen(false)}><X/></button></div>
        <form className="mobile-search" onSubmit={submit}><Search size={18}/><input placeholder="Search styles" value={query} onChange={e=>setQuery(e.target.value)}/></form>
        {['New In','Women','Men','Kids','Offers'].map(label => <Link key={label} onClick={()=>setOpen(false)} to={label==='New In'?'/shop?sort=new':label==='Offers'?'/shop?offer=1':`/shop?cat=${label}`}>{label}<ArrowRight/></Link>)}
        <p>Visit our store in Pusad or shop the edit online.</p>
      </motion.aside>}
    </AnimatePresence>
  </>
}

function Footer() {
  return <footer className="footer">
    <div className="footer-main">
      <div><div className="footer-logo">VANDANA</div><p>Everyday fashion, festive favourites and fresh arrivals — curated for everyone.</p><a className="social" href="https://instagram.com/vandanapusad" target="_blank" rel="noreferrer"><Instagram size={18}/> @vandanapusad</a></div>
      <div><h4>SHOP</h4><Link to="/shop?cat=Women">Women</Link><Link to="/shop?cat=Men">Men</Link><Link to="/shop?cat=Kids">Kids</Link><Link to="/shop?sort=new">New Arrivals</Link></div>
      <div><h4>HELP</h4><a href="#shipping">Shipping</a><a href="#returns">Returns & Exchange</a><a href="#size">Size Guide</a><a href="#contact">Contact</a></div>
      <div><h4>STORE</h4><p>Pusad, Maharashtra 445204</p><p>Open daily • Visit store & DM</p><a href="https://wa.me/917083242223" target="_blank" rel="noreferrer">WhatsApp Us →</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 VANDANA. All rights reserved.</span><span>Designed for a premium fashion experience.</span></div>
  </footer>
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const wished = isWishlisted(product.id)
  return <motion.article className="product-card" whileHover={{ y: -5 }} transition={{duration:.25}}>
    <Link to={`/product/${product.slug}`} className="product-media">
      <img src={product.image} alt={product.name} loading="lazy"/>
      <img className="hover-image" src={product.image2} alt="" loading="lazy"/>
      {product.badge && <span className="badge">{product.badge}</span>}
    </Link>
    <button className={`heart ${wished?'active':''}`} onClick={()=>toggleWishlist(product)} aria-label="Wishlist"><Heart size={18} fill={wished?'currentColor':'none'}/></button>
    <div className="product-meta">
      <div><small>{product.category} · {product.subcategory}</small><Link to={`/product/${product.slug}`}>{product.name}</Link></div>
      <div className="price"><b>{money(product.price)}</b><s>{money(product.mrp)}</s></div>
    </div>
    <button className="quick-add" onClick={()=>addToCart(product)}><ShoppingBag size={17}/> Quick add</button>
  </motion.article>
}

function Home() {
  const navigate = useNavigate()
  return <main>
    <section className="hero">
      <div className="hero-copy">
        <motion.span className="eyebrow" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>PUSAD'S FASHION DESTINATION</motion.span>
        <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.08}}>STYLE<br/><i>moves</i> WITH YOU.</motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.22}}>Fresh silhouettes. New drops every day. A fashion experience built for women, men and little trendsetters.</motion.p>
        <motion.div className="hero-buttons" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.3}}><Link className="btn dark" to="/shop">SHOP NEW ARRIVALS <ArrowRight/></Link><Link className="text-link" to="/shop?cat=Women">Explore the edit</Link></motion.div>
        <div className="hero-proof"><span><b>10K+</b> Instagram family</span><span><b>Daily</b> new arrivals</span><span><b>Pusad</b> store pickup</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-scene"><HeroScene/></div>
        <motion.div className="hero-photo" initial={{clipPath:'inset(100% 0 0 0)'}} animate={{clipPath:'inset(0% 0 0 0)'}} transition={{duration:1.15,ease:[.77,0,.18,1]}}>
          <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=88" alt="Vandana fashion edit"/>
        </motion.div>
        <div className="floating-label"><Sparkles size={16}/><span>THE<br/><b>NEW EDIT</b></span></div>
      </div>
    </section>

    <section className="benefit-strip"><span><Truck/> Fast delivery</span><span><ShieldCheck/> Secure checkout</span><span><Zap/> Daily new styles</span><span><Star/> Curated fashion</span></section>

    <section className="section category-section">
      <div className="section-head"><div><span className="eyebrow">SHOP YOUR WORLD</span><h2>Fashion for <i>everyone.</i></h2></div><Link to="/shop">View all <ArrowRight/></Link></div>
      <div className="category-grid">
        {categories.map((cat, i)=><motion.button key={cat.name} className="category-card" onClick={()=>navigate(`/shop?cat=${cat.name}`)} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{delay:i*.08}}>
          <img src={cat.image} alt={cat.name}/><div className="shade"/><div className="category-copy"><small>{cat.eyebrow}</small><h3>{cat.name}</h3><span>Shop now <ArrowRight/></span></div>
        </motion.button>)}
      </div>
    </section>

    <section className="film-section">
      <div className="film-copy"><span className="eyebrow light">VANDANA MOTION EDIT 01</span><h2>TURN THE<br/>STREET INTO<br/><i>YOUR RUNWAY.</i></h2><p>Editorial energy meets everyday wear. Scroll, discover, wear it your way.</p><Link className="btn light" to="/shop?sort=new">EXPLORE THE DROP <ArrowRight/></Link></div>
      <div className="film-frames">
        <motion.div className="film-frame one" whileInView={{scale:[1.12,1]}} transition={{duration:1.8}}><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=88" alt="Fashion motion"/></motion.div>
        <motion.div className="film-frame two" whileInView={{y:[80,0]}} transition={{duration:1.2}}><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=88" alt="Street fashion"/></motion.div>
        <div className="film-counter">00:12<br/><span>FASHION FILM</span></div>
      </div>
      <div className="film-grain"/>
    </section>

    <section className="section">
      <div className="section-head"><div><span className="eyebrow">JUST LANDED</span><h2>Fresh from the <i>rack.</i></h2></div><Link to="/shop?sort=new">Shop new arrivals <ArrowRight/></Link></div>
      <div className="product-grid">{products.slice(0,8).map(p=><ProductCard key={p.id} product={p}/>)}</div>
    </section>

    <section className="editorial-banner">
      <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=88" alt="Vandana occasion edit"/>
      <div className="editorial-copy"><span className="eyebrow light">THE OCCASION EDIT</span><h2>Make an entrance.</h2><p>Celebration-ready silhouettes for every plan on your calendar.</p><Link to="/shop?cat=Women" className="btn light">DISCOVER WOMEN <ArrowRight/></Link></div>
    </section>

    <section className="section instagram-section"><div className="section-head"><div><span className="eyebrow">@VANDANAPUSAD</span><h2>Seen on <i>Instagram.</i></h2></div><a href="https://instagram.com/vandanapusad" target="_blank" rel="noreferrer">Follow us <Instagram/></a></div><div className="insta-grid">{products.slice(1,6).map(p=><Link to={`/product/${p.slug}`} key={p.id}><img src={p.image} alt={p.name}/><span><Instagram size={18}/> Shop the look</span></Link>)}</div></section>
  </main>
}

function Shop() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('q') || '')
  const cat = params.get('cat') || 'All'
  const sort = params.get('sort') || 'featured'
  const offer = params.get('offer') === '1'

  const filtered = useMemo(() => {
    let list = products.filter(p => cat==='All' || p.category===cat)
    if (search.trim()) list = list.filter(p => `${p.name} ${p.subcategory} ${p.category}`.toLowerCase().includes(search.toLowerCase()))
    if (offer) list = list.filter(p => p.mrp > p.price)
    if (sort==='low') list = [...list].sort((a,b)=>a.price-b.price)
    if (sort==='high') list = [...list].sort((a,b)=>b.price-a.price)
    if (sort==='new') list = [...list].sort((a,b)=>b.id-a.id)
    return list
  }, [cat, search, sort, offer])

  const set = (key:string,value:string) => { const next = new URLSearchParams(params); if(value==='All'||!value) next.delete(key); else next.set(key,value); setParams(next) }

  return <main className="shop-page">
    <section className="shop-hero"><span className="eyebrow">VANDANA COLLECTION</span><h1>{cat==='All'?'Shop the latest.':cat}</h1><p>Find your next favourite from our constantly refreshed collection.</p></section>
    <div className="shop-toolbar">
      <div className="category-pills">{['All','Women','Men','Kids'].map(c=><button className={cat===c?'active':''} onClick={()=>set('cat',c)} key={c}>{c}</button>)}</div>
      <div className="toolbar-right"><label className="shop-search"><Search size={16}/><input value={search} onChange={e=>{setSearch(e.target.value);set('q',e.target.value)}} placeholder="Search products"/></label><label className="sort"><select value={sort} onChange={e=>set('sort',e.target.value)}><option value="featured">Featured</option><option value="new">Newest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select><ChevronDown size={16}/></label></div>
    </div>
    <div className="results-line"><span>{filtered.length} styles</span>{offer&&<button onClick={()=>set('offer','')}>Offers only <X size={14}/></button>}</div>
    <section className="product-grid shop-grid">{filtered.map(p=><ProductCard product={p} key={p.id}/>)}</section>
    {filtered.length===0 && <div className="empty"><Search size={42}/><h2>No styles found</h2><p>Try another search or category.</p></div>}
  </main>
}

function ProductPage() {
  const { slug } = useParams()
  const product = products.find(p=>p.slug===slug)
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const [size, setSize] = useState(product?.sizes[0] || '')
  const [added, setAdded] = useState(false)
  if (!product) return <NotFound/>
  const discount = Math.round((1-product.price/product.mrp)*100)
  const add = () => { addToCart(product,size); setAdded(true); setTimeout(()=>setAdded(false),1600) }
  return <main className="product-page">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to={`/shop?cat=${product.category}`}>{product.category}</Link><span>/</span><span>{product.name}</span></div>
    <section className="product-layout">
      <div className="gallery"><div className="gallery-main"><img src={product.image} alt={product.name}/></div><div className="gallery-secondary"><img src={product.image2} alt={`${product.name} alternate`}/></div></div>
      <div className="product-info">
        {product.badge&&<span className="badge static">{product.badge}</span>}<small>{product.category} · {product.subcategory}</small><h1>{product.name}</h1><div className="rating"><Star size={16} fill="currentColor"/> {product.rating} <span>• Loved by shoppers</span></div>
        <div className="product-price"><b>{money(product.price)}</b><s>{money(product.mrp)}</s><em>{discount}% OFF</em></div><p className="tax">Inclusive of all taxes</p><p className="description">{product.description}</p>
        <div className="choice-head"><b>Select size</b><button>Size guide</button></div><div className="size-grid">{product.sizes.map(s=><button key={s} className={size===s?'active':''} onClick={()=>setSize(s)}>{s}</button>)}</div>
        <div className="colour"><b>Colour</b><span>{product.colors[0]}</span></div>
        <div className="product-actions"><button className="add-bag" onClick={add}>{added?<><Check/> ADDED TO BAG</>:<><ShoppingBag/> ADD TO BAG</>}</button><button className={`wish-large ${isWishlisted(product.id)?'active':''}`} onClick={()=>toggleWishlist(product)}><Heart fill={isWishlisted(product.id)?'currentColor':'none'}/></button></div>
        <a className="whatsapp" target="_blank" rel="noreferrer" href={`https://wa.me/917083242223?text=${encodeURIComponent(`Hi Vandana, I want to order ${product.name}, size ${size}.`)}`}>Order on WhatsApp <ArrowRight/></a>
        <div className="delivery-notes"><span><Truck/><b>Fast delivery</b><small>Shipping calculated at checkout</small></span><span><ShieldCheck/><b>Easy exchange</b><small>Subject to store policy</small></span></div>
      </div>
    </section>
    <section className="section related"><div className="section-head"><div><span className="eyebrow">YOU MAY ALSO LIKE</span><h2>Complete the <i>look.</i></h2></div></div><div className="product-grid">{products.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  </main>
}

function CartPage() {
  const { cart, subtotal, removeFromCart, updateQty } = useStore()
  if (!cart.length) return <main className="empty-page"><ShoppingBag size={48}/><h1>Your bag is waiting.</h1><p>Fresh styles are only a few clicks away.</p><Link className="btn dark" to="/shop">START SHOPPING <ArrowRight/></Link></main>
  return <main className="cart-page"><div className="page-title"><span className="eyebrow">YOUR SELECTION</span><h1>Shopping bag</h1></div><div className="cart-layout"><div className="cart-list">{cart.map(item=><article className="cart-item" key={`${item.product.id}-${item.size}`}><img src={item.product.image} alt={item.product.name}/><div className="cart-copy"><small>{item.product.category}</small><Link to={`/product/${item.product.slug}`}>{item.product.name}</Link><p>Size: {item.size}</p><div className="qty"><button onClick={()=>updateQty(item.product.id,item.size,item.qty-1)}><Minus/></button><span>{item.qty}</span><button onClick={()=>updateQty(item.product.id,item.size,item.qty+1)}><Plus/></button></div></div><div className="cart-price"><b>{money(item.product.price*item.qty)}</b><button onClick={()=>removeFromCart(item.product.id,item.size)}>Remove</button></div></article>)}</div><aside className="summary"><h3>Order summary</h3><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery</span><b>Calculated next</b></div><div className="summary-total"><span>Total</span><b>{money(subtotal)}</b></div><Link className="checkout-btn" to="/checkout">PROCEED TO CHECKOUT <ArrowRight/></Link><p><ShieldCheck size={16}/> Secure checkout experience</p></aside></div></main>
}

function CheckoutPage() {
  const { cart, subtotal, clearCart } = useStore()
  const [done,setDone] = useState(false)
  const [payment,setPayment] = useState('UPI')
  const place = (e:FormEvent) => { e.preventDefault(); if(cart.length){setDone(true); clearCart()} }
  if(done) return <main className="success-page"><div className="success-icon"><Check/></div><span className="eyebrow">ORDER RECEIVED</span><h1>Thank you for shopping Vandana.</h1><p>Your demo order has been recorded in this storefront preview. Connect a payment gateway and backend before accepting live orders.</p><Link className="btn dark" to="/shop">CONTINUE SHOPPING <ArrowRight/></Link></main>
  if(!cart.length) return <main className="empty-page"><ShoppingBag/><h1>Your bag is empty.</h1><Link className="btn dark" to="/shop">SHOP NOW</Link></main>
  return <main className="checkout-page"><div className="page-title"><span className="eyebrow">SECURE CHECKOUT</span><h1>Complete your order</h1></div><form className="checkout-layout" onSubmit={place}><div className="checkout-form"><h3>Contact</h3><div className="field-grid"><label className="full">Mobile number<input required type="tel" placeholder="+91 98765 43210"/></label><label className="full">Email<input required type="email" placeholder="you@example.com"/></label></div><h3>Delivery address</h3><div className="field-grid"><label>First name<input required/></label><label>Last name<input required/></label><label className="full">Address<input required placeholder="House no., street, area"/></label><label>City<input required/></label><label>Pincode<input required inputMode="numeric"/></label><label>State<input required defaultValue="Maharashtra"/></label><label>Landmark<input/></label></div><h3>Payment</h3><div className="payment-options">{['UPI','Cash on Delivery','Card'].map(p=><button type="button" key={p} className={payment===p?'active':''} onClick={()=>setPayment(p)}><span>{payment===p&&<Check/>}</span>{p}</button>)}</div><div className="demo-note">Live payment processing is intentionally disabled until Razorpay/Cashfree credentials and order APIs are connected.</div></div><aside className="summary checkout-summary"><h3>Your order</h3>{cart.map(i=><div className="mini-item" key={`${i.product.id}-${i.size}`}><img src={i.product.image}/><span><b>{i.product.name}</b><small>{i.size} × {i.qty}</small></span><strong>{money(i.product.price*i.qty)}</strong></div>)}<div className="summary-total"><span>Total</span><b>{money(subtotal)}</b></div><button className="checkout-btn" type="submit">PLACE DEMO ORDER <ArrowRight/></button></aside></form></main>
}

function WishlistPage() {
  const { wishlist } = useStore()
  return <main className="wishlist-page"><div className="page-title"><span className="eyebrow">SAVED FOR LATER</span><h1>Your wishlist</h1></div>{wishlist.length?<div className="product-grid">{wishlist.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty"><Heart size={46}/><h2>Nothing saved yet</h2><p>Tap the heart on styles you love.</p><Link to="/shop" className="btn dark">DISCOVER STYLES</Link></div>}</main>
}

function NotFound(){return <main className="empty-page"><h1>404</h1><p>This page stepped off the runway.</p><Link className="btn dark" to="/">BACK HOME</Link></main>}

export default function App(){return <><ScrollTop/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/product/:slug" element={<ProductPage/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/checkout" element={<CheckoutPage/>}/><Route path="/wishlist" element={<WishlistPage/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/></>}
