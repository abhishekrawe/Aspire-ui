import { useState } from 'react';
import { Card } from '@/types';
import visaLogo from '@assets/Images/Visa Logo.svg?url';
import aspireLogo from '@assets/Images/Aspire-Logo-1.svg?url';
import eyeIcon from '@assets/Images/remove_red_eye-24px.svg?url';

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
    // Show only last 4 digits with larger dots
    const lastFour = cleaned.slice(-4);
    return (
      <span className="flex items-center gap-[0.4em]">
        <span className="text-[1.2em] tracking-[0.15em]">••••</span>
        <span className="text-[1.2em] tracking-[0.15em]">••••</span>
        <span className="text-[1.2em] tracking-[0.15em]">••••</span>
        <span>{lastFour}</span>
      </span>
    );
  };

  return (
    <div className="relative pt-5 md:pt-0">
      {/* Show Card Number Button - Positioned outside card at top-right corner */}
      <button
        onClick={() => setShowCardNumber(!showCardNumber)}
        className="absolute -top-4 md:-top-12 right-0 md:right-0 flex items-center gap-2 bg-white md:bg-transparent text-primary md:text-primary text-xs md:text-base font-semibold hover:bg-gray-50 md:hover:bg-white/10 transition-all z-20 px-2 py-2 md:px-5 md:py-3 rounded-t-lg"
      >
        <img src={eyeIcon} alt="Show" className="w-5 h-5 md:w-6 md:h-6" />
        <span>{showCardNumber ? 'Hide' : 'Show'} card number</span>
      </button>

      {/* Card */}
      <div
        className={`rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-none md:rounded-[20px] p-6 md:p-8 text-white shadow-lg aspect-[1.586/1] flex flex-col justify-between relative transition-opacity duration-300 ${card.isFrozen ? 'opacity-50' : 'opacity-100'
          }`}
        style={{ backgroundColor: card.color || '#01D167' }}
      >

        {/* Frozen Badge */}
        {card.isFrozen && (
          <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            FROZEN
          </div>
        )}

        {/* Aspire Logo - Top Right */}
        <div className="flex justify-end">
          <img src={aspireLogo} alt="Aspire" className="h-6 md:h-8" />
        </div>

        {/* Card Content - Middle Section */}
        <div className="flex-1 flex flex-col justify-center md-mt-0 mt-6">

          {/* Card Holder Name */}
          <p className=" text-xl md:text-2xl md:text-[32px] font-bold mb-2 md:mb-8 tracking-wide">
            {card.cardHolderName}
          </p>

          {/* Card Number */}
          <div className="text-lg md:text-2xl md:text-[28px] tracking-[0.2em] font-bold mb-0 md:mb-4">
            {formatCardNumber(card.cardNumber)}
          </div>

          {/* 👉 Moved here (Expiry + CVV) */}
          <div className="flex gap-6 md:gap-8 text-sm md:text-lg md:text-lg font-bold mt-4">
            <span>Thru: {card.expiryDate}</span>
            <span>CVV: {showCardNumber ? card.cvv : '***'}</span>
          </div>

        </div>

        {/* Bottom Section - Only VISA logo now */}
        <div className="flex justify-end">
          <img src={visaLogo} alt="VISA" className="h-7 md:h-9" />
        </div>

      </div>
    </div>
  );
}

export default DebitCard;

