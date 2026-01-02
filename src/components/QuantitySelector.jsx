import { FaPlus, FaMinus } from 'react-icons/fa';


const QuantitySelector = ({ 
  quantity, 
  onIncrement, 
  onDecrement, 
  disabled = false,
  ariaLabel = 'Quantity selector'
}) => {
  const canDecrement = quantity > 0 && !disabled;
  const canIncrement = !disabled;

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div 
      className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded w-fit"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        onClick={onDecrement}
        onKeyDown={(e) => handleKeyDown(e, onDecrement)}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
        className={`
          flex items-center justify-center transition-all duration-200
          ${canDecrement 
            ? 'opacity-100 hover:opacity-80 active:scale-95 cursor-pointer' 
            : 'opacity-40 cursor-not-allowed'
          }
        `}
      >
        <FaMinus size={12} aria-hidden="true" />
      </button>
      
      <span 
        className="font-semibold min-w-[20px] text-center text-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>
      
      <button
        onClick={onIncrement}
        onKeyDown={(e) => handleKeyDown(e, onIncrement)}
        disabled={!canIncrement}
        aria-label="Increase quantity"
        className={`
          flex items-center justify-center transition-all duration-200
          ${canIncrement 
            ? 'opacity-100 hover:opacity-80 active:scale-95 cursor-pointer' 
            : 'opacity-40 cursor-not-allowed'
          }
        `}
      >
        <FaPlus size={12} aria-hidden="true" />
      </button>
    </div>
  );
};

export default QuantitySelector;
