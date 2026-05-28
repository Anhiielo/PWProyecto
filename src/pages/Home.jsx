import { Link } from 'react-router-dom';
import { gamesMock } from '../mocks/games';

const Home = () => {
  // Tomamos algunos juegos para Tendencias y otros para Ofertas
  const tendencias = gamesMock.slice(0, 4);
  const ofertas = gamesMock.slice(4, 8);

  // Función helper para obtener el color del tag según plataforma
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
    <main className="home-container">
      
      {/* 1. Hero Section: Diseño Elegante */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Encuentra tu próxima aventura</h1>
          <p>Explora nuestro catálogo de licencias digitales y obtén acceso instantáneo a los mejores títulos del mercado, sin complicaciones.</p>
          <Link to="/catalog">
            <button className="cta-button">Explorar Catálogo</button>
          </Link>
        </div>
      </header>

      {/* 2. Barra de Búsqueda Elegante */}
      <div className="home-search-bar">
        <input type="text" placeholder="Buscar juegos, tarjetas o consolas..." />
        <button>Buscar</button>
      </div>

      {/* 3. Categorías Rápidas con colores característicos */}
      <section className="categories-section">
        <h2 className="section-title">Elige tu Plataforma</h2>
        <div className="categories-grid">
          <Link to="/catalog" className="category-card platform-pc">
            <h3>PC / Steam</h3>
          </Link>
          <Link to="/catalog" className="category-card platform-ps5">
            <h3>PlayStation</h3>
          </Link>
          <Link to="/catalog" className="category-card platform-xbox">
            <h3>Xbox</h3>
          </Link>
          <Link to="/catalog" className="category-card platform-switch">
            <h3>Nintendo</h3>
          </Link>
        </div>
      </section>

      {/* 4. Tendencias Actuales (Grid de Productos) */}
      <section className="promo-section">
        <h2 className="section-title">Tendencias Actuales</h2>
        <div className="games-grid">
          {tendencias.map(game => (
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
                <Link to="/catalog" style={{ textDecoration: 'none' }}>
                  <button className="add-button btn-secondary">Ver Detalles</button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Ofertas Destacadas */}
      <section className="promo-section">
        <h2 className="section-title">Ofertas Destacadas</h2>
        <div className="games-grid">
          {ofertas.map(game => (
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
                <Link to="/catalog" style={{ textDecoration: 'none' }}>
                  <button className="add-button btn-secondary">Ver Detalles</button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Footer elegante */}
      <footer className="home-footer">
        <p>&copy; 2026 PeKeys Store. Todos los derechos reservados. Compras 100% seguras y confiables.</p>
      </footer>

    </main>
  );
};

export default Home;