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

// Carrega uma imagem do dispositivo (em vez de indicar um URL externo) e devolve o
// URL absoluto já pronto a usar no campo imagemUrl do produto. Usa fetch em vez do
// axios: ao definir manualmente o Content-Type, o axios não recalcula o boundary do
// multipart/form-data no browser, o que corrompe o pedido.
export async function uploadImagemProduto(ficheiro) {
  const baseURL = api.defaults.baseURL;
  const token = localStorage.getItem('loja_token');
  const form = new FormData();
  form.append('imagem', ficheiro);

  const res = await fetch(`${baseURL}/api/produtos/imagem`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  });
  if (!res.ok) {
    const texto = await res.text();
    throw new Error(texto || 'Não foi possível carregar a imagem.');
  }
  const data = await res.json();
  return `${baseURL}${data.imagemUrl}`;
}

export async function getMinhasEncomendas() {
  const { data } = await api.get('/api/encomendas/minha-loja');
  return data;
}

export async function atualizarEstadoEncomenda(id, estado) {
  await api.put(`/api/encomendas/${id}/estado`, { estado });
}
