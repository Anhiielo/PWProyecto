import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="home-container">
      
      {/* 1. Hero Section: El banner principal que recibe al usuario */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Desbloquea tu próxima aventura en PeKeys</h1>
          <p>Licencias digitales y juegos al instante. Sin esperas, directo a tu biblioteca.</p>
          <Link to="/catalog">
            <button className="cta-button">Explorar Catálogo</button>
          </Link>
        </div>
      </header>

      {/* 2. Sección de Promociones o Destacados */}
      <section className="promo-section">
        <div className="promo-banner">
          <h2>🔥 Ofertas de la Semana</h2>
          <p>Consigue recargas y monedas virtuales para Genshin Impact o Roblox con 15% de descuento.</p>
          <button className="secondary-button">Ver Ofertas</button>
        </div>
      </section>

      {/* 3. Categorías Rápidas */}
      <section className="categories-section">
        <h2>Elige tu Plataforma</h2>
        <div className="categories-grid">
          <div className="category-card">
            <h3>PC / Steam</h3>
          </div>
          <div className="category-card">
            <h3>PlayStation</h3>
          </div>
          <div className="category-card">
            <h3>Xbox</h3>
          </div>
          <div className="category-card">
            <h3>Móviles</h3>
          </div>
        </div>
      </section>

      {/* 4. Footer básico para cerrar la página */}
      <footer className="home-footer">
        <p>© 2026 PeKeys - Distribución Digital</p>
      </footer>

    </main>
  );
};

export default Home;