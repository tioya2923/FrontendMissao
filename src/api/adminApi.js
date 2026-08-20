import api from '../api';

// Helpers genéricos de CRUD, usados pelo painel de administração
// para qualquer tipo de conteúdo, a partir da configuração de cada recurso.

export async function listarRecurso(endpointLista) {
  const { data } = await api.get(endpointLista);
  return data;
}

export async function criarRecurso(endpointBase, payload) {
  const { data } = await api.post(endpointBase, payload);
  return data;
}

export async function atualizarRecurso(endpointBase, id, payload) {
  await api.put(`${endpointBase}/${id}`, payload);
}

export async function eliminarRecurso(endpointBase, id) {
  await api.delete(`${endpointBase}/${id}`);
}
