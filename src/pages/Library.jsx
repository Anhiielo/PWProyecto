const Library = ({ purchasedKeys }) => {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Mi Biblioteca de Juegos</h1>
        <p>Aquí se guardan de forma permanente todas tus licencias digitales adquiridas:</p>
        
        {purchasedKeys.length === 0 ? (
          <p style={{ marginTop: '2rem', color: '#666' }}>Aún no has adquirido ningún código de activación.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
            {purchasedKeys.map((item, index) => (
              <article key={index} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '6px', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>{item.title}</h3>
                  <span style={{ fontSize: '0.85rem', background: '#007acc', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    {item.platform}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>Adquirido el: {item.purchaseDate}</p>
                
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '0.25rem' }}>Código de Activación:</label>
                  <code style={{ display: 'block', background: '#222', color: '#00ff00', padding: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center', borderRadius: '4px' }}>
                    {item.keyGenerated}
                  </code>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    );
  };
  
  export default Library;