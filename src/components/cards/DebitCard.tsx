import { useState } from 'react';
import { Card } from '@/types';
import visaLogo from '@assets/Images/Visa Logo.svg';
import aspireLogo from '@assets/Images/Logo.svg';
import eyeIcon from '@assets/Images/remove_red_eye-24px.svg';

interface DebitCardProps {
  card: Card;
}

function DebitCard({ card }: DebitCardProps) {
  const [showCardNumber, setShowCardNumber] = useState(false);

  const formatCardNumber = (number: string) => {
    // Remove spaces and format as groups of 4
    const cleaned = number.replace(/\s/g, '');
    if (showCardNumber) {
      return cleaned.match(/.{1,4}/g)?.join('  ') || '';
    }
    // Show only last 4 digits
    const lastFour = cleaned.slice(-4);
    return `••••  ••••  ••••  ${lastFour}`;
  };

  return (
    <div className="relative">
      {/* Show Card Number Button */}
      <button
        onClick={() => setShowCardNumber(!showCardNumber)}
        className="absolute -top-12 right-0 flex items-center gap-2 text-primary text-sm font-medium hover:text-primary-600 transition-colors z-10"
      >
        <img src={eyeIcon} alt="Show" className="w-5 h-5" />
        <span>{showCardNumber ? 'Hide' : 'Show'} card number</span>
      </button>

      {/* Card */}
      <div className="bg-primary rounded-[20px] p-6 md:p-8 text-white shadow-lg aspect-[1.586/1] flex flex-col justify-between">
        {/* Card Header */}
        <div className="flex justify-end">
          <img src={aspireLogo} alt="Aspire" className="h-6 md:h-7" />
        </div>

        {/* Card Holder Name */}
        <div>
          <p className="text-xl md:text-2xl font-bold mb-8 md:mb-10">
            {card.cardHolderName}
          </p>

          {/* Card Number */}
          <div className="text-sm md:text-base tracking-[0.15em] mb-4 font-medium">
            {formatCardNumber(card.cardNumber)}
          </div>

          {/* Card Details */}
          <div className="flex items-center justify-between">
            <div className="flex gap-8 text-xs md:text-sm">
              <span>Thru: {card.expiryDate}</span>
              <span>CVV: {showCardNumber ? card.cvv : '***'}</span>
            </div>
            <img src={visaLogo} alt="VISA" className="h-6 md:h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebitCard;

