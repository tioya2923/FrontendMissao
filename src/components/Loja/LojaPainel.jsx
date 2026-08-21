import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLojaAuth } from '../../context/useLojaAuth';
import {
  getPerfilProprio, atualizarPerfilProprio, pausarOuReativar,
  getMeusProdutos, criarProduto, atualizarProduto, eliminarProduto,
  getMinhasEncomendas, atualizarEstadoEncomenda, uploadImagemProduto,
} from '../../api/loja';
import { METODOS_PAGAMENTO } from '../../constants/metodosPagamento';
import { MOEDAS, formatarPreco } from '../../constants/moeda';
import '../Admin/Admin.css';

const ESTADOS = ['Pendente', 'Confirmada', 'Enviada', 'Cancelada'];
const CORES_ESTADO = { Pendente: '#b45309', Confirmada: '#1976d2', Enviada: '#2e7d32', Cancelada: '#b71c1c' };

const PRODUTO_VAZIO = { nome: '', descricao: '', preco: 0, precoPromocional: '', emDestaque: false, categoria: '', imagemUrl: '', ordem: 0, disponivel: true };

export default function LojaPainel() {
  const { nome, logout } = useLojaAuth();
  const navigate = useNavigate();
  const [aba, setAba] = useState('produtos');
  const [moeda, setMoeda] = useState('AOA');

  useEffect(() => { getPerfilProprio().then((p) => setMoeda(p.moeda)); }, []);

  const sair = () => { logout(); navigate('/loja/login', { replace: true }); };

  return (
    <div className="admin-container admin-container-largo">
      <div className="admin-card">
        <div className="admin-header-row">
          <div>
            <h1 className="admin-titulo">A minha loja</h1>
            <p className="admin-subtitulo" style={{ margin: 0 }}>{nome}</p>
          </div>
          <button className="admin-btn admin-btn-secundario" onClick={sair}>Sair</button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
          {[['produtos', 'Produtos'], ['encomendas', 'Encomendas'], ['perfil', 'Perfil da loja']].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setAba(id)}
              className={aba === id ? 'admin-btn' : 'admin-btn admin-btn-secundario'}
            >
              {label}
            </button>
          ))}
        </div>

        {aba === 'produtos' && <AbaProdutos moeda={moeda} />}
        {aba === 'encomendas' && <AbaEncomendas />}
        {aba === 'perfil' && <AbaPerfil onMoedaChange={setMoeda} />}
      </div>
    </div>
  );
}

