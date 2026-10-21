// Idiomas do site. Cada idioma é identificado pelo código da API (pt, umb, lat, kmb, otc, swa…).
// Nos endereços usa-se o nome por extenso dos idiomas que já existiam (para os links antigos
// continuarem a funcionar); um idioma novo usa simplesmente o seu código: /canticos/swa.
export const SLUG_POR_CODIGO = {
  pt: "portugues",
  umb: "umbundu",
  kmb: "kimbundu",
  lat: "latim",
  otc: "otchikwama",
};

const CODIGO_POR_SLUG = {
  ...Object.fromEntries(Object.entries(SLUG_POR_CODIGO).map(([codigo, slug]) => [slug, codigo])),
  oshikwanhama: "otc",
};

export const slugDoCodigo = (codigo) => SLUG_POR_CODIGO[codigo] || codigo;
export const codigoDoSlug = (slug) => CODIGO_POR_SLUG[slug] || slug;

// Idiomas conhecidos, usados só se a lista do servidor não puder ser obtida.
export const IDIOMAS_BASE = [
  { codigo: "pt", nome: "Português" },
  { codigo: "umb", nome: "Umbundu" },
  { codigo: "kmb", nome: "Kimbundu" },
  { codigo: "lat", nome: "Latim" },
  { codigo: "otc", nome: "Oshikwanhama" },
];

// Ordem litúrgica habitual dos tópicos de cânticos (os nomes são os mesmos em todos os idiomas).
// Tópicos que não constem daqui (criados no painel) aparecem a seguir, em vez de serem omitidos.
export const ORDEM_LITURGICA = [
  "Procissão", "Entrada", "Kyrie", "Glória", "Entronização da Palavra", "Aleluia",
  "Oração dos Fiéis", "Ofertório", "Elevação", "Santo", "Saudação",
  "Cordeiro de Deus", "Comunhão", "Acção de Graças", "Saída",
];

// Pela ordem do livro (número) quando existe; senão por título.
export const porNumeroOuTitulo = (a, b) =>
  (a.numero ?? Infinity) - (b.numero ?? Infinity)
  || (a.titulo || "").localeCompare(b.titulo || "", "pt", { sensitivity: "base" });

// O servidor responde 400 a um idioma que não existe: para quem visita é só "sem conteúdo", não um erro.
export const idiomaInexistente = (err) => err?.response?.status === 400;
