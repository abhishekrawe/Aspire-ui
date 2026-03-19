import { NavItem, CardActionItem } from '@/types';

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', icon: 'home' },
  { id: 'cards', label: 'Cards', path: '/cards', icon: 'cards' },
  { id: 'payments', label: 'Payments', path: '/payments', icon: 'payments' },
  { id: 'credit', label: 'Credit', path: '/credit', icon: 'credit' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: 'settings' },
];

export const CARD_ACTIONS: CardActionItem[] = [
  { id: 'freeze', label: 'Freeze card', icon: 'freeze', description: 'Temporarily freeze your card' },
  { id: 'set-spend-limit', label: 'Set spend limit', icon: 'spend-limit', description: 'Set a spending limit' },
  { id: 'add-to-gpay', label: 'Add to GPay', icon: 'gpay', description: 'Add card to Google Pay' },
  { id: 'replace-card', label: 'Replace card', icon: 'replace', description: 'Replace damaged card' },
  { id: 'cancel-card', label: 'Cancel card', icon: 'cancel', description: 'Cancel your card' },
];

export const STORAGE_KEYS = {
  USER: 'aspire_user',
  CARDS: 'aspire_cards',
  TRANSACTIONS: 'aspire_transactions',
  BALANCE: 'aspire_balance',
} as const;

export const API_DELAY_MS = 500;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

