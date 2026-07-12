import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegistering) {
        await register(username, email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || (isRegistering ? 'Error al registrar.' : 'Credenciales incorrectas.'));
    } finally {
      setLoading(false);
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
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
            {isRegistering ? 'Crea una cuenta' : 'Bienvenido de nuevo'}
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '15px' }}>
            {isRegistering
              ? 'Regístrate para empezar a comprar y guardar tus juegos.'
              : 'Inicia sesión para acceder a tu biblioteca y carrito.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isRegistering && (
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>
                Nombre de Usuario
              </label>
              <input
                type="text"
                placeholder="Tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
                disabled={loading}
              />
            </div>
          )}

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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fca5a5',
              color: '#991b1b', borderRadius: '6px',
              padding: '10px 14px', fontSize: '14px', textAlign: 'left',
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: '10px', width: '100%', padding: '12px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '⏳ Procesando...' : (isRegistering ? 'Registrarse' : 'Iniciar Sesión')}
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          {isRegistering ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
          <button 
            type="button" 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold', padding: 0 }}
          >
            {isRegistering ? 'Inicia sesión aquí' : 'Regístrate aquí'}
          </button>
        </div>

        <div style={{ marginTop: '20px', padding: '12px', background: '#f8fafc', borderRadius: '6px', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'left' }}>
          <strong>Usuarios de prueba:</strong><br />
          🔑 admin@pekeys.com / admin123 (admin)<br />
          🔑 usuario1@pekeys.com / pass123 (usuario)
        </div>
      </div>
    </main>
  );
};

export default Login;