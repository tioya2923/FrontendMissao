import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../../api';
import { labelMoeda } from '../../constants/moeda';
import './Apoiar.css';

export default function Apoiar() {
  const [formas, setFormas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [copiadoId, setCopiadoId] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(false);
    try {
      const { data } = await api.get('/api/formasapoio');
      setFormas(data.filter((f) => f.ativo));
    } catch {
      setErro(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  // Agrupadas por moeda — quem apoia a partir de Portugal vê logo a secção em
  // euros, quem apoia a partir de Angola vê a secção em kwanzas, etc.
  const grupos = useMemo(() => {
    const mapa = new Map();
    for (const f of formas) {
      if (!mapa.has(f.moeda)) mapa.set(f.moeda, []);
      mapa.get(f.moeda).push(f);
    }
    return Array.from(mapa.entries());
  }, [formas]);

  const copiar = async (id, valor) => {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiadoId(id);
      setTimeout(() => setCopiadoId((c) => (c === id ? null : c)), 2000);
    } catch {
      // clipboard indisponível — o valor continua visível para copiar à mão
    }
  };

  return (
    <div className="apoiar-container">
      <div className="apoiar-hero">
        <span className="apoiar-hero-icone" aria-hidden="true">♡</span>
        <h1>Apoie a Ndatava</h1>
        <p>
          A Ndatava é e será sempre gratuita para todos — o calendário litúrgico, os
          cânticos, o catecismo e a loja de artigos religiosos nunca ficam bloqueados
          atrás de um pagamento. Se puder e quiser, pode ajudar voluntariamente a manter
          o serviço, segundo as suas possibilidades.
        </p>
      </div>

      <div className="apoiar-nota-lojas">
        <strong>É dono de uma loja parceira?</strong> A Ndatava nunca cobra comissão nem
        taxa sobre as suas vendas — todo o valor fica inteiramente consigo. Este apoio é
        só um convite, sem qualquer obrigação nem ligação à sua conta de loja.
      </div>

      {loading ? (
        <div className="apoiar-card">
          <p className="apoiar-estado">A carregar…</p>
        </div>
      ) : erro ? (
        <div className="apoiar-card">
          <p className="apoiar-estado">Não foi possível carregar as formas de apoio.</p>
          <button className="apoiar-tentar" onClick={carregar}>Tentar novamente</button>
        </div>
      ) : formas.length > 0 ? (
        <div className="apoiar-card">
          <h2>Formas de apoiar</h2>
          <p className="apoiar-nota-moedas">
            Escolha a opção na moeda do seu país — Angola (Kz), Portugal (€), Brasil (R$),
            Moçambique (MT), Cabo Verde ou outra.
          </p>
          {grupos.map(([moeda, itens]) => (
            <div key={moeda} className="apoiar-grupo-moeda">
              <h3 className="apoiar-grupo-titulo">{labelMoeda(moeda)}</h3>
              <ul className="apoiar-lista">
                {itens.map((f) => (
                  <li key={f.id} className="apoiar-item">
                    <div className="apoiar-item-info">
                      <span className="apoiar-item-label">{f.label}</span>
                      {f.descricao && <span className="apoiar-item-desc">{f.descricao}</span>}
                      <span className="apoiar-item-valor">{f.valor}</span>
                    </div>
                    <button className="apoiar-copiar" onClick={() => copiar(f.id, f.valor)}>
                      {copiadoId === f.id ? 'Copiado ✓' : 'Copiar'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="apoiar-card">
          <p className="apoiar-estado">As formas de apoio estarão disponíveis em breve.</p>
        </div>
      )}

      <p className="apoiar-rodape">
        Obrigado por fazer parte desta comunidade. Que Deus lhe recompense a generosidade.
      </p>
    </div>
  );
}
