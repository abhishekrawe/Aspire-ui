import { useMemo } from 'react';
import { useApp } from '@store/AppContext';
import { Card } from '@/types';

export function useCards() {
  const { state, selectCard, toggleCardFreeze, setSpendLimit, addCard, deleteCard } = useApp();

  const selectedCard: Card | undefined = useMemo(() => {
    return state.cards.find((card) => card.id === state.selectedCardId);
  }, [state.cards, state.selectedCardId]);

  const debitCards = useMemo(() => {
    return state.cards.filter((card) => card.cardCategory === 'debit');
  }, [state.cards]);

  const creditCards = useMemo(() => {
    return state.cards.filter((card) => card.cardCategory === 'credit');
  }, [state.cards]);

  return {
    cards: state.cards,
    selectedCard,
    selectedCardId: state.selectedCardId,
    debitCards,
    creditCards,
    isLoading: state.isLoading,
    selectCard,
    toggleCardFreeze,
    setSpendLimit,
    addCard,
    deleteCard,
  };
}

