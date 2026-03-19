import { useState } from 'react';
import { Transaction } from '@/types';
import nextIcon from '@assets/Images/next.svg?url';
import fileStorageIcon from '@assets/Images/file-storage.svg?url';
import flightsIcon from '@assets/Images/flights.svg?url';
import businessIcon from '@assets/Images/business-and-finance.svg?url';
import megaphoneIcon from '@assets/Images/megaphone.svg?url';
import transferIcon from '@assets/Images/Group 11889-1.svg?url';
import downArrowIcon from '@assets/Images/down-arrow-1.svg?url';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4);

  // Ensure at least one Travel item is shown (demo), so UI shows flight icon
  const displayedTransactions: Transaction[] = (() => {
    if (transactions.some((t) => t.category === 'Travel')) return transactions;
    const demo: Transaction = {
      id: 'demo-flight',
      merchantName: 'Demo Airline',
      date: '2020-05-20',
      description: 'Flight booking',
      amount: 150,
      type: 'debit',
      category: 'Travel',
    } as Transaction;
    return [...transactions, demo];
  })();

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 bg-[#F5F9FF] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <img src={transferIcon} alt="Recent" className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-navy font-medium text-base md:text-lg">Recent transactions</span>
        </div>
        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
          <img
            src={downArrowIcon}
            alt="Toggle"
            className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100">
          {displayedTransactions.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">No recent transactions</div>
          ) : (
            <>
              <div className="divide-y divide-gray-100">
                {displayedTransactions.slice(0, visibleCount).map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>

              {/* View all button - loads 4 more items each click (always visible when there are transactions) */}
              {displayedTransactions.length > 0 && (
                  <button
                    onClick={() => setVisibleCount((c) => Math.min(displayedTransactions.length, c + 4))}
                    className="w-full py-4 md:py-5 rounded-b-xl rounded-t-none bg-primary/10 text-primary text-sm md:text-base font-semibold hover:bg-primary/20 transition-colors"
                  >
                    View all card transactions
                  </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const getTransactionMeta = (category: string) => {
    const map: Record<string, { src: string; bg: string }> = {
      Refund: { src: fileStorageIcon, bg: 'bg-blue-50' },
      Travel: { src: flightsIcon, bg: 'bg-emerald-50' },
      Shopping: { src: megaphoneIcon, bg: 'bg-pink-50' },
      Charged: { src: businessIcon, bg: 'bg-blue-50' },
      Charge: { src: businessIcon, bg: 'bg-blue-50' },
    };
    return map[category] || { src: fileStorageIcon, bg: 'bg-blue-50' };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const isCredit = transaction.type === 'credit';

  return (
    <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 hover:bg-gray-50 transition-colors">
      {/* Icon */}
      <div className="flex-shrink-0">
        {(() => {
          const meta = getTransactionMeta(transaction.category);
          return (
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${meta.bg}`}>
              <img src={meta.src} alt={transaction.category} className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          );
        })()}
      </div>

      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm md:text-md font-semibold text-gray-900 truncate">
          {transaction.merchantName}
        </p>
        <p className="text-xs md:text-md text-gray-500 mt-0.5 md:mt-1">{formatDate(transaction.date)}</p>
        {transaction.description && (
          <div className="flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2">
            <div className="w-6 h-6 md:w-8 md:h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#325BAF' }}>
              <img src={businessIcon} alt="desc" className="w-3 h-3 md:w-3.5 md:h-3.5" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <span className="text-xs md:text-sm font-medium text-navy truncate">{transaction.description}</span>
          </div>
        )}
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0 flex flex-col items-end gap-1 md:gap-2">
        <p className={`text-sm md:text-lg font-semibold ${isCredit ? 'text-primary' : 'text-gray-900'}`}>
          {isCredit ? '+' : '-'} S$ {transaction.amount.toFixed(0)}
        </p>
        <img src={nextIcon} alt="Open" className="w-3 h-3 md:w-4 md:h-4 opacity-40" />
      </div>
    </div>
  );
}

export default RecentTransactions;