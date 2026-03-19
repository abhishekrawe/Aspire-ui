// Card Types
export interface Card {
  id: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  cardType: 'visa' | 'mastercard';
  cardCategory: 'debit' | 'credit';
  isFrozen: boolean;
  spendLimit?: number;
  currentSpend?: number;
  color?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  cardId: string;
  merchantName: string;
  merchantIcon?: string;
  amount: number;
  currency: string;
  date: string;
  type: 'credit' | 'debit';
  category: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Balance Types
export interface Balance {
  available: number;
  currency: string;
  currencySymbol: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Card Action Types
export type CardAction = 
  | 'freeze'
  | 'set-spend-limit'
  | 'add-to-gpay'
  | 'replace-card'
  | 'cancel-card';

export interface CardActionItem {
  id: CardAction;
  label: string;
  icon: string;
  description?: string;
}

// App State Types
export interface AppState {
  user: User | null;
  cards: Card[];
  transactions: Transaction[];
  balance: Balance;
  selectedCardId: string | null;
  isLoading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_CARDS'; payload: Card[] }
  | { type: 'ADD_CARD'; payload: Card }
  | { type: 'UPDATE_CARD'; payload: Card }
  | { type: 'DELETE_CARD'; payload: string }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_BALANCE'; payload: Balance }
  | { type: 'SELECT_CARD'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_CARD_FREEZE'; payload: string }
  | { type: 'SET_SPEND_LIMIT'; payload: { cardId: string; limit: number } };

