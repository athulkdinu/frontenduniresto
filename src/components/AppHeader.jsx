import { FaShoppingCart } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';


const AppHeader = () => {
  const { totalCount } = useCart();

  return (
    <header 
      className="bg-white px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-20 border-b border-gray-200"
      role="banner"
    >
      <div className="flex items-center gap-3">
        <button
          className="p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Go back"
        >
          <FaArrowLeft 
            size={20} 
            className="text-gray-700" 
            aria-hidden="true"
          />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-900">
          UNI Resto Cafe
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium text-sm md:text-base">
          My Orders
        </span>
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
          <span 
            className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
            aria-label={`${totalCount} items in cart`}
          >
            {totalCount > 99 ? '99+' : totalCount}
          </span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
