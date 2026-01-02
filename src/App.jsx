import './App.css';
import { CartProvider } from './contexts/CartContext';
import MenuPage from './pages/MenuPage';


function App() {
  return (
    <CartProvider>
      <MenuPage />
    </CartProvider>
  );
}

export default App;
