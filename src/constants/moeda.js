// Catálogo das moedas suportadas — cada loja vende na sua própria moeda (Angola,
// Portugal, Brasil, Moçambique, Cabo Verde ou outra), sem conversão automática entre
// elas. Os códigos correspondem exatamente aos do backend (Models/Moeda.cs).

export const MOEDAS = [
  { codigo: 'AOA', label: 'Kwanza (Angola)', simbolo: 'Kz', antes: false },
  { codigo: 'EUR', label: 'Euro (Portugal)', simbolo: '€', antes: true },
  { codigo: 'BRL', label: 'Real (Brasil)', simbolo: 'R$', antes: true },
  { codigo: 'MZN', label: 'Metical (Moçambique)', simbolo: 'MT', antes: false },
  { codigo: 'CVE', label: 'Escudo (Cabo Verde)', simbolo: '$', antes: false },
  { codigo: 'USD', label: 'Dólar (outros países)', simbolo: '$', antes: true },
];

export function labelMoeda(codigo) {
  return MOEDAS.find((m) => m.codigo === codigo)?.label || codigo;
}

export function formatarPreco(valor, codigo) {
  const info = MOEDAS.find((m) => m.codigo === codigo) || MOEDAS[0];
  const numero = Number(valor).toFixed(2);
  return info.antes ? `${info.simbolo}${numero}` : `${numero} ${info.simbolo}`;
}
