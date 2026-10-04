# VELORA — Luxury Home & Lifestyle E-Commerce Storefront

VELORA is a clean, modern, dark-themed e-commerce storefront built as a **React frontend practice project**. The main goal of this application is to demonstrate clean UI component engineering, client-side dynamic routing, and temporary state management without a heavy database backend.

## 🔗 Project Links
* **Live Production Deployment:** [Live Link](https://velora-luxury-shop.netlify.app/) *(Replace with your exact Netlify URL)*
* **Source Code Repository:** [GitHub Repository](https://github.com/JavariaKhalid425/e-commerce) *(Replace with your exact GitHub URL)*

---

## 📸 Visual Showcase & Interface Preview

Recruiters and developers can review the structural layouts of all application interfaces below. 

### 1. Storefront Home Page
Features an editorial-grade luxury hero grid, category routing cards, and the main product collection grid.
<img width="1366" height="3611" alt="fullpage_snapshot_velora-luxury-shop_netlify_app_2026-10-04-07-01-39" src="https://github.com/user-attachments/assets/d098e807-1b9f-4184-8352-678504a75c80" />


### 2. Shop Page (Full Inventory View)
Displays the complete dynamic catalog grid equipped with global filter layers and functional search logic.
<img width="1366" height="5966" alt="fullpage_snapshot_velora-luxury-shop_netlify_app_2026-10-04-07-04-30" src="https://github.com/user-attachments/assets/7f56c2a0-87ba-45fc-8d4d-ec0791339ac9" />


### 3. Categories Index Layout
Organizes distinct inventory sets (Furniture, Lighting, Home Decor) with optimized quick-access routes.
<img width="1366" height="1240" alt="fullpage_snapshot_velora-luxury-shop_netlify_app_2026-10-04-07-04-46" src="https://github.com/user-attachments/assets/b576de88-a901-4e82-9437-9bcf57f38664" />


### 4. New Arrivals Collection
Showcases query-filtered layouts targeting timestamped, newly released catalog assets.
<img width="1366" height="2470" alt="fullpage_snapshot_velora-luxury-shop_netlify_app_2026-10-04-07-05-01" src="https://github.com/user-attachments/assets/9e6e7e42-62cb-4e71-a225-288743560ebb" />


### 5. Branded About Page
Implements full editorial typography stylesheets rendering the company profile and operational values.
<img width="1366" height="1280" alt="fullpage_snapshot_velora-luxury-shop_netlify_app_2026-10-04-07-05-13" src="https://github.com/user-attachments/assets/974ff4e3-c676-4af3-8412-af35e13d118d" />


### 6. Dynamic Product Details View
Pulls dynamic URL route data asynchronously to display custom galleries, metrics, descriptions, and stock counts.
<img width="1366" height="2037" alt="fullpage_snapshot_velora-luxury-shop_netlify_app_2026-10-04-07-10-05" src="https://github.com/user-attachments/assets/890a26af-c999-4e11-aa93-14945e312831" />


### 7. Persistent Wishlist (Favorites)
Maintains client-selected target items dynamically marked as favorites across system refreshes.
<img width="1366" height="1281" alt="fullpage_snapshot_velora-luxury-shop_netlify_app_2026-10-04-07-05-26" src="https://github.com/user-attachments/assets/e9e3b923-dc0e-4d27-9e9c-8d98c1368f70" />

### 8. Transactional Shopping Cart View
Processes runtime quantity updates, individual object removal, subtotal arithmetic, and data caching.
<img width="1366" height="1133" alt="fullpage_snapshot_velora-luxury-shop_netlify_app_2026-10-04-07-05-37" src="https://github.com/user-attachments/assets/2e67fcc9-6584-413c-862f-b11220821b18" />


---

## 🛠️ Main Features & Frontend Functionality

### 1. Component-Driven UI & Design System
* **Premium Editorial Layout:** Built with dynamic Tailwind CSS configurations to create a luxury aesthetic using a charcoal base background, white typography, and gold/tan active accents.
* **Responsive Framework:** Fully optimized layout structures that scale smoothly from large desktop views down to mobile smartphone screens, featuring a custom sticky navigation header.

### 2. Live API Integration & Dynamic Routing
* **Asynchronous Catalog Handling:** Uses standard JavaScript Fetch APIs to fetch, display, and filter products in real-time from a public external REST API (`DummyJSON`).
* **Dynamic Details Loader:** Implements **React Router (`/product/:id`)** to grab dynamic product IDs directly from the URL params and dynamically load specific catalog item grids (`ProductDetails.jsx`).

### 3. Local State & Client-Side Storage Persistence
* **Cart & Wishlist Logic:** Integrated custom Context API hooks (`useCart.js`, `useFavorites.js`) to process application state modifications on the client side.
* **Session Persistence:** Saves active product lists and subtotal calculations directly into the browser's **localStorage**, ensuring your shopping bag items remain saved even after a full page refresh.

### 4. Custom Error Routing
* Built a custom, branded `NotFound.jsx` (404) fallback view to gracefully manage broken client-side paths.

## 💻 Tech Stack
* **Core Framework:** React.js (Vite Ecosystem)
* **Styling Engine:** Tailwind CSS
* **Routing Engine:** React Router (v6)
* **Data Sourcing:** Fetch API Integration (DummyJSON)
* **Client Storage:** Web Storage API (localStorage)
* **Hosting Platform:** Netlify

## 📁 System Architecture Overview
```text
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx          # Sticky global navigation & search wrapper
│   │   └── Footer.jsx          # Brand links, newsletter & social structure
│   └── products/
│       ├── CatalogPage.jsx     # Main grid catalog browser
│       └── ProductCard.jsx     # Reusable viewport-adaptive product layout
├── context/
│   ├── CartContext.jsx         # Context API wrapper for shopping cart state
│   ├── cartStore.js            # State handlers and data processing logic
│   ├── FavoritesContext.jsx    # Context API wrapper for wishlist state
│   ├── favoritesStore.js       # State handlers for customer favorites
│   ├── useCart.js              # Custom hook abstraction for cart operations
│   └── useFavorites.js         # Custom hook abstraction for wishlist interactions
├── pages/
│   ├── about.jsx               # Editorial brand story and profile overview
│   ├── Cart.jsx                # Transactional cart layer with localStorage binding
│   ├── categories.jsx          # Organized catalog collection filter indices
│   ├── Home.jsx                # Primary dynamic storefront entry point
│   ├── new arrivals.jsx        # Timestamped newly added merchandise collection
│   ├── NotFound.jsx            # Custom 404 client-side route fallback wrapper
│   ├── ProductDetails.jsx      # Asynchronous deep item detail resolver
│   ├── shop.jsx                # Global items filter, display, and search component
│   └── Wishlist.jsx            # Persistent favorite metrics tracker
├── App.css                     # Global design application layouts
├── App.jsx                     # Centralized declarative routing configuration
├── index.css                   # Global Tailwind CSS directive layers
└── main.jsx                    # Application root entry point
```

## ⚙️ Scope & Current Limitations
This system operates strictly as a **frontend UI/UX demonstration storefront**. Because there is no persistent backend server or database connected to this project:
* Real financial transactions or payments are completely simulated.
* User authentication and persistent order profiles are managed locally.
* Data is stored temporarily in the user's browser storage lifecycle.

---
*Developed as a frontend practice project exploring React hooks, custom contexts, and component modularity.*
