import { useCart } from '../hooks/useCart';
import QuantitySelector from './QuantitySelector';


const MenuDishCard = ({ dish }) => {
  const { addDish, removeDish, getQuantity } = useCart();
  const quantity = getQuantity(dish.dish_id);
  const isAvailable = dish.dish_Availability;
  const hasCustomizations = dish.addonCat?.length > 0;

  const handleIncrement = () => isAvailable && addDish(dish.dish_id);
  const handleDecrement = () => quantity > 0 && removeDish(dish.dish_id);

  return (
    <article 
      className={`
        bg-white rounded-2xl shadow-sm border transition-all duration-300
        ${isAvailable 
          ? 'border-gray-100 hover:shadow-lg hover:border-gray-200' 
          : 'border-gray-200 opacity-75'
        }
      `}
      aria-label={`${dish.dish_name} - ${isAvailable ? 'Available' : 'Not available'}`}
    >
      <div className="md:hidden flex flex-col">
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <img
            src={dish.dish_image}
            alt={dish.dish_name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
                Currently Unavailable
              </span>
            </div>
          )}
          {isAvailable && hasCustomizations && (
            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Customizable
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`h-3 w-3 rounded-full flex-shrink-0 ${
                    isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  aria-hidden="true"
                />
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {dish.dish_name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {dish.dish_description}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div>
              <span className="font-bold text-xl text-gray-900">
                SAR {dish.dish_price}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {dish.dish_calories} cal
              </span>
            </div>
            {isAvailable && (
              <QuantitySelector
                quantity={quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                ariaLabel={`${dish.dish_name} quantity`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout: Horizontal */}
      <div className="hidden md:flex gap-5 p-5">
        <div className="relative flex-shrink-0">
          <img
            src={dish.dish_image}
            alt={dish.dish_name}
            className="h-32 w-32 rounded-xl object-cover"
            loading="lazy"
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-semibold bg-red-600 px-2 py-1 rounded">
                Unavailable
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                    isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  aria-hidden="true"
                />
                <h3 className="font-bold text-gray-900 text-lg">
                  {dish.dish_name}
                </h3>
                {hasCustomizations && isAvailable && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                    Customizable
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {dish.dish_description}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-xl text-gray-900">
                SAR {dish.dish_price}
              </span>
              <span className="text-xs text-gray-500 ml-3">
                {dish.dish_calories} calories
              </span>
            </div>
            {isAvailable && (
              <div className="flex items-center gap-3">
                <QuantitySelector
                  quantity={quantity}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  ariaLabel={`${dish.dish_name} quantity`}
                />
                {hasCustomizations && (
                  <p className="text-xs text-red-600 font-medium whitespace-nowrap">
                    Customizations available
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MenuDishCard;
