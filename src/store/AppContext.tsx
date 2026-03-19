import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
} from 'react';
import { AppState, AppAction, Card, Transaction, Balance, User } from '@/types';
import { cardService, transactionService, userService } from '@services/api';

// Initial state
const initialState: AppState = {
  user: null,
  cards: [],
  transactions: [],
  balance: {
    available: 0,
    currency: 'SGD',
    currencySymbol: 'S$',
  },
  selectedCardId: null,
  isLoading: true,
  error: null,
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CARDS':
      return { 
        ...state, 
        cards: action.payload,
        selectedCardId: state.selectedCardId || action.payload[0]?.id || null,
      };
    case 'ADD_CARD':
      return { ...state, cards: [...state.cards, action.payload] };
    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
    case 'DELETE_CARD':
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
        selectedCardId:
          state.selectedCardId === action.payload
            ? state.cards[0]?.id || null
            : state.selectedCardId,
      };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'SELECT_CARD':
      return { ...state, selectedCardId: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_CARD_FREEZE':
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.payload ? { ...card, isFrozen: !card.isFrozen } : card
        ),
      };
    case 'SET_SPEND_LIMIT':
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.payload.cardId
            ? { ...card, spendLimit: action.payload.limit }
            : card
        ),
      };
    default:
      return state;
  }
}

// Context types
interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
  // Helper functions
  selectCard: (cardId: string) => void;
  toggleCardFreeze: (cardId: string) => Promise<void>;
  setSpendLimit: (cardId: string, limit: number) => Promise<void>;
  addCard: (card: Omit<Card, 'id'>) => Promise<void>;
  deleteCard: (cardId: string) => Promise<void>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize data on mount
  useEffect(() => {
    async function initializeApp() {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        const [userRes, balanceRes, cardsRes, transactionsRes] = await Promise.all([
          userService.getCurrentUser(),
          userService.getBalance(),
          cardService.getCards(),
          transactionService.getTransactions(),
        ]);

        if (userRes.success) dispatch({ type: 'SET_USER', payload: userRes.data });
        if (balanceRes.success) dispatch({ type: 'SET_BALANCE', payload: balanceRes.data });
        if (cardsRes.success) dispatch({ type: 'SET_CARDS', payload: cardsRes.data });
        if (transactionsRes.success) dispatch({ type: 'SET_TRANSACTIONS', payload: transactionsRes.data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize app' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    initializeApp();
  }, []);

  // Helper functions
  const selectCard = (cardId: string) => {
    dispatch({ type: 'SELECT_CARD', payload: cardId });
  };

  const toggleCardFreeze = async (cardId: string) => {
    const response = await cardService.toggleCardFreeze(cardId);
    if (response.success) {
      dispatch({ type: 'TOGGLE_CARD_FREEZE', payload: cardId });
    }
  };

  const setSpendLimit = async (cardId: string, limit: number) => {
    const response = await cardService.setSpendLimit(cardId, limit);
    if (response.success) {
      dispatch({ type: 'SET_SPEND_LIMIT', payload: { cardId, limit } });
    }
  };

  const addCard = async (card: Omit<Card, 'id'>) => {
    const response = await cardService.addCard(card);
    if (response.success) {
      dispatch({ type: 'ADD_CARD', payload: response.data });
    }
  };

  const deleteCard = async (cardId: string) => {
    const response = await cardService.deleteCard(cardId);
    if (response.success) {
      dispatch({ type: 'DELETE_CARD', payload: cardId });
    }
  };

  const value: AppContextType = {
    state,
    dispatch,
    selectCard,
    toggleCardFreeze,
    setSpendLimit,
    addCard,
    deleteCard,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

