import freezeIcon from '@assets/Images/Freeze card.svg?url';
import spendLimitIcon from '@assets/Images/Set spend limit.svg?url';
import gpayIcon from '@assets/Images/GPay.svg?url';
import replaceIcon from '@assets/Images/Replace card.svg?url';
import cancelIcon from '@assets/Images/Deactivate card.svg?url';

interface CardAction {
  id: string;
  label: string;
  icon: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface CardActionsProps {
  isFrozen?: boolean;
  onFreeze: () => void;
  onSetSpendLimit: () => void;
  onAddToGPay: () => void;
  onReplace: () => void;
  onCancel: () => void;
}

function CardActions({
  isFrozen = false,
  onFreeze,
  onCancel,
}: CardActionsProps) {
  const actions: CardAction[] = [
    {
      id: 'freeze',
      label: isFrozen ? 'Unfreeze card' : 'Freeze card',
      icon: freezeIcon,
      onClick: onFreeze,
      disabled: false,
    },
    {
      id: 'spend-limit',
      label: 'Set spend limit',
      icon: spendLimitIcon,
      disabled: true,
    },
    {
      id: 'gpay',
      label: 'Add to GPay',
      icon: gpayIcon,
      disabled: true,
    },
    {
      id: 'replace',
      label: 'Replace card',
      icon: replaceIcon,
      disabled: true,
    },
    {
      id: 'cancel',
      label: 'Cancel card',
      icon: cancelIcon,
      onClick: onCancel,
      disabled: false,
    },
  ];

  return (
    <div className="bg-[#EDF3FF] rounded-2xl p-4 md:px-6 py-4 shadow-sm">
      <div className="grid grid-cols-5 gap-3 md:gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.disabled ? undefined : action.onClick}
            disabled={action.disabled}
            className={`flex flex-col items-center gap-2 md:gap-3 p-2 md:p-3 transition-colors group ${
              action.disabled ? 'cursor-default opacity-100' : 'cursor-pointer'
            }`}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors">
              <img src={action.icon} alt={action.label} className="w-1 h-5 md:w-10 md:h-10" />
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

