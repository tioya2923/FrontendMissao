// Configuração central de todo o conteúdo gerível pelo painel de administração.
// Adicionar um novo tipo de conteúdo aqui é suficiente para que apareça
// automaticamente na página de Administração, com listagem, criação,
// edição e eliminação — sem precisar de escrever um ecrã novo.
//
// Cânticos e Catecismo/Orações são a exceção: em vez de um bloco fixo por
// idioma, os seus recursos são GERADOS a partir da lista de idiomas (API
// /api/idiomas) — ver gerarRecursosIdioma() mais abaixo. Criar um idioma novo
// em Administração → Idiomas faz aparecer automaticamente "Cânticos (Nome)" e
// "Catecismo (Nome)" aqui, sem precisar de tocar neste ficheiro.

import { MOEDAS, labelMoeda } from '../../constants/moeda';

export const RECURSOS = [
  // ── Apoio ──────────────────────────────────────────────────────────────
  {
    key: 'apoio',
    titulo: 'Formas de Apoio',
    grupo: 'Apoio',
    api: { base: '/api/formasapoio', list: '/api/formasapoio/admin' },
    tituloCampo: 'label',
    campos: [
      {
        nome: 'moeda', label: 'Moeda que recebe', tipo: 'select', obrigatorio: true,
        valorInicial: 'AOA',
        opcoesEstaticas: MOEDAS.map((m) => ({ valor: m.codigo, label: m.label })),
      },
      { nome: 'label', label: 'Nome (ex.: IBAN, Multicaixa Express, PIX...)', tipo: 'text', obrigatorio: true },
      { nome: 'valor', label: 'Valor (referência, IBAN, etc.)', tipo: 'text', obrigatorio: true },
      { nome: 'descricao', label: 'Descrição', tipo: 'text' },
      { nome: 'ordem', label: 'Ordem de exibição', tipo: 'number', valorInicial: 0 },
      { nome: 'ativo', label: 'Visível na aplicação', tipo: 'boolean', valorInicial: true },
    ],
    colunas: [
      { campo: 'moeda', label: 'Moeda', formatar: labelMoeda },
      { campo: 'label', label: 'Nome' },
      { campo: 'valor', label: 'Valor' },
    ],
  },

  // ── Calendário ─────────────────────────────────────────────────────────
  {
    key: 'eventos',
    titulo: 'Eventos do Calendário',
    grupo: 'Calendário',
    api: { base: '/api/calendario', list: '/api/calendario' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'data', label: 'Data', tipo: 'date', obrigatorio: true },
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      { nome: 'descricao', label: 'Descrição (cor litúrgica, ofício, missa)', tipo: 'textarea' },
      { nome: 'leituras', label: 'Leituras', tipo: 'textarea' },
      { nome: 'observacoes', label: 'Observações', tipo: 'textarea' },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'data', label: 'Data', formatar: (v) => v ? new Date(v).toLocaleDateString('pt-PT') : '—' },
    ],
  },

  // ── Idiomas ────────────────────────────────────────────────────────────
  {
    key: 'idiomas',
    titulo: 'Idiomas',
    grupo: 'Idiomas',
    api: { base: '/api/idiomas', list: '/api/idiomas' },
    tituloCampo: 'nome',
    campos: [
      { nome: 'nome', label: 'Nome (ex: Suaíli)', tipo: 'text', obrigatorio: true },
      { nome: 'codigo', label: 'Código curto (ex: swa)', tipo: 'text', obrigatorio: true },
      { nome: 'ordem', label: 'Ordem de exibição', tipo: 'number', valorInicial: 0 },
      { nome: 'ativo', label: 'Ativo (aparece na app)', tipo: 'boolean', valorInicial: true },
    ],
    colunas: [
      { campo: 'nome', label: 'Nome' },
      { campo: 'codigo', label: 'Código' },
      { campo: 'ativo', label: 'Ativo', formatar: (v) => v ? 'Sim' : 'Não' },
    ],
  },

  // ── Utilizadores da app ────────────────────────────────────────────────
  {
    key: 'utilizadores',
    titulo: 'Utilizadores',
    grupo: 'Utilizadores',
    api: { base: '/api/utilizadores', list: '/api/utilizadores' },
    tituloCampo: 'nome',
    campos: [
      { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
      { nome: 'email', label: 'Email', tipo: 'text', obrigatorio: true },
      {
        nome: 'passwordInicial', label: 'Password inicial (só ao criar; a pessoa deve alterá-la depois)',
        tipo: 'text',
      },
      { nome: 'diocese', label: 'Diocese', tipo: 'text' },
      { nome: 'paroquia', label: 'Paróquia', tipo: 'text' },
      { nome: 'nascimento', label: 'Nascimento (DD/MM/AAAA)', tipo: 'text' },
      { nome: 'baptismo', label: 'Batismo (DD/MM/AAAA)', tipo: 'text' },
      { nome: 'comunhao', label: 'Comunhão (DD/MM/AAAA)', tipo: 'text' },
      { nome: 'crisma', label: 'Crisma (DD/MM/AAAA)', tipo: 'text' },
      { nome: 'casamento', label: 'Casamento (DD/MM/AAAA)', tipo: 'text' },
      { nome: 'ordem', label: 'Ordem (DD/MM/AAAA)', tipo: 'text' },
    ],
    colunas: [
      { campo: 'nome', label: 'Nome' },
      { campo: 'email', label: 'Email' },
      { campo: 'paroquia', label: 'Paróquia' },
    ],
  },
];

