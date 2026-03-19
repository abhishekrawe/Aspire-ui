import { useMemo } from 'react';
import { useApp } from '@store/AppContext';

export function useTransactions(cardId?: string) {
  const { state } = useApp();

  const transactions = useMemo(() => {
    if (!cardId) {
      return state.transactions;
    }
    return state.transactions.filter((t) => t.cardId === cardId);
  }, [state.transactions, cardId]);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  return {
    transactions,
    recentTransactions,
    isLoading: state.isLoading,
  };
}

