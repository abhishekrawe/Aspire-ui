import { useState } from 'react';
import { Transaction } from '@/types';
import nextIcon from '@assets/Images/next.svg';
import fileStorageIcon from '@assets/Images/file-storage.svg';
import flightsIcon from '@assets/Images/flights.svg';
import businessIcon from '@assets/Images/business-and-finance.svg';
import megaphoneIcon from '@assets/Images/megaphone.svg';
import transferIcon from '@assets/Images/Group 11889-1.svg';
import downArrowIcon from '@assets/Images/down-arrow-1.svg';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
        className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-gray-50 bg-[#F5F9FF] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={transferIcon} alt="Recent" className="w-6 h-6" />
          </div>
          <span className="text-navy font-medium text-lg">Recent transactions</span>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <img
            src={downArrowIcon}
            alt="Toggle"
            className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100">
          {displayedTransactions.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">No recent transactions</div>
          ) : (
            <>
              <div className="divide-y rounded-b-xl rounded-t-none  bg-black/5">
                {displayedTransactions.slice(0, visibleCount).map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>

              {/* View all button - loads 4 more items each click (always visible when there are transactions) */}
              {displayedTransactions.length > 0 && (
                  <button
                    onClick={() => setVisibleCount((c) => Math.min(displayedTransactions.length, c + 4))}
                    className="w-full py-5 rounded-b-xl rounded-t-none bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
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
    <div className="flex items-center gap-4 p-5 md:p-6 hover:bg-gray-50 transition-colors">
      {/* Icon */}
      <div className="flex-shrink-0">
        {(() => {
          const meta = getTransactionMeta(transaction.category);
          return (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${meta.bg}`}>
              <img src={meta.src} alt={transaction.category} className="w-5 h-5" />
            </div>
          );
        })()}
      </div>

      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {transaction.merchantName}
        </p>
        <p className="text-xs text-gray-500 mt-1">{formatDate(transaction.date)}</p>
        {transaction.description && (
          <div className="flex items-center gap-3 mt-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#325BAF' }}>
              <img src={businessIcon} alt="desc" className="w-3.5 h-3.5" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <span className="text-sm text-navy">{transaction.description}</span>
          </div>
        )}
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0 flex flex-col items-end gap-2">
        <p className={`text-lg font-semibold ${isCredit ? 'text-primary' : 'text-gray-900'}`}>
          {isCredit ? '+' : '-'} S$ {transaction.amount.toFixed(0)}
        </p>
        <img src={nextIcon} alt="Open" className="w-4 h-4 opacity-40" />
      </div>
    </div>
  );
}

export default RecentTransactions;