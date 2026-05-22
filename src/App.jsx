import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Library from './pages/Library';
import Login from './pages/Login'; // Importamos el login

const App = () => {
  // 1. Estado del usuario logueado
  const [currentUser, setCurrentUser] = useState(() => window.localStorage.getItem('pekeys-user') || null);
  
  const [cart, setCart] = useState([]);
  const [purchasedKeys, setPurchasedKeys] = useState([]);

  // 2. Cargar datos específicos del usuario cuando inicia sesión
  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem('pekeys-user', currentUser);
      
      const savedCart = window.localStorage.getItem(`pekeys-cart-${currentUser}`);
      const savedLibrary = window.localStorage.getItem(`pekeys-library-${currentUser}`);
      
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setPurchasedKeys(savedLibrary ? JSON.parse(savedLibrary) : []);
    } else {
      window.localStorage.removeItem('pekeys-user');
      setCart([]);
      setPurchasedKeys([]);
    }
  }, [currentUser]);

  // 3. Guardar el carrito en tiempo real, separado por usuario
  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(`pekeys-cart-${currentUser}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  // 4. Guardar la biblioteca en tiempo real, separada por usuario
  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(`pekeys-library-${currentUser}`, JSON.stringify(purchasedKeys));
    }
  }, [purchasedKeys, currentUser]);

  const handleLogin = (username) => setCurrentUser(username);
  const handleLogout = () => setCurrentUser(null);

  const addToCart = (game) => setCart([...cart, game]);
  const removeFromCart = (indexToRemove) => setCart(cart.filter((_, index) => index !== indexToRemove));
  const clearCart = () => setCart([]);
  
  const addPurchasedKeys = (newGamesWithKeys) => {
    setPurchasedKeys([...purchasedKeys, ...newGamesWithKeys]);
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {/* Pasamos currentUser al catálogo para validar compras */}
        <Route path="/catalog" element={<Catalog onAdd={addToCart} currentUser={currentUser} />} />
        
        <Route path="/cart" element={
          currentUser 
            ? <Cart cartItems={cart} onRemove={removeFromCart} onClear={clearCart} onCompletePurchase={addPurchasedKeys} /> 
            : <Navigate to="/login" /> // Protegemos la ruta
        } />
        
        <Route path="/library" element={
          currentUser 
            ? <Library purchasedKeys={purchasedKeys} /> 
            : <Navigate to="/login" /> // Protegemos la ruta
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;