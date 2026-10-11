# VANDANA — Fashion for Everyone

A premium, mobile-first fashion ecommerce storefront for **Vandana, Pusad**. The visual direction blends editorial fashion, cinematic scroll moments and an interactive WebGL/3D hero while keeping shopping fast and familiar.

## Included

- Premium responsive home page
- Interactive 3D fashion object using React Three Fiber
- Video-like cinematic editorial animation section
- Women / Men / Kids collection browsing
- Product search, category filters, offer filter and sorting
- Product detail pages with size selection
- Wishlist persisted in local storage
- Functional cart with quantity controls and local persistence
- Checkout UI with address and payment method selection
- WhatsApp product-order shortcut
- Instagram-oriented merchandising section
- Mobile navigation and mobile-first layout
- Netlify SPA configuration

## Stack

- React 18 + TypeScript + Vite
- React Router
- Framer Motion
- Three.js + React Three Fiber + Drei
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Netlify

Build command: `npm run build`

Publish directory: `dist`

The included `netlify.toml` handles SPA redirects.

## Important production step

The current repository is a polished **storefront implementation** with client-side cart/wishlist and a demo checkout. Before taking live payments, connect:

1. Product/inventory database (Supabase is a good fit)
2. Admin dashboard + role-based access
3. Razorpay or Cashfree order/payment APIs
4. Server-side order creation and webhook verification
5. Shipping provider such as Shiprocket
6. Transactional WhatsApp/email notifications
7. Real store policies, verified address, tax/GST and legal pages

Do not treat the demo checkout as a payment-processing backend.
