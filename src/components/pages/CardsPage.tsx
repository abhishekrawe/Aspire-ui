import { useState, useCallback } from 'react';
import { useBalance, useCards, useTransactions } from '@hooks/index';
import { DebitCard, CardActions, CardDetails, RecentTransactions, AddCardModal, CancelCardModal } from '@components/cards';
import { useApp } from '@store/AppContext';
import boxIcon from '@assets/Images/box.svg';

function CardsPage() {
  const { state } = useApp();
  const { balance, formattedBalance, isLoading: balanceLoading } = useBalance();
  const { debitCards, selectedCard, selectCard, toggleCardFreeze, setSpendLimit, deleteCard, addCard, isLoading: cardsLoading } = useCards();
  const { recentTransactions } = useTransactions(selectedCard?.id);
  const [activeTab, setActiveTab] = useState<'debit' | 'company'>('debit');
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const currentCard = selectedCard || debitCards[0];

  const handleFreeze = useCallback(() => {
    if (currentCard) {
      toggleCardFreeze(currentCard.id);
    }
  }, [currentCard, toggleCardFreeze]);

  const handleSetSpendLimit = useCallback(() => {
    if (currentCard) {
      // In a real app, this would open a modal
      const limit = prompt('Enter spend limit:');
      if (limit) {
        setSpendLimit(currentCard.id, parseFloat(limit));
      }
    }
  }, [currentCard, setSpendLimit]);

  const handleAddToGPay = useCallback(() => {
    alert('Add to GPay functionality would be implemented here');
  }, []);

  const handleReplace = useCallback(() => {
    alert('Replace card functionality would be implemented here');
  }, []);

  const handleCancel = useCallback(() => {
    setIsCancelModalOpen(true);
  }, []);

  const handleConfirmCancel = useCallback(() => {
    if (currentCard) {
      deleteCard(currentCard.id);
    }
  }, [currentCard, deleteCard]);

  const handleNewCard = useCallback(() => {
    setIsAddCardModalOpen(true);
  }, []);

  const handleAddCard = useCallback(async (card: Omit<import('@/types').Card, 'id'>) => {
    await addCard(card);
  }, [addCard]);
  

  if (balanceLoading || cardsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 md:mb-8">
        <div>
          <p className="text-gray-600 text-md mb-2 hidden md:block">Available balance</p>
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
      <div className="flex gap-6 md:gap-8 mb-6 md:mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('debit')}
          className={`pb-4 text-md font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'debit'
              ? 'text-black border-primary'
              : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
        >
          My debit cards
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`pb-4 text-md font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'company'
              ? 'text-black border-primary'
              : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
        >
          All company cards
        </button>
      </div>

      {/* Cards Grid */}
      {activeTab === 'debit' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 p-6 md:p-8 lg:py-20 lg:px-12 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.08)]">

          {/* Card Section */}
          <div className="space-y-6">
            {currentCard && <DebitCard card={currentCard} />}

            {debitCards.length > 1 && (
              <div className="flex items-center justify-center gap-4">
                <div className="flex gap-2">
                  {debitCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => selectCard(card.id)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${card.id === currentCard?.id
                          ? 'bg-primary'
                          : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      aria-label={`Select card ${card.cardNumber.slice(-4)}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <CardActions
              isFrozen={currentCard?.isFrozen}
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
      ) : (
          <p> Coming soon </p>
      )}

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onAddCard={handleAddCard}
        cardHolderName={state.user?.name || 'Card Holder'}
      />

      {/* Cancel Card Modal */}
      <CancelCardModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        cardNumber={currentCard?.cardNumber || ''}
      />
    </div>
  );
}

export default CardsPage;

