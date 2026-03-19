import { useBalance, useCards } from '@hooks/index';

function CardsPage() {
  const { balance, formattedBalance, isLoading: balanceLoading } = useBalance();
  const { cards, selectedCard, isLoading: cardsLoading } = useCards();

  if (balanceLoading || cardsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      {/* Balance Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-gray-600 text-sm mb-2">Available balance</p>
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded">
              {balance.currencySymbol}
            </span>
            <span className="text-3xl font-bold text-gray-900">
              {formattedBalance}
            </span>
          </div>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          New card
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <button className="pb-4 text-sm font-semibold text-gray-900 border-b-2 border-primary">
          My debit cards
        </button>
        <button className="pb-4 text-sm font-medium text-gray-400 hover:text-gray-600">
          All company cards
        </button>
      </div>

      {/* Cards Grid - Placeholder */}
      <div className="grid grid-cols-12 gap-8">
        {/* Card Section */}
        <div className="col-span-7">
          <div className="bg-primary rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-end mb-6">
              <span className="text-xl font-bold">aspire</span>
            </div>
            <p className="text-xl font-semibold mb-6">
              {selectedCard?.cardHolderName || 'Card Holder'}
            </p>
            <div className="flex gap-6 mb-4 text-lg tracking-wider">
              <span>••••</span>
              <span>••••</span>
              <span>••••</span>
              <span>{selectedCard?.cardNumber.slice(-4) || '0000'}</span>
            </div>
            <div className="flex gap-8 text-sm">
              <span>Thru: {selectedCard?.expiryDate || 'MM/YY'}</span>
              <span>CVV: ***</span>
            </div>
            <div className="flex justify-end mt-4">
              <span className="text-2xl font-bold italic">VISA</span>
            </div>
          </div>

          {/* Card count indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Details Sidebar */}
        <div className="col-span-5">
          <div className="bg-white rounded-xl shadow-card p-4">
            <div className="flex items-center gap-3 py-4 border-b border-gray-100">
              <span className="text-gray-400">Card details</span>
            </div>
            <div className="flex items-center gap-3 py-4">
              <span className="text-gray-400">Recent transactions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsPage;

