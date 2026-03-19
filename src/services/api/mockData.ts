import { Card, Transaction, User, Balance } from '@/types';

export const mockUser: User = {
  id: 'user-001',
  name: 'Mark Henry',
  email: 'mark.henry@example.com',
};

export const mockBalance: Balance = {
  available: 3000,
  currency: 'SGD',
  currencySymbol: 'S$',
};

export const mockCards: Card[] = [
  {
    id: 'card-001',
    cardNumber: '4532 8912 3456 2020',
    cardHolderName: 'Mark Henry',
    expiryDate: '12/26',
    cvv: '123',
    cardType: 'visa',
    cardCategory: 'debit',
    isFrozen: false,
    spendLimit: 5000,
    currentSpend: 1500,
    color: '#01D167',
  },
  {
    id: 'card-002',
    cardNumber: '5412 7534 9821 1234',
    cardHolderName: 'Sarah Johnson',
    expiryDate: '06/27',
    cvv: '456',
    cardType: 'mastercard',
    cardCategory: 'debit',
    isFrozen: false,
    spendLimit: 3000,
    currentSpend: 800,
    color: '#536DFF',
  },
  {
    id: 'card-004',
    cardNumber: '4024 0071 5678 9012',
    cardHolderName: 'Emily Rodriguez',
    expiryDate: '03/29',
    cvv: '234',
    cardType: 'visa',
    cardCategory: 'debit',
    isFrozen: false,
    spendLimit: 7500,
    currentSpend: 3200,
    color: '#eb9be5',
  },
  {
    id: 'card-006',
    cardNumber: '4111 1111 1111 1111',
    cardHolderName: 'Jessica Williams',
    expiryDate: '05/28',
    cvv: '890',
    cardType: 'visa',
    cardCategory: 'debit',
    isFrozen: false,
    spendLimit: 8000,
    currentSpend: 4500,
    color: '#06B6D4',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    cardId: 'card-001',
    merchantName: 'Hamleys',
    amount: 150,
    currency: 'SGD',
    date: '2020-05-20',
    type: 'credit',
    category: 'Refund',
    description: 'Refund on debit card',
    status: 'completed',
  },
  {
    id: 'txn-002',
    cardId: 'card-001',
    merchantName: 'Naturals Ice Cream',
    amount: 150,
    currency: 'SGD',
    date: '2020-05-20',
    type: 'debit',
    category: 'Shopping',
    description: 'Charged to debit card',
    status: 'completed',
  },
  {
    id: 'txn-003',
    cardId: 'card-001',
    merchantName: 'Recharge',
    amount: 150,
    currency: 'SGD',
    date: '2020-05-20',
    type: 'debit',
    category: 'Shopping',
    description: 'Charged to debit card',
    status: 'completed',
  },
];

// Simulate API delay
export const simulateDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

