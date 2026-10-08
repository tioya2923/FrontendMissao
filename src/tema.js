// Preferência de aparência: 'sistema' (automático), 'claro' ou 'escuro'. Guardada neste navegador.
const CHAVE = 'ndatava:tema';

export function lerPreferencia() {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === 'claro' || v === 'escuro' ? v : 'sistema';
  } catch {
    return 'sistema';
  }
}

export function guardarPreferencia(pref) {
  try {
    localStorage.setItem(CHAVE, pref);
  } catch {
    /* navegador sem armazenamento — a escolha vale só nesta visita */
  }
}

// As áreas de administração e de lojas têm o seu próprio estilo (só claro).
export function emAreaPrivada(pathname) {
  return /^\/(admin|loja)(\/|$)/.test(pathname);
}

export function aplicarTema(pref, forcarClaro = false) {
  const el = document.documentElement;
  if (forcarClaro || pref === 'claro') el.setAttribute('data-theme', 'light');
  else if (pref === 'escuro') el.setAttribute('data-theme', 'dark');
  else el.removeAttribute('data-theme');
}