// ── Produtos ────────────────────────────────────────────────────────────────
function AbaProdutos({ moeda }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aEditar, setAEditar] = useState(null); // 'nova' | id | null
  const [rascunho, setRascunho] = useState(PRODUTO_VAZIO);
  const [erroForm, setErroForm] = useState(null);
  const [aGuardar, setAGuardar] = useState(false);
  const [modoImagem, setModoImagem] = useState('url'); // 'url' | 'ficheiro'
  const [aCarregarImagem, setACarregarImagem] = useState(false);

  const carregar = useCallback(async () => {
    setLoading(true);
    setProdutos(await getMeusProdutos());
    setLoading(false);
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  const iniciarNovo = () => { setRascunho(PRODUTO_VAZIO); setErroForm(null); setModoImagem('url'); setAEditar('nova'); };
  const iniciarEdicao = (p) => {
    setRascunho({
      nome: p.nome, descricao: p.descricao || '', preco: p.preco,
      precoPromocional: p.precoPromocional ?? '', emDestaque: p.emDestaque || false,
      categoria: p.categoria || '', imagemUrl: p.imagemUrl || '', ordem: p.ordem, disponivel: p.disponivel,
    });
    setErroForm(null);
    setModoImagem('url');
    setAEditar(p.id);
  };

  const escolherFicheiro = async (e) => {
    const ficheiro = e.target.files?.[0];
    e.target.value = '';
    if (!ficheiro) return;
    setACarregarImagem(true);
    setErroForm(null);
    try {
      const url = await uploadImagemProduto(ficheiro);
      setRascunho((r) => ({ ...r, imagemUrl: url }));
    } catch (err) {
      setErroForm(err.message || 'Não foi possível carregar a imagem.');
    } finally {
      setACarregarImagem(false);
    }
  };

  const guardar = async (e) => {
    e.preventDefault();
    if (!rascunho.nome.trim()) { setErroForm('O nome é obrigatório.'); return; }
    const precoNum = Number(rascunho.preco) || 0;
    const precoPromoNum = rascunho.precoPromocional === '' ? null : Number(rascunho.precoPromocional);
    if (precoPromoNum != null && (Number.isNaN(precoPromoNum) || precoPromoNum >= precoNum)) {
      setErroForm('O preço promocional tem de ser menor que o preço normal.');
      return;
    }
    setAGuardar(true);
    setErroForm(null);
    try {
      const payload = { ...rascunho, preco: precoNum, precoPromocional: precoPromoNum, ordem: Number(rascunho.ordem) || 0 };
      if (aEditar === 'nova') await criarProduto(payload);
      else await atualizarProduto(aEditar, payload);
      setAEditar(null);
      await carregar();
    } catch (e) {
      setErroForm(e.response?.data || 'Não foi possível guardar.');
    } finally {
      setAGuardar(false);
    }
  };

  const remover = async (p) => {
    if (!window.confirm(`Eliminar "${p.nome}"?`)) return;
    try {
      await eliminarProduto(p.id);
      await carregar();
    } catch (e) {
      alert(typeof e.response?.data === 'string' ? e.response.data : 'Não foi possível eliminar.');
    }
  };

  return (
    <div>
      <div className="admin-header-row">
        <h2 style={{ fontSize: '1.05rem', margin: 0 }}>Os meus produtos</h2>
        <button className="admin-btn" onClick={iniciarNovo}>+ Novo produto</button>
      </div>

      {aEditar && (
        <form onSubmit={guardar} className="admin-card" style={{ boxShadow: 'none', border: '1px solid #ddd', marginBottom: 20 }}>
          {erroForm && <div className="admin-erro">{String(erroForm)}</div>}
          <div className="admin-field">
            <label>Nome</label>
            <input value={rascunho.nome} onChange={(e) => setRascunho((r) => ({ ...r, nome: e.target.value }))} required />
          </div>
          <div className="admin-field">
            <label>Descrição</label>
            <textarea rows={3} value={rascunho.descricao} onChange={(e) => setRascunho((r) => ({ ...r, descricao: e.target.value }))} />
          </div>
          <div className="admin-field">
            <label>Preço ({moeda})</label>
            <input type="number" value={rascunho.preco} onChange={(e) => setRascunho((r) => ({ ...r, preco: e.target.value }))} required />
          </div>
          <div className="admin-field">
            <label>Preço promocional em {moeda} (opcional — deixe vazio para não estar em promoção)</label>
            <input type="number" value={rascunho.precoPromocional} onChange={(e) => setRascunho((r) => ({ ...r, precoPromocional: e.target.value }))} />
          </div>
          <div className="admin-checkbox">
            <input id="destaque" type="checkbox" checked={rascunho.emDestaque} onChange={(e) => setRascunho((r) => ({ ...r, emDestaque: e.target.checked }))} />
            <label htmlFor="destaque" style={{ margin: 0, textTransform: 'none' }}>Em destaque</label>
          </div>
          <div className="admin-field">
            <label>Categoria</label>
            <input value={rascunho.categoria} onChange={(e) => setRascunho((r) => ({ ...r, categoria: e.target.value }))} />
          </div>
          <div className="admin-field">
            <label>Imagem</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <button
                type="button"
                className={modoImagem === 'url' ? 'admin-btn' : 'admin-btn admin-btn-secundario'}
                onClick={() => setModoImagem('url')}
              >
                URL da imagem
              </button>
              <button
                type="button"
                className={modoImagem === 'ficheiro' ? 'admin-btn' : 'admin-btn admin-btn-secundario'}
                onClick={() => setModoImagem('ficheiro')}
              >
                Carregar do dispositivo
              </button>
            </div>

            {modoImagem === 'url' ? (
              <input
                value={rascunho.imagemUrl}
                onChange={(e) => setRascunho((r) => ({ ...r, imagemUrl: e.target.value }))}
                placeholder="https://..."
              />
            ) : (
              <>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={escolherFicheiro} disabled={aCarregarImagem} />
                {aCarregarImagem && <p style={{ fontSize: '0.85rem', color: '#666', marginTop: 6 }}>A carregar…</p>}
              </>
            )}

            {rascunho.imagemUrl && (
              <img
                src={rascunho.imagemUrl}
                alt="Pré-visualização"
                style={{ marginTop: 10, maxWidth: 160, maxHeight: 160, borderRadius: 8, border: '1px solid #eee', objectFit: 'cover' }}
              />
            )}
          </div>
          <div className="admin-field">
            <label>Ordem de exibição</label>
            <input type="number" value={rascunho.ordem} onChange={(e) => setRascunho((r) => ({ ...r, ordem: e.target.value }))} />
          </div>
          <div className="admin-checkbox">
            <input id="disp" type="checkbox" checked={rascunho.disponivel} onChange={(e) => setRascunho((r) => ({ ...r, disponivel: e.target.checked }))} />
            <label htmlFor="disp" style={{ margin: 0, textTransform: 'none' }}>Visível na loja</label>
          </div>
          <div className="admin-form-acoes">
            <button type="button" className="admin-btn admin-btn-secundario" onClick={() => setAEditar(null)}>Cancelar</button>
            <button type="submit" className="admin-btn" disabled={aGuardar}>{aGuardar ? 'A guardar…' : 'Guardar'}</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="admin-vazio">A carregar…</p>
      ) : produtos.length === 0 ? (
        <p className="admin-vazio">Ainda não tem produtos.</p>
      ) : (
        <div className="admin-tabela-wrap">
          <table className="admin-tabela">
            <thead><tr><th>Nome</th><th>Preço</th><th>Destaque</th><th>Visível</th><th></th></tr></thead>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>
                    {p.precoPromocional != null ? (
                      <>
                        <span style={{ textDecoration: 'line-through', color: '#999', marginRight: 6 }}>{formatarPreco(p.preco, moeda)}</span>
                        <span style={{ color: '#c0392b', fontWeight: 700 }}>{formatarPreco(p.precoPromocional, moeda)}</span>
                      </>
                    ) : (
                      <>{formatarPreco(p.preco, moeda)}</>
                    )}
                  </td>
                  <td>{p.emDestaque ? '⭐' : ''}</td>
                  <td>{p.disponivel ? 'Sim' : 'Não'}</td>
                  <td className="admin-tabela-acoes">
                    <button className="admin-btn admin-btn-secundario" onClick={() => iniciarEdicao(p)}>Editar</button>
                    <button className="admin-btn admin-btn-perigo" onClick={() => remover(p)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Encomendas ──────────────────────────────────────────────────────────────
function AbaEncomendas() {
  const [encomendas, setEncomendas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    setLoading(true);
    setEncomendas(await getMinhasEncomendas());
    setLoading(false);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- carregamento inicial da lista
  useEffect(() => { carregar(); }, [carregar]);

  const mudarEstado = async (enc, estado) => {
    try {
      await atualizarEstadoEncomenda(enc.id, estado);
      setEncomendas((lista) => lista.map((e) => (e.id === enc.id ? { ...e, estado } : e)));
    } catch {
      alert('Não foi possível atualizar o estado.');
    }
  };

  if (loading) return <p className="admin-vazio">A carregar…</p>;
  if (encomendas.length === 0) return <p className="admin-vazio">Ainda não tem encomendas.</p>;

  return (
    <div className="admin-lista">
      {encomendas.map((enc) => (
        <div className="admin-item" key={enc.id} style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div className="admin-item-info">
              <span className="admin-item-label">
                #{enc.id} — {enc.nomeCliente}
                <span className="admin-item-badge" style={{ background: `${CORES_ESTADO[enc.estado]}20`, color: CORES_ESTADO[enc.estado] }}>{enc.estado}</span>
              </span>
              <div className="admin-item-desc">{enc.contacto}{enc.morada ? ` · ${enc.morada}` : ''}</div>
              <div className="admin-item-desc">{new Date(enc.data).toLocaleString('pt-PT')}</div>
            </div>
            <select value={enc.estado} onChange={(e) => mudarEstado(enc, e.target.value)} style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', alignSelf: 'flex-start' }}>
              {ESTADOS.map((estado) => <option key={estado} value={estado}>{estado}</option>)}
            </select>
          </div>
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 10 }}>
            {enc.itens.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', padding: '3px 0' }}>
                <span>{item.quantidade}× {item.produtoNome}</span>
                <span>{formatarPreco(item.precoUnitario * item.quantidade, enc.moeda)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: 6 }}>
              <span>Total (100% seu — sem comissão)</span><span>{formatarPreco(enc.total, enc.moeda)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Perfil da loja ──────────────────────────────────────────────────────────
function AbaPerfil({ onMoedaChange }) {
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState(null);
  const [ok, setOk] = useState(false);
  const [aLocalizar, setALocalizar] = useState(false);
  const [aGuardar, setAGuardar] = useState(false);

  useEffect(() => { getPerfilProprio().then(setPerfil); }, []);

  const usarLocalizacaoAtual = () => {
    if (!navigator.geolocation) return;
    setALocalizar(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setPerfil((p) => ({ ...p, latitude: pos.coords.latitude, longitude: pos.coords.longitude })); setALocalizar(false); },
      () => setALocalizar(false)
    );
  };

  const alternarMetodoPagamento = (codigo) => {
    setPerfil((p) => {
      const jaTem = p.formasPagamento.some((f) => f.metodo === codigo);
      const formasPagamento = jaTem
        ? p.formasPagamento.filter((f) => f.metodo !== codigo)
        : [...p.formasPagamento, { metodo: codigo, detalhe: '' }];
      return { ...p, formasPagamento };
    });
  };

  const atualizarDetalhePagamento = (codigo, detalhe) => {
    setPerfil((p) => ({
      ...p,
      formasPagamento: p.formasPagamento.map((f) => (f.metodo === codigo ? { ...f, detalhe } : f)),
    }));
  };

  const guardar = async (e) => {
    e.preventDefault();
    setErro(null); setOk(false);

    if (perfil.formasPagamento.length === 0) {
      setErro('Escolha pelo menos uma forma de pagamento.');
      return;
    }
    const semDetalhe = perfil.formasPagamento.find((f) => {
      const metodo = METODOS_PAGAMENTO.find((m) => m.codigo === f.metodo);
      return metodo?.precisaDetalhe && !f.detalhe?.trim();
    });
    if (semDetalhe) {
      const metodo = METODOS_PAGAMENTO.find((m) => m.codigo === semDetalhe.metodo);
      setErro(`Indique o detalhe de "${metodo.label}" (ex.: número de telefone ou IBAN).`);
      return;
    }

    setAGuardar(true);
    try {
      await atualizarPerfilProprio(perfil);
      setOk(true);
      onMoedaChange?.(perfil.moeda);
    } catch (e) {
      setErro(e.response?.data || 'Não foi possível guardar.');
    } finally {
      setAGuardar(false);
    }
  };

  const alternarPausa = async () => {
    const novaAtiva = !perfil.ativa;
    await pausarOuReativar(novaAtiva);
    setPerfil((p) => ({ ...p, ativa: novaAtiva }));
  };

  if (!perfil) return <p className="admin-vazio">A carregar…</p>;

  return (
    <form onSubmit={guardar}>
      <div className="admin-erro" style={{ background: perfil.aprovada ? '#e8f5e9' : '#fff3e0', color: perfil.aprovada ? '#2e7d32' : '#e65100', border: 'none' }}>
        {perfil.aprovada
          ? 'A sua loja está aprovada e visível para os compradores.'
          : 'A sua loja ainda está pendente de aprovação pelo administrador. Pode preparar o perfil e os produtos entretanto.'}
      </div>

      {erro && <div className="admin-erro">{String(erro)}</div>}
      {ok && <div className="admin-erro" style={{ background: '#e8f5e9', color: '#2e7d32', border: 'none' }}>Guardado com sucesso.</div>}

      <div className="admin-field"><label>Nome</label><input value={perfil.nome} onChange={(e) => setPerfil((p) => ({ ...p, nome: e.target.value }))} required /></div>
      <div className="admin-field"><label>Descrição</label><textarea rows={3} value={perfil.descricao || ''} onChange={(e) => setPerfil((p) => ({ ...p, descricao: e.target.value }))} /></div>
      <div className="admin-field"><label>Telefone</label><input value={perfil.telefone || ''} onChange={(e) => setPerfil((p) => ({ ...p, telefone: e.target.value }))} /></div>
      <div className="admin-field"><label>Morada</label><input value={perfil.morada || ''} onChange={(e) => setPerfil((p) => ({ ...p, morada: e.target.value }))} /></div>
      <div className="admin-field"><label>Categoria</label><input value={perfil.categoria || ''} onChange={(e) => setPerfil((p) => ({ ...p, categoria: e.target.value }))} /></div>
      <div className="admin-field">
        <label>Moeda em que a loja vende</label>
        <select value={perfil.moeda} onChange={(e) => setPerfil((p) => ({ ...p, moeda: e.target.value }))}>
          {MOEDAS.map((m) => (
            <option key={m.codigo} value={m.codigo}>{m.label}</option>
          ))}
        </select>
        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: 6 }}>
          Todos os seus produtos e novas encomendas passam a usar esta moeda. Encomendas já feitas
          mantêm a moeda em que foram criadas.
        </p>
      </div>
      <div className="admin-erro" style={{ background: '#eef4fc', color: '#1c4a7a', border: 'none' }}>
        A Ndatava <strong>não cobra nenhuma comissão</strong> sobre as suas vendas — o valor de cada
        encomenda é inteiramente seu. Se um dia quiser apoiar a manutenção do serviço, pode fazê-lo
        voluntariamente, segundo as suas possibilidades, na{' '}
        <a href="/apoiar" target="_blank" rel="noreferrer" style={{ color: '#1c4a7a', fontWeight: 700 }}>
          página de apoio
        </a>. Nunca é uma cobrança nem uma condição para vender.
      </div>

      <div className="admin-field">
        <label>Formas de pagamento aceites (escolha uma ou várias)</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          {METODOS_PAGAMENTO.map((metodo) => {
            const selecionado = perfil.formasPagamento.find((f) => f.metodo === metodo.codigo);
            return (
              <div key={metodo.codigo} style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: '10px 12px' }}>
                <div className="admin-checkbox" style={{ margin: 0 }}>
                  <input
                    id={`metodo-${metodo.codigo}`}
                    type="checkbox"
                    checked={!!selecionado}
                    onChange={() => alternarMetodoPagamento(metodo.codigo)}
                  />
                  <label htmlFor={`metodo-${metodo.codigo}`} style={{ margin: 0, textTransform: 'none', fontWeight: 600 }}>
                    {metodo.label}
                  </label>
                </div>
                {selecionado && metodo.precisaDetalhe && (
                  <input
                    style={{ marginTop: 8, width: '100%' }}
                    placeholder={metodo.placeholderDetalhe}
                    value={selecionado.detalhe || ''}
                    onChange={(e) => atualizarDetalhePagamento(metodo.codigo, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="admin-field">
        <label>Instruções adicionais (opcional — ex.: horário de levantamento, nome do titular)</label>
        <textarea rows={2} placeholder="Ex.: Levantamento das 9h às 17h, titular da conta: Loja Exemplo Lda" value={perfil.infoPagamento || ''} onChange={(e) => setPerfil((p) => ({ ...p, infoPagamento: e.target.value }))} />
      </div>
      <div className="admin-field">
        <label>Localização</label>
        <button type="button" className="admin-btn admin-btn-secundario" onClick={usarLocalizacaoAtual} disabled={aLocalizar}>
          {aLocalizar ? 'A localizar…' : 'Atualizar para a minha localização atual'}
        </button>
        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: 6 }}>
          Lat {perfil.latitude?.toFixed?.(5)}, Lng {perfil.longitude?.toFixed?.(5)}
        </p>
      </div>

      <div className="admin-form-acoes" style={{ justifyContent: 'space-between' }}>
        <button type="button" className="admin-btn admin-btn-secundario" onClick={alternarPausa}>
          {perfil.ativa ? 'Pausar loja (fica invisível)' : 'Reativar loja'}
        </button>
        <button type="submit" className="admin-btn" disabled={aGuardar}>{aGuardar ? 'A guardar…' : 'Guardar alterações'}</button>
      </div>
    </form>
  );
}
