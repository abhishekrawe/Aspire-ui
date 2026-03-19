import freezeIcon from '@assets/Images/Freeze card.svg';
import spendLimitIcon from '@assets/Images/Set spend limit.svg';
import gpayIcon from '@assets/Images/GPay.svg';
import replaceIcon from '@assets/Images/Replace card.svg';
import cancelIcon from '@assets/Images/Deactivate card.svg';

interface CardAction {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
}

interface CardActionsProps {
  onFreeze: () => void;
  onSetSpendLimit: () => void;
  onAddToGPay: () => void;
  onReplace: () => void;
  onCancel: () => void;
}

function CardActions({
  onFreeze,
  onSetSpendLimit,
  onAddToGPay,
  onReplace,
  onCancel,
}: CardActionsProps) {
  const actions: CardAction[] = [
    {
      id: 'freeze',
      label: 'Freeze card',
      icon: freezeIcon,
      onClick: onFreeze,
    },
    {
      id: 'spend-limit',
      label: 'Set spend limit',
      icon: spendLimitIcon,
      onClick: onSetSpendLimit,
    },
    {
      id: 'gpay',
      label: 'Add to GPay',
      icon: gpayIcon,
      onClick: onAddToGPay,
    },
    {
      id: 'replace',
      label: 'Replace card',
      icon: replaceIcon,
      onClick: onReplace,
    },
    {
      id: 'cancel',
      label: 'Cancel card',
      icon: cancelIcon,
      onClick: onCancel,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="grid grid-cols-5 gap-3 md:gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex flex-col items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#325BAF] flex items-center justify-center group-hover:bg-[#2a4d96] transition-colors">
              <img src={action.icon} alt={action.label} className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-xs md:text-sm text-gray-700 text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CardActions;

