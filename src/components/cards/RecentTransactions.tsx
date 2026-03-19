import { useState } from 'react';
import { Transaction } from '@/types';
import nextIcon from '@assets/Images/next.svg';
import fileStorageIcon from '@assets/Images/file-storage.svg';
import flightsIcon from '@assets/Images/flights.svg';
import megaphoneIcon from '@assets/Images/megaphone.svg';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#325BAF] flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <span className="text-gray-900 font-medium">Recent transactions</span>
        </div>
        <img
          src={nextIcon}
          alt="Toggle"
          className={`w-5 h-5 transition-transform ${
            isExpanded ? 'rotate-90' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100">
          {transactions.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No recent transactions
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const getTransactionIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      Refund: fileStorageIcon,
      Shopping: megaphoneIcon,
      Travel: flightsIcon,
    };
    return iconMap[category] || fileStorageIcon;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const isCredit = transaction.type === 'credit';

  return (
    <div className="flex items-center gap-4 p-5 md:p-6 hover:bg-gray-50 transition-colors">
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <img src={getTransactionIcon(transaction.category)} alt={transaction.category} className="w-6 h-6" />
      </div>

      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {transaction.merchantName}
        </p>
        <p className="text-xs text-gray-500 mt-1">{formatDate(transaction.date)}</p>
        {transaction.description && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-5 h-5 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <span className="text-xs text-navy">{transaction.description}</span>
          </div>
        )}
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-semibold ${isCredit ? 'text-primary' : 'text-gray-900'}`}>
          {isCredit ? '+' : '-'} S$ {transaction.amount.toFixed(0)}
        </p>
      </div>
    </div>
  );
}

export default RecentTransactions;

