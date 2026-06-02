import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Toast from './pages/Toast';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Library from './pages/Library';
import Login from './pages/Login'; 
import Admin from './pages/Admin';
import GameDetails from './pages/GameDetails';
import { gamesMock } from './mocks/games';

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => window.localStorage.getItem('pekeys-user') || null);
  const [cart, setCart] = useState([]);
  const [purchasedKeys, setPurchasedKeys] = useState([]);
  const [toast, setToast] = useState(null);

  const [games, setGames] = useState(() => {
    const savedGames = window.localStorage.getItem('pekeys-games-v7');
    return savedGames ? JSON.parse(savedGames) : gamesMock;
  });

  useEffect(() => {
    window.localStorage.setItem('pekeys-games-v7', JSON.stringify(games));
  }, [games]);

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

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(`pekeys-cart-${currentUser}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(`pekeys-library-${currentUser}`, JSON.stringify(purchasedKeys));
    }
  }, [purchasedKeys, currentUser]);

  const handleLogin = (username) => setCurrentUser(username);
  const handleLogout = () => setCurrentUser(null);

  const addToCart = (game) => {
    setCart([...cart, game]);
    setToast({ message: game.title, imageUrl: game.imageUrl });
  };

  const removeFromCart = (indexToRemove) => setCart(cart.filter((_, index) => index !== indexToRemove));
  const clearCart = () => setCart([]);
  
  const addPurchasedKeys = (newGamesWithKeys) => {
    setPurchasedKeys([...purchasedKeys, ...newGamesWithKeys]);
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home games={games} />} />
        <Route path="/catalog" element={<Catalog games={games} onAdd={addToCart} currentUser={currentUser} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin" element={<Admin games={games} setGames={setGames} currentUser={currentUser} />} />
        <Route path="/game/:id" element={<GameDetails games={games} onAdd={addToCart} currentUser={currentUser} />} />
        <Route path="/cart" element={
          currentUser 
            ? <Cart cartItems={cart} onRemove={removeFromCart} onClear={clearCart} onCompletePurchase={addPurchasedKeys} /> 
            : <Navigate to="/login" /> 
        } />
        <Route path="/library" element={
          currentUser 
            ? <Library purchasedKeys={purchasedKeys} /> 
            : <Navigate to="/login" /> 
        } />
      </Routes>

      {toast && (
        <Toast
          message={toast.message}
          imageUrl={toast.imageUrl}
          onDone={() => setToast(null)}
        />
      )}
    </BrowserRouter>
  );
};

export default App;