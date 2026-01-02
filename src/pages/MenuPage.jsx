import { useEffect, useState } from 'react';
import { fetchMenu } from '../api/menu.api';
import AppHeader from '../components/AppHeader';
import MenuCategoryTabs from '../components/MenuCategoryTabs';
import MenuDishList from '../components/MenuDishList';

/**
 * Main menu page with error handling and loading states.
 * Production-ready implementation with proper error boundaries.
 */
const MenuPage = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadMenuData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMenu();
        
        if (isMounted) {
          setMenuCategories(data);
          // Reset to first category if current selection is invalid
          if (data.length > 0 && selectedCategoryIndex >= data.length) {
            setSelectedCategoryIndex(0);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load menu. Please check your connection and try again.');
          console.error('Menu fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMenuData();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentCategory = menuCategories[selectedCategoryIndex];
  const currentDishes = currentCategory?.category_dishes || [];

  // Loading state
  if (isLoading) {
    return (
      <div 
        className="min-h-screen bg-white flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-600 mx-auto mb-4"
            aria-hidden="true"
          />
          <p className="text-gray-600 font-medium">Loading menu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader />
        <div className="flex items-center justify-center min-h-[60vh] p-6">
          <div className="text-center max-w-md">
            <div className="text-red-600 text-5xl mb-4" aria-hidden="true">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Retry loading menu"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!menuCategories.length) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-600 text-lg">No menu categories available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      
      <MenuCategoryTabs
        categories={menuCategories}
        activeCategoryIndex={selectedCategoryIndex}
        onCategoryChange={setSelectedCategoryIndex}
      />

      <MenuDishList 
        dishes={currentDishes} 
        categoryId={currentCategory?.menu_category_id}
      />
    </div>
  );
};

export default MenuPage;
