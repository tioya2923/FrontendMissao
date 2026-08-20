import api from '../api';

export async function getPerfilProprio() {
  const { data } = await api.get('/api/lojas/eu');
  return data;
}

export async function atualizarPerfilProprio(payload) {
  await api.put('/api/lojas/eu', payload);
}

export async function pausarOuReativar(ativa) {
  await api.put('/api/lojas/eu/pausar', ativa);
}

export async function getMeusProdutos() {
  const { data } = await api.get('/api/produtos/minha');
  return data;
}

export async function criarProduto(payload) {
  const { data } = await api.post('/api/produtos', payload);
  return data;
}

export async function atualizarProduto(id, payload) {
  await api.put(`/api/produtos/${id}`, payload);
}

export async function eliminarProduto(id) {
  await api.delete(`/api/produtos/${id}`);
}

export async function getMinhasEncomendas() {
  const { data } = await api.get('/api/encomendas/minha-loja');
  return data;
}

export async function atualizarEstadoEncomenda(id, estado) {
  await api.put(`/api/encomendas/${id}/estado`, { estado });
}
