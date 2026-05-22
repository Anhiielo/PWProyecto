import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      onLogin(username);
      navigate('/'); // Redirección corregida a la raíz (Inicio)
    }
  };

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Iniciar Sesión</h1>
      <p>Ingresa tu nombre de usuario para acceder a tu carrito y biblioteca.</p>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="Ej: AngeloB" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '0.75rem', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <button type="submit" style={{ padding: '0.75rem 2rem', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </main>
  );
};

export default Login;