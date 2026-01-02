import MenuDishCard from './MenuDishCard';


const MenuDishList = ({ dishes, categoryId }) => {
  if (!dishes || dishes.length === 0) {
    return (
      <div 
        className="p-6 md:p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-gray-500 text-lg">No dishes available in this category.</p>
      </div>
    );
  }

  return (
    <section 
      className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5 max-w-6xl mx-auto"
      id={`category-${categoryId}-panel`}
      role="tabpanel"
      aria-labelledby={`category-${categoryId}-tab`}
    >
      {dishes.map((dish) => (
        <MenuDishCard key={dish.dish_id} dish={dish} />
      ))}
    </section>
  );
};

export default MenuDishList;
