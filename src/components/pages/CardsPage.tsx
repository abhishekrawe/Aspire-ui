import { useState } from 'react';
import { useBalance, useCards, useTransactions } from '@hooks/index';
import { DebitCard, CardActions, CardDetails, RecentTransactions } from '@components/cards';
import addIcon from '@assets/Images/add.svg';

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
          className="mt-4 md:mt-0 bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
        >
          <img src={addIcon} alt="Add" className="w-5 h-5" />
          <span>New card</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 md:gap-8 border-b border-gray-200 mb-6 md:mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('debit')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
            activeTab === 'debit'
              ? 'text-primary border-primary'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          My debit cards
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
            activeTab === 'company'
              ? 'text-primary border-primary'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          All company cards
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Card Section */}
        <div className="lg:col-span-7 space-y-6">
          {currentCard && <DebitCard card={currentCard} />}

          {/* Card count indicator */}
          {debitCards.length > 1 && (
            <div className="flex justify-center gap-2">
              {debitCards.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => selectCard(card.id)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    card.id === currentCard?.id ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Select card ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Card Actions */}
          <CardActions
            onFreeze={handleFreeze}
            onSetSpendLimit={handleSetSpendLimit}
            onAddToGPay={handleAddToGPay}
            onReplace={handleReplace}
            onCancel={handleCancel}
          />
        </div>

        {/* Card Details Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          {currentCard && <CardDetails card={currentCard} />}
          <RecentTransactions transactions={recentTransactions} />
        </div>
      </div>
    </div>
  );
}

export default CardsPage;

