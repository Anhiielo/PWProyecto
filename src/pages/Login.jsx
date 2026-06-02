import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      const username = email.split('@')[0];
      onLogin(username); 
      navigate('/'); 
    }
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{
        background: 'var(--surface-color)',
        padding: '40px',
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Bienvenido de nuevo</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '15px' }}>
            Inicia sesión para acceder a tu biblioteca y carrito. Para el panel admin, ingresa como <strong>admin@pekeys.com</strong>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>
              Correo Electrónico
            </label>
            <input 
              type="email" 
              placeholder="ejemplo@correo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
          </div>

          <button type="submit" style={{ marginTop: '10px', width: '100%', padding: '12px', cursor: 'pointer' }}>
            Iniciar Sesión
          </button>
        </form>

        <p style={{ marginTop: '25px', fontSize: '14px', color: 'var(--text-muted)' }}>
          ¿No tienes una cuenta? <a href="#" style={{ fontWeight: '500' }}>Regístrate aquí</a>
        </p>
      </div>
    </main>
  );
};

export default Login;