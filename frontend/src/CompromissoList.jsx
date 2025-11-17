import React from 'react';
import { deleteCompromisso, removePessoa, addPessoa } from './services/api';

const CompromissoList = ({ compromissos, onEdit, onUpdate }) => {
  const excluirCompromisso = async (id) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await deleteCompromisso(id);
        onUpdate();
      } catch (error) {
        alert('Erro ao excluir');
      }
    }
  };

  const removerPessoa = async (compromissoId, email) => {
    try {
      await removePessoa(compromissoId, email);
      onUpdate();
    } catch (error) {
      alert('Erro ao remover pessoa');
    }
  };

  const adicionarPessoa = async (compromissoId, nome, email) => {
    if (!nome || !email) {
      alert('Preencha nome e email');
      return;
    }
    const compromisso = compromissos.find(c => c._id === compromissoId);
    let pessoas = Array.isArray(compromisso?.pessoas) ? [...compromisso.pessoas] : [];
    if (pessoas.some(p => p.email === email)) {
      alert('Email já adicionado');
      return;
    }
    pessoas.push({ nome, email });
    try {
      await addPessoa(compromissoId, { pessoas });
      onUpdate();
    } catch (error) {
      alert('Erro ao adicionar pessoa');
    }
  };

  return (
    <div>
      <h2>Compromissos</h2>
      {compromissos.map(comp => (
        <div key={comp._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{comp.titulo}</h3>
          <p><strong>Data:</strong> {comp.data && comp.horario ? `${comp.data} ${comp.horario}` : 'Sem data'}</p>
          <p><strong>Descrição:</strong> {comp.descricao}</p>
          
          <div>
            <strong>Pessoas:</strong>
            {comp.pessoas?.map(p => (
              <div key={p.email}>
                {p.nome} ({p.email})
                <button onClick={() => removerPessoa(comp._id, p.email)}>Remover</button>
              </div>
            ))}
            
            <div style={{ marginTop: '5px' }}>
              <input type="text" placeholder="Nome" id={`nome-${comp._id}`} />
              <input type="email" placeholder="Email" id={`email-${comp._id}`} />
              <button onClick={() => {
                const nome = document.getElementById(`nome-${comp._id}`).value;
                const email = document.getElementById(`email-${comp._id}`).value;
                adicionarPessoa(comp._id, nome, email);
              }}>Add Pessoa</button>
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <button onClick={() => onEdit(comp)}>Editar</button>
            <button onClick={() => excluirCompromisso(comp._id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompromissoList;