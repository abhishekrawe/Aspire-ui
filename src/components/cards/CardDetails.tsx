import { useState } from 'react';
import { Card } from '@/types';
import cardIcon from '../../assets/Images/Group 11889.svg';
import arrowIcon from '../../assets/Images/down-arrow-1.svg';

interface CardDetailsProps {
  card: Card;
}

function CardDetails({}: CardDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md md:shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 bg-[#F5F9FF] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <img src={cardIcon} alt="Card" className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-navy font-medium text-base md:text-lg">Card details</span>
        </div>
        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
          <img
            src={arrowIcon}
            alt="Toggle"
            className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 md:px-5 md:px-6 pb-4 md:pb-6 space-y-4 border-t border-gray-100">
          <div className="pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Nothing to Show here</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardDetails;
