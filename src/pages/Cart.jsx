import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, onRemove, onClear, onCompletePurchase }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [newKeys, setNewKeys] = useState([]);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Generamos las keys para cada juego comprado en esta sesión
      const itemsWithKeys = cartItems.map(item => {
        const randomKey = Math.random().toString(36).substring(2, 10).toUpperCase();
        return {
          ...item,
          keyGenerated: `${randomKey.slice(0, 4)}-${randomKey.slice(4, 8)}`,
          purchaseDate: new Date().toLocaleDateString()
        };
      });

      setNewKeys(itemsWithKeys);
      onCompletePurchase(itemsWithKeys); // Envía los datos a App.jsx para guardarlos en localStorage
      onClear(); 
      setIsProcessing(false);
      setPurchaseComplete(true);
    }, 2000);
  };

  if (purchaseComplete) {
    return (
      <main style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ color: 'green' }}>¡Compra Procesada con Éxito!</h1>
        <p>Tus licencias han sido enviadas a tu <strong>Biblioteca</strong> de manera segura.</p>
        
        <div style={{ margin: '2rem auto', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {newKeys.map((item, index) => (
            <div key={index} style={{ border: '1px dashed #333', padding: '1rem', background: '#f9f9f9' }}>
              <h4>{item.title} ({item.platform})</h4>
              <p style={{ background: '#333', color: '#fff', padding: '0.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                {item.keyGenerated}
              </p>
            </div>
          ))}
        </div>

        <Link to="/library">
          <button style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>Ir a mi Biblioteca</button>
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Mi Carrito</h1>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <section style={{ flex: 2 }}>
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cartItems.map((item, index) => (
                <li key={index} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.platform}</p>
                  </div>
                  <button onClick={() => onRemove(index)}>Eliminar</button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside style={{ flex: 1, background: '#f5f5f5', padding: '1rem', height: 'fit-content' }}>
          <h3>Resumen</h3>
          <h2>Total: S/ {total.toFixed(2)}</h2>
          <button 
            onClick={handleCheckout} 
            disabled={cartItems.length === 0 || isProcessing}
            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
          >
            {isProcessing ? 'Verificando transacción...' : 'Proceder al Pago'}
          </button>
        </aside>
      </div>
    </main>
  );
};

export default Cart;