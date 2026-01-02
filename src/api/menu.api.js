/**
 * Menu API service
 * Handles fetching menu data with proper error handling
 */
const API_URL = 'https://zartek-task.vercel.app/api/resto-cafe';

export const fetchMenu = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data?.data?.[0]?.table_menu_list) {
      throw new Error('Invalid API response structure');
    }

    return data.data[0].table_menu_list;
  } catch (error) {
    // Re-throw with more context for better error handling
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server');
    }
    throw error;
  }
};
