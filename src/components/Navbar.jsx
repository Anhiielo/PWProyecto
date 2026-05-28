import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, currentUser, onLogout }) => {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '16px 32px', 
      background: '#ffffff', 
      alignItems: 'center', 
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="logo">
        <Link to="/" style={{ 
          color: 'var(--primary-color)', 
          fontWeight: '700', 
          textDecoration: 'none', 
          fontSize: '24px',
          letterSpacing: '-0.5px'
        }}>PeKeys Store</Link>
      </div>
      
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/catalog" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500' }}>
          Catálogo
        </Link>
        
        {currentUser ? (
          <>
            <Link to="/library" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500' }}>
              Mis Compras
            </Link>
            <Link to="/cart" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500' }}>
              Carrito ({cartCount})
            </Link>
            <div style={{ marginLeft: '16px', borderLeft: '1px solid var(--border-color)', paddingLeft: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Hola, {currentUser}</span>
              <button onClick={onLogout} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '14px' }}>
                Salir
              </button>
            </div>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 16px' }}>
              Iniciar Sesión
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;