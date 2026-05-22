import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, currentUser, onLogout }) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#222', color: '#fff', alignItems: 'center' }}>
      <div className="logo">
        <Link to="/" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem' }}>PeKeys</Link>
      </div>
      
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/catalog" style={{ color: '#fff', textDecoration: 'none' }}>Catálogo</Link>
        
        {currentUser ? (
          <>
            <Link to="/library" style={{ color: '#00ff00', textDecoration: 'none', fontWeight: 'bold' }}>Mis Compras</Link>
            <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Carrito ({cartCount})</Link>
            <div style={{ marginLeft: '1rem', borderLeft: '1px solid #555', paddingLeft: '1rem' }}>
              <span style={{ marginRight: '1rem', color: '#aaa' }}>Hola, {currentUser}</span>
              <button onClick={onLogout} style={{ background: 'transparent', color: '#ff4444', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                Salir
              </button>
            </div>
          </>
        ) : (
          <Link to="/login" style={{ background: '#007acc', color: '#fff', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;