import { Transaction, ApiResponse, PaginatedResponse } from '@/types';
import { mockTransactions, simulateDelay } from './mockData';
import { storageService } from '@services/storage/storageService';

const TRANSACTIONS_STORAGE_KEY = 'aspire_transactions';

// Initialize transactions from localStorage or use mock data
const initializeTransactions = (): Transaction[] => {
  const storedTransactions = storageService.get<Transaction[]>(TRANSACTIONS_STORAGE_KEY);
  if (storedTransactions && storedTransactions.length > 0) {
    return storedTransactions;
  }
  storageService.set(TRANSACTIONS_STORAGE_KEY, mockTransactions);
  return mockTransactions;
};

export const transactionService = {
  // Get all transactions
  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    await simulateDelay();
    const transactions = initializeTransactions();
    return {
      data: transactions,
      success: true,
    };
  },

  // Get transactions by card ID
  async getTransactionsByCardId(cardId: string): Promise<ApiResponse<Transaction[]>> {
    await simulateDelay();
    const transactions = initializeTransactions();
    const cardTransactions = transactions.filter((t) => t.cardId === cardId);
    return {
      data: cardTransactions,
      success: true,
    };
  },

  // Get paginated transactions
  async getPaginatedTransactions(
    page: number = 1,
    pageSize: number = 10,
    cardId?: string
  ): Promise<PaginatedResponse<Transaction>> {
    await simulateDelay();
    let transactions = initializeTransactions();
    
    if (cardId) {
      transactions = transactions.filter((t) => t.cardId === cardId);
    }

    const total = transactions.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = transactions.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  // Get transaction by ID
  async getTransactionById(transactionId: string): Promise<ApiResponse<Transaction | null>> {
    await simulateDelay();
    const transactions = initializeTransactions();
    const transaction = transactions.find((t) => t.id === transactionId) || null;
    return {
      data: transaction,
      success: !!transaction,
      message: transaction ? undefined : 'Transaction not found',
    };
  },
};

