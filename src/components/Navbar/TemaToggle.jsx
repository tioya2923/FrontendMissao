import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { aplicarTema, emAreaPrivada, guardarPreferencia, lerPreferencia } from "../../tema";

const ORDEM = ["sistema", "claro", "escuro"];
const INFO = {
  sistema: { icone: "fa-circle-half-stroke", texto: "Automático" },
  claro: { icone: "fa-sun", texto: "Claro" },
  escuro: { icone: "fa-moon", texto: "Escuro" },
};

// Botão que alterna entre Automático (segue o sistema), Claro e Escuro.
export default function TemaToggle() {
  const { pathname } = useLocation();
  const privada = emAreaPrivada(pathname);
  const [pref, setPref] = useState(lerPreferencia);

  useEffect(() => {
    aplicarTema(pref, privada);
  }, [pref, privada]);

  if (privada) return null;

  const seguinte = ORDEM[(ORDEM.indexOf(pref) + 1) % ORDEM.length];
  const atual = INFO[pref];

  return (
    <button
      type="button"
      className="tema-toggle"
      onClick={() => { guardarPreferencia(seguinte); setPref(seguinte); }}
      title={`Aparência: ${atual.texto}. Clique para mudar para ${INFO[seguinte].texto}.`}
      aria-label={`Aparência: ${atual.texto}. Mudar para ${INFO[seguinte].texto}`}
    >
      <i className={`fa-solid ${atual.icone}`} aria-hidden="true" />
      <span>{atual.texto}</span>
    </button>
  );
}
