import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';


const AppHeader = () => {
  const { totalCount } = useCart();

  return (
    <header 
      className="bg-white shadow-md px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-20"
      role="banner"
    >
      <h1 className="text-lg md:text-xl font-bold text-gray-800">
        UNI Resto Cafe
      </h1>

      <button
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label={`Shopping cart with ${totalCount} items`}
        aria-live="polite"
        aria-atomic="true"
      >
        <FaShoppingCart 
          size={24} 
          className="text-gray-700" 
          aria-hidden="true"
        />
        {totalCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center shadow-lg"
            aria-label={`${totalCount} items in cart`}
          >
            {totalCount > 99 ? '99+' : totalCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default AppHeader;
