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
      className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full w-fit shadow-md"
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
        <FaMinus size={14} aria-hidden="true" />
      </button>
      
      <span 
        className="font-bold min-w-[24px] text-center text-lg"
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
        <FaPlus size={14} aria-hidden="true" />
      </button>
    </div>
  );
};

export default QuantitySelector;
