// Images loaded directly

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
      icon: 'Freeze card.svg',
      onClick: onFreeze,
      disabled: false,
    },
    {
      id: 'spend-limit',
      label: 'Set spend limit',
      icon: 'Set spend limit.svg',
      disabled: true,
    },
    {
      id: 'gpay',
      label: 'Add to GPay',
      icon: 'GPay.svg',
      disabled: true,
    },
    {
      id: 'replace',
      label: 'Replace card',
      icon: 'Replace card.svg',
      disabled: true,
    },
    {
      id: 'cancel',
      label: 'Cancel card',
      icon: 'Deactivate card.svg',
      onClick: onCancel,
      disabled: false,
    },
  ];

  return (
    <div className="bg-[#EDF3FF] rounded-2xl shadow-sm overflow-hidden p-4 md:px-6 md:py-4">
      {/* Mobile & Desktop: Grid Layout - All 5 buttons visible */}
      <div className="grid grid-cols-5 gap-2 md:gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.disabled ? undefined : action.onClick}
            disabled={action.disabled}
            className={`flex flex-col items-center gap-2 md:gap-3 p-1 md:p-3 transition-colors group ${
              action.disabled ? 'cursor-default opacity-100' : 'cursor-pointer'
            }`}
          >
            <div className="w-12 h-12 md:w-12 md:h-12 flex items-center justify-center md:bg-transparent rounded-full md:rounded-none transition-colors">
              <img src={`/src/assets/Images/${action.icon}`} alt={action.label} className="w-6 h-6 md:w-10 md:h-10" />
            </div>
            <span className="text-[10px] md:text-sm text-gray-700 text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CardActions;

