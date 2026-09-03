import api from '../api';

// Helpers genéricos de CRUD, usados pelo painel de administração
// para qualquer tipo de conteúdo, a partir da configuração de cada recurso.

// Alguns recursos (ex: cânticos/catecismo por idioma) têm um endpoint base que já
// inclui uma query string, ex: "/api/canticos?idioma=umb". Para GET/POST isso é
// só uma URL normal, mas para PUT/DELETE (que acrescentam "/{id}") o id tem de
// entrar ANTES da query string, senão fica "/api/canticos?idioma=umb/123" (inválido).
function comId(endpointBase, id) {
  const [caminho, query] = endpointBase.split('?');
  return query ? `${caminho}/${id}?${query}` : `${caminho}/${id}`;
}

export async function listarRecurso(endpointLista) {
  const { data } = await api.get(endpointLista);
  return data;
}

export async function criarRecurso(endpointBase, payload) {
  const { data } = await api.post(endpointBase, payload);
  return data;
}

export async function atualizarRecurso(endpointBase, id, payload) {
  await api.put(comId(endpointBase, id), payload);
}

export async function eliminarRecurso(endpointBase, id) {
  await api.delete(comId(endpointBase, id));
}
