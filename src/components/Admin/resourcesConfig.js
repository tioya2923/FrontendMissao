// Configuração central de todo o conteúdo gerível pelo painel de administração.
// Adicionar um novo tipo de conteúdo aqui é suficiente para que apareça
// automaticamente na página de Administração, com listagem, criação,
// edição e eliminação — sem precisar de escrever um ecrã novo.

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

  // ── Cânticos — Português ───────────────────────────────────────────────
  {
    key: 'canticos-pt-topicos',
    titulo: 'Tópicos',
    grupo: 'Cânticos (Português)',
    api: { base: '/api/topicos', list: '/api/topicos' },
    tituloCampo: 'nome',
    campos: [
      { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
    ],
    colunas: [
      { campo: 'nome', label: 'Nome' },
      { campo: 'slug', label: 'Slug' },
    ],
  },
  {
    key: 'canticos-pt',
    titulo: 'Cânticos',
    grupo: 'Cânticos (Português)',
    api: { base: '/api/canticos', list: '/api/canticos' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'topicoId', label: 'Tópico', tipo: 'select', obrigatorio: true,
        opcoes: { endpoint: '/api/topicos', valor: 'id', label: 'nome' },
      },
      { nome: 'letra', label: 'Letra', tipo: 'textarea', obrigatorio: true, linhas: 10 },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'topicoId', label: 'Tópico', ref: 'topicoId' },
    ],
  },

  // ── Cânticos — Umbundu ─────────────────────────────────────────────────
  {
    key: 'canticos-umb-topicos',
    titulo: 'Tópicos',
    grupo: 'Cânticos (Umbundu)',
    api: { base: '/api/umbundu/topicos', list: '/api/umbundu/topicos' },
    tituloCampo: 'nome',
    campos: [
      { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
    ],
    colunas: [
      { campo: 'nome', label: 'Nome' },
      { campo: 'slug', label: 'Slug' },
    ],
  },
  {
    key: 'canticos-umb',
    titulo: 'Cânticos',
    grupo: 'Cânticos (Umbundu)',
    api: { base: '/api/umbundu/canticos', list: '/api/umbundu/canticos/canticos-com-topico' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'topicoId', label: 'Tópico', tipo: 'select', obrigatorio: true,
        opcoes: { endpoint: '/api/umbundu/topicos', valor: 'id', label: 'nome' },
      },
      { nome: 'letra', label: 'Letra', tipo: 'textarea', obrigatorio: true, linhas: 10 },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'topicoId', label: 'Tópico', ref: 'topicoId' },
    ],
  },

  // ── Cânticos — Latim ───────────────────────────────────────────────────
  {
    key: 'canticos-lat-topicos',
    titulo: 'Tópicos',
    grupo: 'Cânticos (Latim)',
    api: { base: '/api/topicoslat', list: '/api/topicoslat' },
    tituloCampo: 'nome',
    campos: [
      { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
    ],
    colunas: [
      { campo: 'nome', label: 'Nome' },
      { campo: 'slug', label: 'Slug' },
    ],
  },
  {
    key: 'canticos-lat',
    titulo: 'Cânticos',
    grupo: 'Cânticos (Latim)',
    api: { base: '/api/canticoslat', list: '/api/canticoslat' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'topicoId', label: 'Tópico', tipo: 'select', obrigatorio: true,
        opcoes: { endpoint: '/api/topicoslat', valor: 'id', label: 'nome' },
      },
      { nome: 'letra', label: 'Letra', tipo: 'textarea', obrigatorio: true, linhas: 10 },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'topicoId', label: 'Tópico', ref: 'topicoId' },
    ],
  },

  // ── Cânticos — Kimbundu ────────────────────────────────────────────────
  {
    key: 'canticos-kmb-topicos',
    titulo: 'Tópicos',
    grupo: 'Cânticos (Kimbundu)',
    api: { base: '/api/kimbundu/topicos', list: '/api/kimbundu/topicos' },
    tituloCampo: 'nome',
    campos: [
      { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
    ],
    colunas: [
      { campo: 'nome', label: 'Nome' },
      { campo: 'slug', label: 'Slug' },
    ],
  },
  {
    key: 'canticos-kmb',
    titulo: 'Cânticos',
    grupo: 'Cânticos (Kimbundu)',
    api: { base: '/api/kimbundu/canticos', list: '/api/kimbundu/canticos/canticos-com-topico' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'topicoId', label: 'Tópico', tipo: 'select', obrigatorio: true,
        opcoes: { endpoint: '/api/kimbundu/topicos', valor: 'id', label: 'nome' },
      },
      { nome: 'letra', label: 'Letra', tipo: 'textarea', obrigatorio: true, linhas: 10 },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'topicoId', label: 'Tópico', ref: 'topicoId' },
    ],
  },

  // ── Catecismo — Português ──────────────────────────────────────────────
  {
    key: 'catecismo-pt-topicos',
    titulo: 'Tópicos e Subtópicos',
    grupo: 'Catecismo (Português)',
    api: {
      base: '/api/catecismopttopicos/topicos',
      list: '/api/catecismopttopicos/topicos/todos',
    },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'parentId', label: 'Tópico principal (deixe vazio para ser um tópico de topo)',
        tipo: 'select', excluirProprio: true,
        opcoes: { endpoint: '/api/catecismopttopicos/topicos/todos', valor: 'id', label: 'titulo' },
      },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'parentId', label: 'Subtópico de', ref: 'parentId' },
    ],
  },
  {
    key: 'catecismo-pt',
    titulo: 'Perguntas e Respostas',
    grupo: 'Catecismo (Português)',
    api: { base: '/api/catecismopt', list: '/api/catecismopt' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Pergunta / Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'catecismoPtTopicoId', label: 'Tópico', tipo: 'select',
        opcoes: { endpoint: '/api/catecismopttopicos/topicos/todos', valor: 'id', label: 'titulo' },
      },
      { nome: 'texto', label: 'Resposta / Texto', tipo: 'textarea', obrigatorio: true, linhas: 10 },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'catecismoPtTopicoId', label: 'Tópico', ref: 'catecismoPtTopicoId' },
    ],
  },

  // ── Catecismo — Umbundu ────────────────────────────────────────────────
  {
    key: 'catecismo-ub-topicos',
    titulo: 'Tópicos',
    grupo: 'Catecismo (Umbundu)',
    api: { base: '/api/catecismoubtopicos', list: '/api/catecismoubtopicos' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'slug', label: 'Slug' },
    ],
  },
  {
    key: 'catecismo-ub',
    titulo: 'Perguntas e Respostas',
    grupo: 'Catecismo (Umbundu)',
    api: { base: '/api/catecismoub', list: '/api/catecismoub' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Pergunta / Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'catecismoUbTopicoId', label: 'Tópico', tipo: 'select', obrigatorio: true,
        opcoes: { endpoint: '/api/catecismoubtopicos', valor: 'id', label: 'titulo' },
      },
      { nome: 'texto', label: 'Resposta / Texto', tipo: 'textarea', obrigatorio: true, linhas: 10 },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'catecismoUbTopicoId', label: 'Tópico', ref: 'catecismoUbTopicoId' },
    ],
  },

  // ── Catecismo — Latim ──────────────────────────────────────────────────
  {
    key: 'catecismo-lat-topicos',
    titulo: 'Tópicos',
    grupo: 'Catecismo (Latim)',
    api: { base: '/api/catecismolattopicos', list: '/api/catecismolattopicos' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'slug', label: 'Slug' },
    ],
  },
  {
    key: 'catecismo-lat',
    titulo: 'Textos',
    grupo: 'Catecismo (Latim)',
    api: { base: '/api/catecismolat', list: '/api/catecismolat' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      { nome: 'slug', label: 'Slug (opcional)', tipo: 'text' },
      {
        nome: 'catecismoLatTopicoId', label: 'Tópico', tipo: 'select', obrigatorio: true,
        opcoes: { endpoint: '/api/catecismolattopicos', valor: 'id', label: 'titulo' },
      },
      { nome: 'texto', label: 'Texto', tipo: 'textarea', obrigatorio: true, linhas: 10 },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'catecismoLatTopicoId', label: 'Tópico', ref: 'catecismoLatTopicoId' },
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

  // ── Catecismo — Otchikwama ─────────────────────────────────────────────
  {
    key: 'catecismo-otc-topicos',
    titulo: 'Tópicos',
    grupo: 'Catecismo (Otchikwama)',
    api: { base: '/api/CatecismoOtcTopicos', list: '/api/CatecismoOtcTopicos' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'slug', label: 'Slug' },
    ],
  },
  {
    key: 'catecismo-otc',
    titulo: 'Conteúdo (Omisa)',
    grupo: 'Catecismo (Otchikwama)',
    api: { base: '/api/CatecismoOtc', list: '/api/CatecismoOtc' },
    tituloCampo: 'titulo',
    campos: [
      { nome: 'titulo', label: 'Título', tipo: 'text', obrigatorio: true },
      {
        nome: 'catecismoOtcTopicoId', label: 'Tópico', tipo: 'select', obrigatorio: true,
        opcoes: { endpoint: '/api/CatecismoOtcTopicos', valor: 'id', label: 'titulo' },
      },
      { nome: 'texto', label: 'Texto', tipo: 'textarea', obrigatorio: true, linhas: 10 },
    ],
    colunas: [
      { campo: 'titulo', label: 'Título' },
      { campo: 'catecismoOtcTopicoId', label: 'Tópico', ref: 'catecismoOtcTopicoId' },
    ],
  },
];

// Ecrãs de administração que não seguem o CRUD genérico (fluxo próprio),
// mas que ainda assim devem aparecer no menu da Administração.
export const EXTRAS = [
  { key: 'lojas', titulo: 'Lojas parceiras', grupo: 'Marketplace', rota: '/admin/lojas' },
  { key: 'encomendas', titulo: 'Todas as encomendas', grupo: 'Marketplace', rota: '/admin/encomendas' },
  { key: 'vendas', titulo: 'Vendas das lojas', grupo: 'Marketplace', rota: '/admin/vendas' },
];

export function getRecurso(key) {
  return RECURSOS.find(r => r.key === key) || null;
}

export function getGrupos() {
  const grupos = [];
  for (const r of [...RECURSOS, ...EXTRAS]) {
    let g = grupos.find(g => g.nome === r.grupo);
    if (!g) { g = { nome: r.grupo, itens: [] }; grupos.push(g); }
    g.itens.push(r);
  }
  return grupos;
}
