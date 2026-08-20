// Catálogo fixo dos métodos de pagamento disponíveis em Angola. Os códigos têm de
// corresponder exatamente aos definidos no backend (Models/MetodoPagamento.cs).
// Cada loja escolhe livremente quais aceita — um, vários, ou todos.

export const METODOS_PAGAMENTO = [
  { codigo: 'dinheiro', label: 'Dinheiro (presencial / na entrega)', precisaDetalhe: false },
  { codigo: 'multicaixa_express', label: 'Multicaixa Express', precisaDetalhe: true, placeholderDetalhe: 'Nº de telefone associado, ex.: 923 000 000' },
  { codigo: 'referencia_multicaixa', label: 'Referência Multicaixa', precisaDetalhe: true, placeholderDetalhe: 'Entidade e referência, ex.: Entidade 00000, Ref. 000 000 000' },
  { codigo: 'transferencia_bancaria', label: 'Transferência bancária (IBAN)', precisaDetalhe: true, placeholderDetalhe: 'IBAN e titular, ex.: AO06 0000 0000 0000 0000 0, titular Loja Exemplo' },
  { codigo: 'unitel_money', label: 'Unitel Money', precisaDetalhe: true, placeholderDetalhe: 'Nº de telefone associado' },
  { codigo: 'paypay', label: 'PayPay', precisaDetalhe: true, placeholderDetalhe: 'Nº de telefone ou utilizador PayPay' },
  { codigo: 'cartao_pos', label: 'Cartão bancário (POS na entrega/levantamento)', precisaDetalhe: false },
];

export function getMetodoPagamento(codigo) {
  return METODOS_PAGAMENTO.find((m) => m.codigo === codigo) || null;
}

export function labelMetodoPagamento(codigo) {
  return getMetodoPagamento(codigo)?.label || codigo;
}
