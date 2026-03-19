import { useState } from 'react';
import { Card } from '@/types';
import nextIcon from '@assets/Images/next.svg';
import downArrowIcon from '@assets/Images/down-arrow-1.svg';
import docIcon from '@assets/Images/Group 11889.svg';

interface CardDetailsProps {
  card: Card;
}

function CardDetails({ card }: CardDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-gray-50 bg-[#F5F9FF] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={docIcon} alt="Card" className="w-6 h-6" />
          </div>
          <span className="text-navy font-medium text-lg">Card details</span>
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
        <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-4 border-t border-gray-100">
          <div className="pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Nothing to Show here  </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default CardDetails;

