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
    <div className="max-w-7xl mx-auto md:px-4">
      {/* Mobile: Available Balance + New Card Button */}
      <div className="md:hidden px-2 pt-6 pb-4">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Available balance</p>
            <div className="flex items-center gap-2">
              <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded">
                {balance.currencySymbol}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formattedBalance}
              </span>
            </div>
          </div>
          <button
            onClick={handleNewCard}
            className="bg-secondary hover:bg-secondary-600 text-white p-3 rounded-lg flex items-center justify-center transition-colors shadow-sm"
          >
            <img src={boxIcon} alt="New card" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop: Balance Section */}
      <div className="hidden md:flex md:flex-row md:justify-between items-center mb-6 md:mb-8">
        <div>
          <p className="text-gray-600 text-md mb-2">Available balance</p>
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
          className="bg-secondary hover:bg-secondary-600 text-white px-4 py-2 rounded-xl flex items-center gap-3 font-semibold text-base transition-colors shadow-sm"
        >
          <span className="w-10 h-10 flex items-center justify-center">
            <img src={boxIcon} alt="Box" className="w-6 h-6" />
          </span>
          <span>New card</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 md:gap-8 mb-6 md:mb-8 overflow-x-auto px-2 md:px-0">
        <button
          onClick={() => setActiveTab('debit')}
          className={`pb-2 md:pb-4 text-sm md:text-md font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'debit'
              ? 'text-black border-primary'
              : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
        >
          My debit cards
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`pb-2 md:pb-4 text-sm md:text-md font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'company'
              ? 'text-black border-primary'
              : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
        >
          All company cards
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {activeTab === 'debit' ? (
          <>
            {/* Horizontal Scrollable Cards - Show 10% of next card */}
            <div className="relative mb-6">
              <div className="overflow-x-auto scrollbar-hide px-2">
                <div className="flex gap-4 pb-4">
                  {debitCards.map((card, index) => (
                    <div
                      key={card.id}
                      onClick={() => selectCard(card.id)}
                      className={`flex-shrink-0 transition-all duration-300 ${
                        index === 0 ? 'w-[92%]' : 'w-[92%]'
                      }`}
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <DebitCard card={card} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Indicators */}
              {debitCards.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  {debitCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => selectCard(card.id)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        card.id === currentCard?.id
                          ? 'bg-primary'
                          : 'bg-gray-300'
                      }`}
                      aria-label={`Select card ${card.cardNumber.slice(-4)}`}
                    />
                  ))}
                </div>
              )}
            </div>

           
            <div className='bg-red-300 '> // this div will be scrollable to top of the div

              {/* Scrollable Action Buttons */}
              <div className="">
              <CardActions
                isFrozen={currentCard?.isFrozen}
                onFreeze={handleFreeze}
                onSetSpendLimit={handleSetSpendLimit}
                onAddToGPay={handleAddToGPay}
                onReplace={handleReplace}
                onCancel={handleCancel}
              />
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              {currentCard && <CardDetails card={currentCard} />}
              <RecentTransactions transactions={recentTransactions} />
            </div>

            </div>
            
          </>
        ) : (
          <p className="px-6">Coming soon</p>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
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
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          card.id === currentCard?.id
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
          <p>Coming soon</p>
        )}
      </div>

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

