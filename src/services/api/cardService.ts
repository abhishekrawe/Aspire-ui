import { Card, ApiResponse } from '@/types';
import { mockCards, simulateDelay } from './mockData';
import { storageService } from '@services/storage/storageService';

const CARDS_STORAGE_KEY = 'aspire_cards';

// Initialize cards from localStorage or use mock data
const initializeCards = (): Card[] => {
  const storedCards = storageService.get<Card[]>(CARDS_STORAGE_KEY);
  if (storedCards && storedCards.length > 0) {
    return storedCards;
  }
  storageService.set(CARDS_STORAGE_KEY, mockCards);
  return mockCards;
};

export const cardService = {
  // Get all cards
  async getCards(): Promise<ApiResponse<Card[]>> {
    await simulateDelay();
    const cards = initializeCards();
    return {
      data: cards,
      success: true,
    };
  },

  // Get card by ID
  async getCardById(cardId: string): Promise<ApiResponse<Card | null>> {
    await simulateDelay();
    const cards = initializeCards();
    const card = cards.find((c) => c.id === cardId) || null;
    return {
      data: card,
      success: !!card,
      message: card ? undefined : 'Card not found',
    };
  },

  // Add new card
  async addCard(card: Omit<Card, 'id'>): Promise<ApiResponse<Card>> {
    await simulateDelay();
    const cards = initializeCards();
    const newCard: Card = {
      ...card,
      id: `card-${Date.now()}`,
    };
    const updatedCards = [...cards, newCard];
    storageService.set(CARDS_STORAGE_KEY, updatedCards);
    return {
      data: newCard,
      success: true,
    };
  },

  // Update card
  async updateCard(card: Card): Promise<ApiResponse<Card>> {
    await simulateDelay();
    const cards = initializeCards();
    const index = cards.findIndex((c) => c.id === card.id);
    if (index === -1) {
      return {
        data: card,
        success: false,
        error: 'Card not found',
      };
    }
    cards[index] = card;
    storageService.set(CARDS_STORAGE_KEY, cards);
    return {
      data: card,
      success: true,
    };
  },

  // Freeze/Unfreeze card
  async toggleCardFreeze(cardId: string): Promise<ApiResponse<Card>> {
    await simulateDelay();
    const cards = initializeCards();
    const card = cards.find((c) => c.id === cardId);
    if (!card) {
      return {
        data: {} as Card,
        success: false,
        error: 'Card not found',
      };
    }
    card.isFrozen = !card.isFrozen;
    storageService.set(CARDS_STORAGE_KEY, cards);
    return {
      data: card,
      success: true,
    };
  },

  // Set spend limit
  async setSpendLimit(cardId: string, limit: number): Promise<ApiResponse<Card>> {
    await simulateDelay();
    const cards = initializeCards();
    const card = cards.find((c) => c.id === cardId);
    if (!card) {
      return {
        data: {} as Card,
        success: false,
        error: 'Card not found',
      };
    }
    card.spendLimit = limit;
    storageService.set(CARDS_STORAGE_KEY, cards);
    return {
      data: card,
      success: true,
    };
  },

  // Delete card
  async deleteCard(cardId: string): Promise<ApiResponse<boolean>> {
    await simulateDelay();
    const cards = initializeCards();
    const filteredCards = cards.filter((c) => c.id !== cardId);
    storageService.set(CARDS_STORAGE_KEY, filteredCards);
    return {
      data: true,
      success: true,
    };
  },
};