// Ecrãs de administração que não seguem o CRUD genérico (fluxo próprio),
// mas que ainda assim devem aparecer no menu da Administração.
export const EXTRAS = [
  { key: 'lojas', titulo: 'Lojas parceiras', grupo: 'Marketplace', rota: '/admin/lojas' },
  { key: 'encomendas', titulo: 'Todas as encomendas', grupo: 'Marketplace', rota: '/admin/encomendas' },
  { key: 'vendas', titulo: 'Vendas das lojas', grupo: 'Marketplace', rota: '/admin/vendas' },
  { key: 'versao-app', titulo: 'Versão da App', grupo: 'Aplicação Móvel', rota: '/admin/versao-app' },
];

// ── Cânticos e Catecismo/Orações — gerados por idioma ───────────────────────
//
// Em vez de um bloco fixo por idioma, cada idioma vindo de /api/idiomas gera
// 4 recursos (Tópicos de Cânticos, Cânticos, Tópicos de Catecismo, Catecismo),
// todos apontando às tabelas genéricas do backend com ?idioma=<codigo>.

export function chaveCanticosTopicos(codigo) { return `canticos-topicos-${codigo}`; }
export function chaveCanticos(codigo) { return `canticos-${codigo}`; }
export function chaveCatecismoTopicos(codigo) { return `catecismo-topicos-${codigo}`; }
export function chaveCatecismo(codigo) { return `catecismo-${codigo}`; }

export function gerarRecursosIdioma(idioma) {
  const { codigo, nome } = idioma;
  const q = `?idioma=${codigo}`;

  const topicosCanticos = {
    key: chaveCanticosTopicos(codigo),
    titulo: 'Tópicos',
    grupo: `Cânticos (${nome})`,
    api: { base: `/api/topicos${q}`, list: `/api/topicos${q}` },
    tituloCampo: 'nome',
    campos: [
      { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
    ],
    colunas: [
      { campo: 'nome', label: 'Nome' },
      { campo: 'slug', label: 'Slug' },
    ],
  };

  const canticos = {
    key: chaveCanticos(codigo),
    titulo: 'Cânticos',
    grupo: `Cânticos (${nome})`,
    api: { base: `/api/canticos${q}`, list: `/api/canticos${q}` },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'topicoId', label: 'Tópico', tipo: 'select', obrigatorio: true,
        opcoes: { endpoint: `/api/topicos${q}`, valor: 'id', label: 'nome' },
      },
      { nome: 'letra', label: 'Letra', tipo: 'textarea', obrigatorio: true, linhas: 10 },
      { nome: 'autor', label: 'Autor (opcional)', tipo: 'text' },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'topicoId', label: 'Tópico', ref: 'topicoId' },
    ],
  };

  const topicosCatecismo = {
    key: chaveCatecismoTopicos(codigo),
    titulo: 'Tópicos e Subtópicos',
    grupo: `Catecismo (${nome})`,
    api: {
      base: `/api/catecismopttopicos/topicos${q}`,
      list: `/api/catecismopttopicos/topicos/todos${q}`,
    },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'parentId', label: 'Tópico principal (deixe vazio para ser um tópico de topo)',
        tipo: 'select', excluirProprio: true,
        opcoes: { endpoint: `/api/catecismopttopicos/topicos/todos${q}`, valor: 'id', label: 'titulo' },
      },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'parentId', label: 'Subtópico de', ref: 'parentId' },
    ],
  };

  const catecismo = {
    key: chaveCatecismo(codigo),
    titulo: 'Catecismo / Orações',
    grupo: `Catecismo (${nome})`,
    api: { base: `/api/catecismopt${q}`, list: `/api/catecismopt${q}` },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Pergunta / Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'catecismoPtTopicoId', label: 'Tópico', tipo: 'select',
        opcoes: { endpoint: `/api/catecismopttopicos/topicos/todos${q}`, valor: 'id', label: 'titulo' },
      },
      { nome: 'texto', label: 'Resposta / Texto', tipo: 'textarea', obrigatorio: true, linhas: 10 },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'catecismoPtTopicoId', label: 'Tópico', ref: 'catecismoPtTopicoId' },
    ],
  };

  return [topicosCanticos, canticos, topicosCatecismo, catecismo];
}

// Decodifica o idioma a partir de uma chave gerada (ex: "canticos-swa" → "swa"),
// para reconstruir o recurso quando se navega direto para /admin/:key.
export function decodificarIdiomaDaChave(key) {
  for (const prefixo of ['canticos-topicos-', 'canticos-', 'catecismo-topicos-', 'catecismo-']) {
    if (key.startsWith(prefixo)) return key.slice(prefixo.length);
  }
  return null;
}

export function getRecurso(key) {
  return RECURSOS.find(r => r.key === key) || null;
}

// Versão que também resolve recursos dinâmicos (cânticos/catecismo por idioma),
// dada a lista de idiomas já carregada (de /api/idiomas).
export function getRecursoComIdiomas(key, idiomas) {
  const estatico = getRecurso(key);
  if (estatico) return estatico;

  const codigo = decodificarIdiomaDaChave(key);
  if (!codigo) return null;
  const idioma = (idiomas || []).find(i => i.codigo === codigo);
  if (!idioma) return null;

  return gerarRecursosIdioma(idioma).find(r => r.key === key) || null;
}

export function getGrupos(idiomas) {
  const grupos = [];
  const todos = [...RECURSOS, ...EXTRAS];
  for (const idioma of idiomas || []) {
    todos.push(...gerarRecursosIdioma(idioma));
  }
  for (const r of todos) {
    let g = grupos.find(g => g.nome === r.grupo);
    if (!g) { g = { nome: r.grupo, itens: [] }; grupos.push(g); }
    g.itens.push(r);
  }
  return grupos;
}
