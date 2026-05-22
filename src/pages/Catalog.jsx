import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gamesMock } from '../mocks/games';

const Catalog = ({ onAdd, currentUser }) => {
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const navigate = useNavigate();

  // Lógica de filtrado combinado
  const filteredGames = gamesMock.filter(game => {
    const matchPlatform = filterPlatform === 'all' || game.platform === filterPlatform;
    const matchMin = minPrice === '' || game.price >= parseFloat(minPrice);
    const matchMax = maxPrice === '' || game.price <= parseFloat(maxPrice);
    return matchPlatform && matchMin && matchMax;
  });

  const handleAddToCart = (game) => {
    if (!currentUser) {
      alert("Debes iniciar sesión primero para agregar juegos a tu carrito.");
      navigate('/login');
    } else {
      onAdd(game);
    }
  };

  return (
    <main className="catalog-container" style={{ padding: '2rem' }}>
      <h1>Catálogo de Juegos</h1>
      
      <div className="catalog-layout" style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        
        {/* PANEL DE FILTROS RESTAURADO */}
        <aside className="filters-panel" style={{ flex: 1, background: '#f5f5f5', padding: '1rem', borderRadius: '4px', height: 'fit-content' }}>
          <h3>Filtros</h3>
          
          <div className="filter-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Plataforma:</label>
            <select 
              value={filterPlatform} 
              onChange={(e) => setFilterPlatform(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="all">Todas</option>
              <option value="PC">PC / Steam</option>
              <option value="PS5">PlayStation 5</option>
              <option value="Switch">Nintendo Switch</option>
            </select>
          </div>

          <div className="filter-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Precio Mínimo (S/):</label>
            <input 
              type="number" 
              placeholder="Ej: 50" 
              value={minPrice} 
              onChange={(e) => setMinPrice(e.target.value)} 
              min="0"
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            />
          </div>

          <div className="filter-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Precio Máximo (S/):</label>
            <input 
              type="number" 
              placeholder="Ej: 200" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(e.target.value)} 
              min="0"
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            />
          </div>
          
          <button 
            className="clear-filters"
            onClick={() => {
              setFilterPlatform('all');
              setMinPrice('');
              setMaxPrice('');
            }}
            style={{ width: '100%', padding: '0.5rem', cursor: 'pointer' }}
          >
            Limpiar Filtros
          </button>
        </aside>

        {/* CUADRÍCULA DE JUEGOS */}
        <section className="games-grid" style={{ flex: 3, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {filteredGames.length === 0 ? (
            <p>No se encontraron juegos con esos filtros.</p>
          ) : (
            filteredGames.map((game) => (
              <article key={game.id} className="game-card" style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                <div className="game-info">
                  <h3>{game.title}</h3>
                  <span className="platform-tag" style={{ background: '#eee', padding: '0.2rem 0.5rem', marginRight: '0.5rem', fontSize: '0.85rem' }}>{game.platform}</span>
                  <span className="category-tag" style={{ background: '#eee', padding: '0.2rem 0.5rem', fontSize: '0.85rem' }}>{game.category}</span>
                  <p className="price" style={{ fontWeight: 'bold', margin: '1rem 0' }}>S/ {game.price.toFixed(2)}</p>
                </div>
                <button className="add-button" onClick={() => handleAddToCart(game)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                  Añadir al carrito
                </button>
              </article>
            ))
          )}
        </section>

      </div>
    </main>
  );
};

export default Catalog;