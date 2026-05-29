import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gamesMock } from '../mocks/games';

const Catalog = ({ onAdd, currentUser }) => {
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const navigate = useNavigate();


  const filteredGames = gamesMock.filter(game => {
    const matchPlatform = filterPlatform === 'all' || game.platform === filterPlatform;
    const matchMin = minPrice === '' || game.price >= parseFloat(minPrice);
    const matchMax = maxPrice === '' || game.price <= parseFloat(maxPrice);
    return matchPlatform && matchMin && matchMax;
  });

  const handleAddToCart = (game) => {
    if (!currentUser) {
      alert("Por favor, inicia sesión para agregar juegos a tu carrito.");
      navigate('/login');
    } else {
      onAdd(game);
    }
  };

  const getPlatformClass = (platform) => {
    switch (platform) {
      case 'PC': return 'tag-pc';
      case 'PS5': return 'tag-ps5';
      case 'Xbox': return 'tag-xbox';
      case 'Switch': return 'tag-switch';
      default: return '';
    }
  };

  return (
    <main className="catalog-container" style={{ padding: '40px 20px' }}>
      <h1 className="section-title">Catálogo de Juegos</h1>
      
      <div className="catalog-layout" style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
        
        {/* PANEL DE FILTROS ELEGANTE */}
        <aside className="filters-panel" style={{ flex: 1, background: 'var(--surface-color)', padding: '24px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginTop: 0, fontWeight: 600 }}>Filtros</h3>
          
          <div className="filter-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Plataforma</label>
            <select 
              value={filterPlatform} 
              onChange={(e) => setFilterPlatform(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box' }}
            >
              <option value="all">Todas</option>
              <option value="PC">PC / Steam</option>
              <option value="PS5">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="Switch">Nintendo Switch</option>
            </select>
          </div>

          <div className="filter-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Precio Mínimo (S/)</label>
            <input 
              type="number" 
              placeholder="Ej: 50" 
              value={minPrice} 
              onChange={(e) => setMinPrice(e.target.value)} 
              min="0"
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          <div className="filter-group" style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Precio Máximo (S/)</label>
            <input 
              type="number" 
              placeholder="Ej: 200" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(e.target.value)} 
              min="0"
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          
          <button 
            className="clear-filters btn-secondary"
            onClick={() => {
              setFilterPlatform('all');
              setMinPrice('');
              setMaxPrice('');
            }}
            style={{ width: '100%' }}
          >
            Limpiar Filtros
          </button>
        </aside>


        <section className="games-grid" style={{ flex: 3 }}>
          {filteredGames.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', background: 'var(--surface-color)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
              <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>No se encontraron juegos con esos filtros.</p>
            </div>
          ) : (
            filteredGames.map((game) => (
              <article key={game.id} className="game-card-simple">
                <div className="game-card-img-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div className="game-card-info">
                  <p className="game-card-title">{game.title}</p>
                  <span className={`game-card-platform ${getPlatformClass(game.platform)}`}>{game.platform}</span>
                  <p className="game-card-price">S/ {game.price.toFixed(2)}</p>
                </div>
                <div style={{ padding: '0 20px 20px 20px' }}>
                  <button className="add-button" onClick={() => handleAddToCart(game)}>
                    Añadir al carrito
                  </button>
                </div>
              </article>
            ))
          )}
        </section>

      </div>
    </main>
  );
};

export default Catalog;