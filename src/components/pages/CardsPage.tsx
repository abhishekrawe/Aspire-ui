import { useState } from 'react';
import { useBalance, useCards, useTransactions } from '@hooks/index';
import { DebitCard, CardActions, CardDetails, RecentTransactions } from '@components/cards';
import boxIcon from '@assets/Images/box.svg';

function CardsPage() {
  const { balance, formattedBalance, isLoading: balanceLoading } = useBalance();
  const { debitCards, selectedCard, selectCard, toggleCardFreeze, setSpendLimit, deleteCard, isLoading: cardsLoading } = useCards();
  const { recentTransactions } = useTransactions(selectedCard?.id);
  const [activeTab, setActiveTab] = useState<'debit' | 'company'>('debit');

  if (balanceLoading || cardsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentCard = selectedCard || debitCards[0];

  const handleFreeze = () => {
    if (currentCard) {
      toggleCardFreeze(currentCard.id);
    }
  };

  const handleSetSpendLimit = () => {
    if (currentCard) {
      // In a real app, this would open a modal
      const limit = prompt('Enter spend limit:');
      if (limit) {
        setSpendLimit(currentCard.id, parseFloat(limit));
      }
    }
  };

  const handleAddToGPay = () => {
    alert('Add to GPay functionality would be implemented here');
  };

  const handleReplace = () => {
    alert('Replace card functionality would be implemented here');
  };

  const handleCancel = () => {
    if (currentCard && confirm('Are you sure you want to cancel this card?')) {
      deleteCard(currentCard.id);
    }
  };

  const handleNewCard = () => {
    alert('New card creation would be implemented here');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Mobile Header - Hidden on Desktop */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Account balance</h1>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 md:mb-8">
        <div>
          <p className="text-gray-600 text-sm mb-2 hidden md:block">Available balance</p>
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded">
              {balance.currencySymbol}
            </span>
            <span className="text-3xl md:text-4xl font-bold text-gray-900">
              {formattedBalance}
            </span>
          </div>
        </div>
        <button
          onClick={handleNewCard}
          className="mt-4 md:mt-0 bg-secondary hover:bg-secondary-600 text-white px-4 py-2 rounded-xl flex items-center gap-3 font-semibold text-base transition-colors shadow-sm"
        >
          <span className="w-10 h-10 flex items-center justify-center">
            <img src={boxIcon} alt="Box" className="w-6 h-6" />
          </span>
          <span>New card</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 md:gap-8 border-b border-gray-200 mb-6 md:mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('debit')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'debit'
              ? 'text-primary border-primary'
              : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
        >
          My debit cards
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'company'
              ? 'text-primary border-primary'
              : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
        >
          All company cards
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 p-6 md:p-8 lg:p-12 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.08)]">

        {/* Card Section */}
        <div className="space-y-6">
          {currentCard && <DebitCard card={currentCard} />}

          {debitCards.length > 1 && (
            <div className="flex justify-center gap-2">
              {debitCards.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => selectCard(card.id)}
                  className={`w-2 h-2 rounded-full transition-colors ${card.id === currentCard?.id
                      ? 'bg-primary'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          )}

          <CardActions
            onFreeze={handleFreeze}
            onSetSpendLimit={handleSetSpendLimit}
            onAddToGPay={handleAddToGPay}
            onReplace={handleReplace}
            onCancel={handleCancel}
          />
        </div>

        {/* Card Details Sidebar */}
        <div className="space-y-4">
          {currentCard && <CardDetails card={currentCard} />}
          <RecentTransactions transactions={recentTransactions} />
        </div>

      </div>
    </div>
  );
}

export default CardsPage;

