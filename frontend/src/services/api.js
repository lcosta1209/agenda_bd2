import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getCompromissos = () => api.get('/compromissos').then(res => res.data);
export const createCompromisso = (data) => api.post('/compromissos', data).then(res => res.data);
export const updateCompromisso = (id, data) => api.put(`/compromissos/${id}`, data).then(res => res.data);
export const deleteCompromisso = (id) => api.delete(`/compromissos/${id}`).then(res => res.data);
export const addPessoa = (id, pessoa) => api.patch(`/compromissos/${id}/pessoas`, pessoa).then(res => res.data);
export const removePessoa = (id, email) => api.delete(`/compromissos/${id}/pessoas/${email}`).then(res => res.data);