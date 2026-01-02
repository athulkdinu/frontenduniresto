import { useEffect, useRef } from 'react';


const MenuCategoryTabs = ({ categories, activeCategoryIndex, onCategoryChange }) => {
  const tabRefs = useRef({});
  const containerRef = useRef(null);

  
  useEffect(() => {
    const activeTab = tabRefs.current[activeCategoryIndex];
    if (activeTab && containerRef.current) {
      const container = containerRef.current;
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;

      if (tabLeft < scrollLeft || tabLeft + tabWidth > scrollLeft + containerWidth) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeCategoryIndex]);

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      onCategoryChange(index - 1);
      tabRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < categories.length - 1) {
      e.preventDefault();
      onCategoryChange(index + 1);
      tabRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="bg-white border-b border-gray-200 overflow-x-auto hide-scrollbar sticky top-[73px] md:top-[81px] z-10"
      role="tablist"
      aria-label="Menu categories"
    >
      <div className="flex gap-6 md:gap-8 px-4 md:px-6 py-0 min-w-max">
        {categories.map((category, index) => {
          const isActive = activeCategoryIndex === index;
          
          return (
            <button
              key={category.menu_category_id}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => onCategoryChange(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`category-${category.menu_category_id}-panel`}
              id={`category-${category.menu_category_id}-tab`}
              className={`
                pb-4 px-2 whitespace-nowrap font-semibold transition-all duration-200
                relative focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-t
                ${isActive 
                  ? 'text-red-600' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              {category.menu_category}
              {isActive && (
                <span 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuCategoryTabs;
