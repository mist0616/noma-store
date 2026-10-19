# NOMA Store

A responsive React storefront prototype built for a time-boxed product-shopping exercise. It prioritizes a complete, demonstrable shopping path over feature count.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite.

## Production build

```bash
pnpm build
pnpm preview
```

## Implemented scope

- Responsive home and product discovery experience
- Category filters and sorting
- Search overlay with live product matches
- Product detail modal with color, size, and quantity selection
- Quick add and full cart drawer flow
- Quantity changes, removal, subtotal, and free-shipping progress
- Favorites and cart persistence through `localStorage`
- Desktop and mobile navigation patterns
- Empty and no-result states
- Keyboard-accessible controls and reduced-motion support

## Product decisions

- No login, backend, or real payment: excluded by the brief and not required to prove the shopping loop.
- Local mock data: keeps the demo deterministic and easy to review.
- Minimal dependencies: React, Vite, and Lucide icons only.
- Remote editorial images: replaceable with owned/CDN assets for production.

## Verified scenarios

1. Browse and filter products.
2. Search and open a result.
3. Choose a variant and quantity, then add it to the bag.
4. Quick-add a product from the grid.
5. Increase/decrease quantity and remove items from the bag.
6. Refresh and confirm cart/favorites persist.
7. Use the layout at desktop and mobile breakpoints.

## Known limitations

- Checkout is intentionally a demo endpoint.
- Product data and availability are mocked.
- Product imagery is loaded from external sources and requires a network connection.
