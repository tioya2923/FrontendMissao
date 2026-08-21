// Catálogo dos métodos de pagamento disponíveis — abrange os países onde a
// Ndatava tem lojas (Angola, Portugal, Brasil, Moçambique, Cabo Verde) mais
// alguns genéricos internacionais. Os códigos têm de corresponder exatamente
// aos definidos no backend (Models/MetodoPagamento.cs). Cada método declara
// em `moedas` em que país(es) faz sentido — a loja só vê, para escolher, os
// métodos da sua própria moeda (ver metodosPorMoeda).

export const METODOS_PAGAMENTO = [
  // Genéricos — fazem sentido em qualquer país
  { codigo: 'dinheiro', label: 'Dinheiro (presencial / na entrega)', moedas: ['AOA', 'EUR', 'BRL', 'MZN', 'CVE', 'USD'], precisaDetalhe: false },
  { codigo: 'transferencia_bancaria', label: 'Transferência bancária (IBAN)', moedas: ['AOA', 'EUR', 'BRL', 'MZN', 'CVE', 'USD'], precisaDetalhe: true, placeholderDetalhe: 'IBAN e titular, ex.: AO06 0000 0000 0000 0000 0, titular Loja Exemplo' },
  { codigo: 'cartao_pos', label: 'Cartão bancário (POS na entrega/levantamento)', moedas: ['AOA', 'EUR', 'BRL', 'MZN', 'CVE', 'USD'], precisaDetalhe: false },

  // Angola
  { codigo: 'multicaixa_express', label: 'Multicaixa Express', moedas: ['AOA'], precisaDetalhe: true, placeholderDetalhe: 'Nº de telefone associado, ex.: 923 000 000' },
  { codigo: 'referencia_multicaixa', label: 'Referência Multicaixa', moedas: ['AOA'], precisaDetalhe: true, placeholderDetalhe: 'Entidade e referência, ex.: Entidade 00000, Ref. 000 000 000' },
  { codigo: 'unitel_money', label: 'Unitel Money', moedas: ['AOA'], precisaDetalhe: true, placeholderDetalhe: 'Nº de telefone associado' },
  { codigo: 'paypay', label: 'PayPay', moedas: ['AOA'], precisaDetalhe: true, placeholderDetalhe: 'Nº de telefone ou utilizador PayPay' },

  // Portugal
  { codigo: 'mbway', label: 'MB WAY', moedas: ['EUR'], precisaDetalhe: true, placeholderDetalhe: 'Nº de telemóvel associado, ex.: 912 345 678' },
  { codigo: 'referencia_multibanco', label: 'Referência Multibanco', moedas: ['EUR'], precisaDetalhe: true, placeholderDetalhe: 'Entidade e referência ATM' },

  // Brasil
  { codigo: 'pix', label: 'Pix', moedas: ['BRL'], precisaDetalhe: true, placeholderDetalhe: 'Chave Pix (telemóvel, email, CPF/CNPJ ou aleatória)' },
  { codigo: 'boleto', label: 'Boleto bancário', moedas: ['BRL'], precisaDetalhe: false },

  // Moçambique
  { codigo: 'mpesa', label: 'M-Pesa', moedas: ['MZN'], precisaDetalhe: true, placeholderDetalhe: 'Nº de telefone associado' },
  { codigo: 'emola', label: 'e-Mola', moedas: ['MZN'], precisaDetalhe: true, placeholderDetalhe: 'Nº de telefone associado' },
  { codigo: 'mkesh', label: 'mKesh', moedas: ['MZN'], precisaDetalhe: true, placeholderDetalhe: 'Nº de telefone associado' },

  // Cabo Verde
  { codigo: 'vinti4', label: 'Vinti4', moedas: ['CVE'], precisaDetalhe: true, placeholderDetalhe: 'Nº de cartão ou telemóvel associado à rede Vinti4' },

  // Internacionais
  { codigo: 'paypal', label: 'PayPal', moedas: ['EUR', 'USD', 'BRL'], precisaDetalhe: true, placeholderDetalhe: 'Email associado à conta PayPal' },
  { codigo: 'wise', label: 'Wise', moedas: ['USD', 'EUR'], precisaDetalhe: true, placeholderDetalhe: 'Email associado à conta Wise' },
];

export function getMetodoPagamento(codigo) {
  return METODOS_PAGAMENTO.find((m) => m.codigo === codigo) || null;
}

export function labelMetodoPagamento(codigo) {
  return getMetodoPagamento(codigo)?.label || codigo;
}

// Só os métodos que fazem sentido para a moeda da loja (ex.: uma loja em
// euros não vê Multicaixa Express; uma loja em kwanzas não vê Pix).
export function metodosPorMoeda(moeda) {
  return METODOS_PAGAMENTO.filter((m) => m.moedas.includes(moeda));
}
