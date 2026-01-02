import { createContext, useContext, useState, useMemo } from 'react';


const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  //total count calculation
  const totalCount = useMemo(
    () => Object.values(cartItems).reduce((sum, qty) => sum + qty, 0),
    [cartItems]
  );

  const addDish = (dishId) => {
    setCartItems((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
  };

  const removeDish = (dishId) => {
    setCartItems((prev) => {
      const qty = prev[dishId] || 0;
      if (qty <= 1) {
        const { [dishId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [dishId]: qty - 1 };
    });
  };

  const getQuantity = (dishId) => cartItems[dishId] || 0;

  const value = {
    cartItems,
    totalCount,
    addDish,
    removeDish,
    getQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export { useCartContext };

