import { useCart } from '../hooks/useCart';
import QuantitySelector from './QuantitySelector';


const MenuDishCard = ({ dish }) => {
  const { addDish, removeDish, getQuantity } = useCart();
  const quantity = getQuantity(dish.dish_id);
  const isAvailable = dish.dish_Availability;
  const hasCustomizations = dish.addonCat?.length > 0;

  // Determine dot color: green for vegetarian, red for non-vegetarian
  // Based on the image, we'll use green for available items, red for unavailable
  // But actually, looking at the image more carefully, green dot = vegetarian, red dot = non-vegetarian
  // For now, we'll use green for available, red for unavailable as a simple heuristic
  const dotColor = isAvailable ? 'bg-green-500' : 'bg-red-500';

  const handleIncrement = () => isAvailable && addDish(dish.dish_id);
  const handleDecrement = () => quantity > 0 && removeDish(dish.dish_id);

  return (
    <article 
      className="bg-white border-b border-gray-100 py-3 px-4 md:px-6"
      aria-label={`${dish.dish_name} - ${isAvailable ? 'Available' : 'Not available'}`}
    >
      <div className="flex gap-3 items-start">
        {/* Left Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`h-2 w-2 rounded-full flex-shrink-0 ${dotColor}`}
              aria-hidden="true"
            />
            <h3 className="font-semibold text-gray-900 text-base">
              {dish.dish_name}
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-1.5 leading-relaxed">
            {dish.dish_description}
          </p>

          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-900 text-base">
              SAR {dish.dish_price}
            </span>
            <span className="text-xs text-gray-500">
              {dish.dish_calories} calories
            </span>
          </div>

          {isAvailable ? (
            <div className="flex flex-col gap-1">
              <QuantitySelector
                quantity={quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                ariaLabel={`${dish.dish_name} quantity`}
              />
              {hasCustomizations && (
                <p className="text-xs text-red-600 font-medium">
                  Customizations Available
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-red-600 font-medium">
              Not available
            </p>
          )}
        </div>

        {/* Right Image */}
        <div className="flex-shrink-0">
          <img
            src={dish.dish_image}
            alt={dish.dish_name}
            className="h-16 w-16 md:h-20 md:w-20 rounded-lg object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
};

export default MenuDishCard;
