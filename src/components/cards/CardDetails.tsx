import { useState } from 'react';
import { Card } from '@/types';
import nextIcon from '@assets/Images/next.svg';

interface CardDetailsProps {
  card: Card;
}

function CardDetails({ card }: CardDetailsProps) {
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
              <rect x="1" y="4" width="22" height="16" rx="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <span className="text-gray-900 font-medium">Card details</span>
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
        <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-4 border-t border-gray-100">
          <div className="pt-4 space-y-3">
            <DetailRow label="Card holder name" value={card.cardHolderName} />
            <DetailRow label="Card number" value={formatCardNumber(card.cardNumber)} />
            <DetailRow label="Expiry date" value={card.expiryDate} />
            <DetailRow label="CVV" value="***" />
            <DetailRow label="Card type" value={card.cardType.toUpperCase()} />
            {card.spendLimit && (
              <DetailRow
                label="Spend limit"
                value={`S$ ${card.spendLimit.toLocaleString()}`}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm text-gray-900 font-medium">{value}</span>
    </div>
  );
}

function formatCardNumber(number: string): string {
  const cleaned = number.replace(/\s/g, '');
  return cleaned.match(/.{1,4}/g)?.join(' ') || '';
}

export default CardDetails;

