import { useApp } from '@store/AppContext';

export function useBalance() {
  const { state } = useApp();

  const formatBalance = (amount: number): string => {
    return new Intl.NumberFormat('en-SG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return {
    balance: state.balance,
    formattedBalance: formatBalance(state.balance.available),
    isLoading: state.isLoading,
  };
}

