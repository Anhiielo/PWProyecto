import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Admin = ({ games, setGames, currentUser }) => {
  const [newGame, setNewGame] = useState({ title: '', platform: 'PC', price: '', description: '', imageUrl: '' });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', platform: 'PC', price: '', description: '', imageUrl: '' });

  if (currentUser !== 'admin') {
    return <Navigate to="/" />;
  }

  const handleAddGame = (e) => {
    e.preventDefault();
    if (!newGame.title || !newGame.price) return;

    const gameToAdd = {
      id: Date.now(),
      title: newGame.title,
      platform: newGame.platform,
      price: parseFloat(newGame.price),
      description: newGame.description || 'Sin descripción',
      imageUrl: newGame.imageUrl || `https://placehold.co/600x900/1e293b/ffffff?text=${encodeURIComponent(newGame.title)}`
    };

    setGames([gameToAdd, ...games]);
    setNewGame({ title: '', platform: 'PC', price: '', description: '', imageUrl: '' });
  };

  const handleDeleteGame = (idToRemove) => {
    setGames(games.filter(game => game.id !== idToRemove));
  };

  const handleEditClick = (game) => {
    setEditingId(game.id);
    setEditFormData({ 
      title: game.title, 
      platform: game.platform, 
      price: game.price,
      description: game.description || '',
      imageUrl: game.imageUrl || ''
    });
  };

  const handleSaveEdit = (idToSave) => {
    const updatedGames = games.map(game => {
      if (game.id === idToSave) {
        return {
          ...game,
          title: editFormData.title,
          platform: editFormData.platform,
          price: parseFloat(editFormData.price),
          description: editFormData.description,
          imageUrl: editFormData.imageUrl || game.imageUrl
        };
      }
      return game;
    });

    setGames(updatedGames);
    setEditingId(null);
  };

  return (
    <main style={{ padding: '40px 20px' }}>
      <h1>Panel de Administrador</h1>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* AGREGAR */}
        <section style={{ flex: 1, minWidth: '350px', background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <h3>Subir Nuevo Juego</h3>
          <form onSubmit={handleAddGame} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            <div><label>Título</label><input type="text" value={newGame.title} onChange={(e) => setNewGame({...newGame, title: e.target.value})} style={{ width: '100%', boxSizing: 'border-box' }} required /></div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}><label>Plataforma</label><select value={newGame.platform} onChange={(e) => setNewGame({...newGame, platform: e.target.value})} style={{ width: '100%' }}><option value="PC">PC</option><option value="PS5">PS5</option><option value="Xbox">Xbox</option><option value="Switch">Switch</option></select></div>
              <div style={{ flex: 1 }}><label>Precio (S/)</label><input type="number" step="0.01" value={newGame.price} onChange={(e) => setNewGame({...newGame, price: e.target.value})} style={{ width: '100%', boxSizing: 'border-box' }} required /></div>
            </div>
            <div><label>Link de Imagen (URL)</label><input type="url" value={newGame.imageUrl} onChange={(e) => setNewGame({...newGame, imageUrl: e.target.value})} style={{ width: '100%', boxSizing: 'border-box' }} placeholder="https://..." /></div>
            <div><label>Descripción</label><textarea value={newGame.description} onChange={(e) => setNewGame({...newGame, description: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', minHeight: '80px', padding: '10px' }} /></div>
            <button type="submit">Agregar al Catálogo</button>
          </form>
        </section>

        {/* LISTA / EDITAR */}
        <section style={{ flex: 2, minWidth: '300px' }}>
          <h3>Juegos Activos ({games.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            {games.map(game => (
              <div key={game.id}>
                {editingId === game.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc', padding: '15px', borderRadius: 'var(--border-radius)', border: '2px solid var(--primary-color)' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="text" value={editFormData.title} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} style={{ flex: 2 }} />
                      <input type="number" step="0.01" value={editFormData.price} onChange={(e) => setEditFormData({...editFormData, price: e.target.value})} style={{ width: '100px' }} />
                    </div>
                    <input type="url" placeholder="URL de la imagen" value={editFormData.imageUrl} onChange={(e) => setEditFormData({...editFormData, imageUrl: e.target.value})} style={{ width: '100%', boxSizing: 'border-box' }} />
                    <textarea placeholder="Descripción" value={editFormData.description} onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', minHeight: '60px' }} />
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button onClick={() => setEditingId(null)} style={{ background: 'var(--text-muted)' }}>Cancelar</button>
                      <button onClick={() => handleSaveEdit(game.id)} style={{ background: '#10b981' }}>Guardar</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-color)', padding: '15px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{game.title}</h4>
                      <span style={{ fontSize: '12px', background: '#eee', padding: '2px 6px', borderRadius: '4px', marginRight: '10px' }}>{game.platform}</span>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>S/ {game.price.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => handleEditClick(game)} style={{ background: '#3b82f6', padding: '6px 12px', fontSize: '13px', color: 'white', border: 'none', borderRadius: '4px' }}>Editar</button>
                      <button onClick={() => handleDeleteGame(game.id)} style={{ background: '#ef4444', padding: '6px 12px', fontSize: '13px', color: 'white', border: 'none', borderRadius: '4px' }}>Eliminar</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Admin;