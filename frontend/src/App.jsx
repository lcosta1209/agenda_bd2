import React, { useState, useEffect } from 'react';
import { getCompromissos } from './services/api';
import CompromissoList from './CompromissoList';
import CompromissoForm from './CompromissoForm';

function App() {
  const [compromissos, setCompromissos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarCompromissos();
  }, []);

  const carregarCompromissos = async () => {
    try {
      const data = await getCompromissos();
      setCompromissos(data);
    } catch (error) {
      alert('Erro ao carregar compromissos');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Agenda</h1>
      
      <button onClick={() => setShowForm(true)}>
        + Novo Compromisso
      </button>

      <CompromissoList 
        compromissos={compromissos}
        onEdit={(comp) => {
          setEditando(comp);
          setShowForm(true);
        }}
        onUpdate={carregarCompromissos}
      />

      {showForm && (
        <CompromissoForm 
          compromisso={editando}
          onClose={() => {
            setShowForm(false);
            setEditando(null);
          }}
          onSave={carregarCompromissos}
        />
      )}
    </div>
  );
}

export default App;