# Aspire UI - Banking Dashboard

## Tech Stack
- **React 18 + TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **React Router** (routing)
- **ESLint + Prettier** (code quality)

## Libraries & Dependencies
```
npm install react react-dom react-router-dom @types/react @types/react-dom tailwindcss postcss autoprefixer
npm install -D vite @vitejs/plugin-react typescript @types/node eslint prettier
```

## Quick Start
```bash
cd Aspire-ui
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build
npm run lint     # Lint code
```

## Features & Functionality
### Dashboard with:
- **Cards Page** (`/cards`): Debit cards carousel, actions (freeze/unfreeze, cancel), recent transactions
- **Sidebar Navigation**: Home, Cards, Payments, Credit, Settings
- **Mobile Responsive**: Fixed nav, card carousel, bottom mobile nav
- **Real-time Balance**: Formatted currency display
- **Card Management**: Add, freeze, cancel modals (demo)

### Data Flow
```
Mock API → Hooks (useCards, useBalance, useTransactions) → Context Store → Components
```

**Services (src/services/api/):**
- `cardService.ts`: Card CRUD, freeze toggle
- `transactionService.ts`: Recent transactions
- `userService.ts`: Balance data
- `mockData.ts`: Demo data (real API ready)

**Local Storage (storageService.ts):**
- **Keys:**
  - `aspire_cards`: Array of cards (id, number, holder, expiry, cvv, frozen, color)
  - `aspire_balance`: { currencySymbol: 'S$', amount: number }
  - `aspire_transactions`: Transaction array (merchant, amount, category, type)

**Hooks:**
- `useCards`: Manage cards state/localStorage
- `useBalance`: Balance from localStorage
- `useTransactions`: Filter by card ID

### Pages Structure
```
CardsPage
├── Navbar/Tabs (Debit/Company cards)
├── Cards Carousel (DebitCard components)
├── CardActions (Freeze, Cancel buttons)
├── CardDetails (expandable)
└── RecentTransactions (load more)
```

### Component Tree
```
App
├── MainLayout
│   ├── Sidebar
│   └── Outlet (pages)
└── MobileNav
Pages: CardsPage, PaymentsPage, CreditPage, SettingsPage
```

## Production Deploy
- **Vercel/Netlify**: Push to GitHub → auto-deploy
- **Images**: SVG imports auto-optimized by Vite
- **Tailwind**: Purged CSS in build

## Local Storage Schema
```json
{
  "aspire_cards": [
    {
      "id": "card1",
      "cardNumber": "1234 5678 9012 3456",
      "cardHolderName": "John Doe",
      "expiryDate": "12/27",
      "cvv": "123",
      "isFrozen": false,
      "color": "#01D167"
    }
  ],
  "aspire_balance": {
    "currencySymbol": "S$",
    "amount": 12543.50
  },
  "aspire_transactions": [...]
}
```

## Development Scripts
```
npm run dev     # Dev server w/ HMR
npm run build   # Production build to dist/
npm run preview # Preview production build
npm run lint    # ESLint
```

**Clear localStorage:** DevTools → Application → Storage → Clear site data
