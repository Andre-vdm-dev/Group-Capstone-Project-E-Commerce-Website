# E‑Commerce Store — Group Capstone Project

A front‑end e‑commerce website built from the **"E‑Commerce Store — Melsoft Academy"** Figma design using **React, Tailwind CSS, React Router and Redux Toolkit**. All data lives on the client (no backend).

Users can browse products, search, view product details, add items to their bag, change quantities, and check out with validated shipping and payment forms.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| **React** (Vite) | UI with functional components and hooks |
| **Tailwind CSS v3** | Styling, with Figma design tokens in `tailwind.config.js` |
| **React Router** | Page routing |
| **Redux Toolkit** | Global cart state |
| **localStorage** | Keeps the cart (and checkout details) after a page refresh |
| **ESLint** | Code linting |

---

## Getting Started

**Requirements:** Node.js 18+ and npm.

```bash
# 1. Clone the repository
git clone <repo-url>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Other scripts

| Command | What it does |
|---|---|
| `npm run build` | Builds the production version into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Checks the code with ESLint |

---

## Features

- **Home page** — product grid from local data, live search by name/variant
- **Sidebar navigation** — expandable menu (toggle with `useState`), active page highlight
- **Bag panel** — quick cart overview with product thumbnails on Home, Product and Bag pages
- **Product page** — image gallery, rating, price, description and *Add to Bag*
- **Bag page** — change quantity (+ / −), remove items, bag total
- **Checkout**
  - Shipping address form with validation
  - Payment: select a saved card or add a new one (card number, expiry and CVC validation, auto‑formatting)
  - Order summary with items, shipping, GST (13%) and total
- **Order success** page
- **Persistence** — the cart is saved to `localStorage`, so it survives a refresh

---

## Routes

| Route | Page |
|---|---|
| `/` | Home — product grid, search, bag panel |
| `/product/:id` | Product details |
| `/cart` | Bag page |
| `/checkout` | Checkout (shipping, payment, summary) |
| `/order-success` | Order confirmation |

The product is passed to the Product page through **router `location.state`**. If the page is refreshed (no state), it falls back to finding the product by `id` in `src/data/products.js`.

---

## Folder Structure

```
public/
  assets/              product images
    icons/             SVG icons exported from Figma
src/
  components/          reusable UI (Navbar, BagPanel, ProductCard, ProductList,
                       SearchBar, BagItem, FormInput, CheckoutForms)
  pages/               Home, Product, Cart, Checkout, OrderSuccess
  store/
    cartSlice.js       cart reducer, actions and selectors
    store.js           configureStore + localStorage persistence
  data/
    products.js        local product catalogue
  App.jsx              layout + routes
  main.jsx             Redux Provider + BrowserRouter
  index.css            Tailwind + reusable @apply classes
tailwind.config.js     Figma design tokens (colours, fonts, sizes, radii)
```

---

## State Management

**Redux Toolkit** is used for global state that several pages share — the cart.

`cartSlice` actions:

| Action | What it does |
|---|---|
| `addItem(product)` | Adds a product, or increases its quantity if already in the bag |
| `removeItem(id)` | Removes a product from the bag |
| `increaseQty(id)` | Quantity + 1 |
| `decreaseQty(id)` | Quantity − 1 (removes the item at 0) |
| `clearCart()` | Empties the bag |

Selectors (derived values):

- `selectCartItems` — all items in the bag
- `selectCartTotalQty` — total number of items
- `selectCartTotalPrice` — total price

The store subscribes to changes and saves the cart to `localStorage`. Redux DevTools works automatically through `configureStore`.

**Local component state (`useState`)** is used for UI‑only things: the sidebar toggle, search input, selected product image, and the checkout form fields.

---

## Design

The UI follows the provided Figma file. Design tokens were taken directly from Figma and added to `tailwind.config.js`:

- **Font:** Cabin (Regular, Medium, Bold) via Google Fonts
- **Colours:** `primary`, `accent`, `success`, `light`, `tertiary`, `dark`, `placeholder`, `danger`, `warning`, `page`
- **Type scale:** `text-h0` – `text-h7` (61.04px → 12.8px)
- **Radii / shadows:** `rounded-card`, `rounded-input`, `rounded-btn`, `shadow-input`

Reusable component classes (`btn-primary`, `btn-outline`, `card`) are defined with `@apply` in `index.css`.

---

## Known Issues / Limitations

- **No backend** — products, saved cards and the gift card balance are demo data; no real payment is processed.
- **Product descriptions** use placeholder text from the Figma design.
- **Saved cards and address** are stored in `localStorage` only (per browser).
- **Responsive layout** is designed desktop‑first (like the Figma file); smaller screens are supported but less polished.
- Logout button is visual only (there are no user accounts).

---

## Team

- **Andre van der Merwe** — [@Andre-vdm-dev](https://github.com/Andre-vdm-dev)
- **Aaliyah Fransman**

