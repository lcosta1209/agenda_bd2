import React, { useState, useEffect } from 'react';
import { createCompromisso, updateCompromisso } from './services/api';

const CompromissoForm = ({ compromisso, onClose, onSave }) => {
  const [form, setForm] = useState({ 
    titulo: '', 
    descricao: '', 
    data_horario: '' 
  });

  useEffect(() => {
    if (compromisso) {
      let data_horario = '';
      if (compromisso.data && compromisso.horario) {
        data_horario = `${compromisso.data}T${compromisso.horario}`;
      }
      setForm({
        titulo: compromisso.titulo,
        descricao: compromisso.descricao,
        data_horario
      });
    }
  }, [compromisso]);

  const salvar = async (e) => {
    e.preventDefault();
    let data = '', horario = '';
    if (form.data_horario) {
      const [d, h] = form.data_horario.split('T');
      data = d;
      horario = h || '';
    }
    const payload = {
      titulo: form.titulo,
      descricao: form.descricao,
      data,
      horario
    };
    try {
      if (compromisso) {
        await updateCompromisso(compromisso._id, payload);
      } else {
        await createCompromisso(payload);
      }
      onSave();
      onClose();
    } catch (error) {
      alert('Erro ao salvar');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '20px',
      border: '1px solid #ccc',
      zIndex: 1000
    }}>
      <h3>{compromisso ? 'Editar' : 'Novo'} Compromisso</h3>
      
      <form onSubmit={salvar}>
        <div>
          <label>Título:</label>
          <input 
            type="text" 
            value={form.titulo}
            onChange={e => setForm({...form, titulo: e.target.value})}
            required 
          />
        </div>
        
        <div>
          <label>Descrição:</label>
          <textarea 
            value={form.descricao}
            onChange={e => setForm({...form, descricao: e.target.value})}
          />
        </div>
        
        <div>
          <label>Data/Horário:</label>
          <input 
            type="datetime-local" 
            value={form.data_horario}
            onChange={e => setForm({...form, data_horario: e.target.value})}
            required 
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CompromissoForm;