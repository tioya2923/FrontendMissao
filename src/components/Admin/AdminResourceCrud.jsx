import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../api';
import { listarRecurso, criarRecurso, atualizarRecurso, eliminarRecurso } from '../../api/adminApi';
import { getRecurso, getRecursoComIdiomas } from './resourcesConfig';
import './Admin.css';

function valorInicialDoCampo(campo) {
  if (campo.valorInicial !== undefined) return campo.valorInicial;
  if (campo.tipo === 'boolean') return false;
  if (campo.tipo === 'number') return 0;
  return '';
}

function rascunhoVazio(campos) {
  const r = {};
  for (const c of campos) r[c.nome] = valorInicialDoCampo(c);
  return r;
}

function paraDataInput(valor) {
  if (!valor) return '';
  // Aceita ISO completo ("2026-08-20T00:00:00") ou já "2026-08-20"
  return String(valor).slice(0, 10);
}

export default function AdminResourceCrud() {
  const { key } = useParams();
  const { nome, logout } = useAuth();
  const navigate = useNavigate();

  // Recursos estáticos (ex: Apoio, Idiomas) resolvem já; recursos por idioma
  // (Cânticos/Catecismo de um idioma) só resolvem depois de /api/idiomas carregar.
  const [idiomas, setIdiomas] = useState(null);
  useEffect(() => {
    api.get('/api/idiomas').then(r => setIdiomas(r.data)).catch(() => setIdiomas([]));
  }, []);

  // Memoizado: getRecursoComIdiomas/gerarRecursosIdioma criam objetos novos a
  // cada chamada, e sem isto o "recurso" mudava de identidade em todos os
  // renders, fazendo o carregar() (que depende de "recurso") disparar em loop
  // infinito — o ecrã ficava preso em "A carregar…" mesmo com os pedidos a
  // terem sucesso.
  const recurso = useMemo(
    () => (idiomas === null ? getRecurso(key) : getRecursoComIdiomas(key, idiomas)),
    [key, idiomas]
  );
  const aResolverIdioma = !recurso && idiomas === null && !getRecurso(key);

  const [itens, setItens] = useState([]);
  const [opcoesPorCampo, setOpcoesPorCampo] = useState({});
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [aEditar, setAEditar] = useState(null); // 'nova' | id | null
  const [rascunho, setRascunho] = useState({});
  const [aGuardar, setAGuardar] = useState(false);
  const [erroForm, setErroForm] = useState(null);

  const camposSelect = useMemo(
    () => (recurso ? recurso.campos.filter(c => c.tipo === 'select' && c.opcoes?.endpoint) : []),
    [recurso]
  );

  // Lista longa (ex: 641 entradas de Catecismo/Orações em Português) fica
  // difícil de navegar sem isto — reaproveita a coluna "ref" já definida na
  // configuração do recurso (ex: Tópico) como filtro rápido acima da tabela.
  const colunaFiltro = useMemo(() => (recurso ? recurso.colunas.find(c => c.ref) : null), [recurso]);
  const campoFiltro = useMemo(
    () => (colunaFiltro && recurso ? recurso.campos.find(c => c.nome === colunaFiltro.ref) : null),
    [colunaFiltro, recurso]
  );
  const [filtro, setFiltro] = useState('');
  useEffect(() => { setFiltro(''); }, [key]);

  const itensFiltrados = useMemo(() => {
    if (!colunaFiltro || !filtro) return itens;
    return itens.filter(it => String(it[colunaFiltro.ref]) === filtro);
  }, [itens, colunaFiltro, filtro]);

  const carregar = useCallback(async () => {
    if (!recurso) return;
    setLoading(true);
    setErro(null);
    try {
      const [lista, ...opcoesResultados] = await Promise.all([
        listarRecurso(recurso.api.list),
        ...camposSelect.map(c => api.get(c.opcoes.endpoint).then(r => r.data)),
      ]);
      setItens(lista);
      const mapa = {};
      camposSelect.forEach((c, i) => { mapa[c.nome] = opcoesResultados[i]; });
      setOpcoesPorCampo(mapa);
    } catch (e) {
      if (e.response?.status === 401) {
        logout();
        navigate('/admin/login', { replace: true });
        return;
      }
      setErro('Não foi possível carregar o conteúdo.');
    } finally {
      setLoading(false);
    }
  }, [recurso, camposSelect, logout, navigate]);

  useEffect(() => { carregar(); }, [carregar]);

  if (!recurso) {
    return (
      <div className="admin-container">
        <div className="admin-card">
          <p className={aResolverIdioma ? 'admin-vazio' : 'admin-erro'}>
            {aResolverIdioma ? 'A carregar…' : 'Tipo de conteúdo desconhecido.'}
          </p>
          {!aResolverIdioma && (
            <Link to="/admin" className="admin-btn admin-btn-secundario">← Voltar à Administração</Link>
          )}
        </div>
      </div>
    );
  }

  const iniciarNova = () => {
    const vazio = rascunhoVazio(recurso.campos);
    // Se há um filtro de tópico ativo, o "+ Novo" já começa com esse tópico
    // escolhido — poupa ter de o selecionar outra vez.
    if (campoFiltro && filtro) vazio[campoFiltro.nome] = filtro;
    setRascunho(vazio);
    setErroForm(null);
    setAEditar('nova');
  };

  const iniciarEdicao = (item) => {
    const r = {};
    for (const c of recurso.campos) {
      if (c.tipo === 'date') r[c.nome] = paraDataInput(item[c.nome]);
      else r[c.nome] = item[c.nome] ?? valorInicialDoCampo(c);
    }
    setRascunho(r);
    setErroForm(null);
    setAEditar(item.id);
  };

  const cancelar = () => { setAEditar(null); setErroForm(null); };

  const construirPayload = () => {
    const payload = {};
    for (const c of recurso.campos) {
      let v = rascunho[c.nome];
      if (c.tipo === 'number') v = Number(v) || 0;
      if (c.tipo === 'select' && !c.opcoesEstaticas) v = v === '' || v === null ? null : Number(v);
      if (typeof v === 'string') v = v.trim();
      if (v === '' && !c.obrigatorio) v = null;
      payload[c.nome] = v;
    }
    return payload;
  };

  const guardar = async (e) => {
    e.preventDefault();
    for (const c of recurso.campos) {
      if (c.obrigatorio) {
        const v = rascunho[c.nome];
        if (v === '' || v === null || v === undefined) {
          setErroForm(`Preencha o campo "${c.label}".`);
          return;
        }
      }
    }
    setAGuardar(true);
    setErroForm(null);
    try {
      const payload = construirPayload();
      if (aEditar === 'nova') {
        await criarRecurso(recurso.api.base, payload);
      } else {
        await atualizarRecurso(recurso.api.base, aEditar, { ...payload, id: aEditar });
      }
      setAEditar(null);
      await carregar();
    } catch (e) {
      setErroForm(e.response?.data || 'Não foi possível guardar. Tente novamente.');
    } finally {
      setAGuardar(false);
    }
  };

  const remover = async (item) => {
    const label = item[recurso.tituloCampo] || `#${item.id}`;
    if (!window.confirm(`Eliminar "${label}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await eliminarRecurso(recurso.api.base, item.id);
      await carregar();
    } catch (e) {
      alert(typeof e.response?.data === 'string' ? e.response.data : 'Não foi possível eliminar.');
    }
  };

  const sair = () => { logout(); navigate('/admin/login', { replace: true }); };

  const valorRef = (item, colRefCampo) => {
    const id = item[colRefCampo];
    if (id === null || id === undefined) return '—';
    const campo = recurso.campos.find(c => c.nome === colRefCampo);
    const opcoes = opcoesPorCampo[colRefCampo] || [];
    const match = opcoes.find(o => o[campo.opcoes.valor] === id);
    return match ? match[campo.opcoes.label] : '—';
  };

  return (
    <div className="admin-container admin-container-largo">
      <div className="admin-card">
        <div className="admin-header-row">
          <div>
            <Link to="/admin" className="admin-breadcrumb">← Administração</Link>
            <h1 className="admin-titulo">{recurso.titulo}</h1>
            <p className="admin-subtitulo" style={{ margin: 0 }}>{recurso.grupo}{nome ? ` · ${nome}` : ''}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="admin-btn admin-btn-secundario" onClick={sair}>Sair</button>
            <button className="admin-btn" onClick={iniciarNova}>+ Novo</button>
          </div>
        </div>

        {erro && <div className="admin-erro">{erro}</div>}

        {!loading && colunaFiltro && campoFiltro && (opcoesPorCampo[campoFiltro.nome] || []).length > 0 && (
          <div className="admin-field" style={{ maxWidth: 320 }}>
            <label htmlFor="f-filtro-topico">Filtrar por {colunaFiltro.label.toLowerCase()}</label>
            <select
              id="f-filtro-topico"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="">— Todos ({itens.length}) —</option>
              {(opcoesPorCampo[campoFiltro.nome] || []).map(o => (
                <option key={o[campoFiltro.opcoes.valor]} value={o[campoFiltro.opcoes.valor]}>
                  {o[campoFiltro.opcoes.label]}
                </option>
              ))}
            </select>
          </div>
        )}

        {aEditar && (
          <form onSubmit={guardar} className="admin-card" style={{ boxShadow: 'none', border: '1px solid #ddd', marginBottom: 20 }}>
            <h2 style={{ fontSize: '1.05rem', margin: '0 0 14px 0' }}>
              {aEditar === 'nova' ? `Novo — ${recurso.titulo}` : `Editar — ${recurso.titulo}`}
            </h2>

            {erroForm && <div className="admin-erro">{String(erroForm)}</div>}

            {recurso.campos.map((c) => (
              <div className={c.tipo === 'boolean' ? 'admin-checkbox' : 'admin-field'} key={c.nome}>
                {c.tipo === 'boolean' ? (
                  <>
                    <input
                      id={`f-${c.nome}`}
                      type="checkbox"
                      checked={!!rascunho[c.nome]}
                      onChange={(e) => setRascunho(r => ({ ...r, [c.nome]: e.target.checked }))}
                    />
                    <label htmlFor={`f-${c.nome}`} style={{ margin: 0, textTransform: 'none' }}>{c.label}</label>
                  </>
                ) : (
                  <>
                    <label htmlFor={`f-${c.nome}`}>{c.label}</label>
                    {c.tipo === 'textarea' ? (
                      <textarea
                        id={`f-${c.nome}`}
                        rows={c.linhas || 4}
                        value={rascunho[c.nome] ?? ''}
                        onChange={(e) => setRascunho(r => ({ ...r, [c.nome]: e.target.value }))}
                      />
                    ) : c.tipo === 'select' ? (
                      <select
                        id={`f-${c.nome}`}
                        value={rascunho[c.nome] ?? ''}
                        onChange={(e) => setRascunho(r => ({ ...r, [c.nome]: e.target.value }))}
                      >
                        <option value="">{c.obrigatorio ? '— Selecionar —' : '— Nenhum —'}</option>
                        {c.opcoesEstaticas
                          ? c.opcoesEstaticas.map(o => (
                              <option key={o.valor} value={o.valor}>{o.label}</option>
                            ))
                          : (opcoesPorCampo[c.nome] || [])
                              .filter(o => !(c.excluirProprio && aEditar !== 'nova' && o[c.opcoes.valor] === aEditar))
                              .map(o => (
                                <option key={o[c.opcoes.valor]} value={o[c.opcoes.valor]}>
                                  {o[c.opcoes.label]}
                                </option>
                              ))}
                      </select>
                    ) : (
                      <input
                        id={`f-${c.nome}`}
                        type={c.tipo === 'date' ? 'date' : c.tipo === 'number' ? 'number' : 'text'}
                        value={rascunho[c.nome] ?? ''}
                        onChange={(e) => setRascunho(r => ({ ...r, [c.nome]: e.target.value }))}
                      />
                    )}
                  </>
                )}
              </div>
            ))}

            <div className="admin-form-acoes">
              <button type="button" className="admin-btn admin-btn-secundario" onClick={cancelar}>Cancelar</button>
              <button type="submit" className="admin-btn" disabled={aGuardar}>
                {aGuardar ? 'A guardar…' : 'Guardar'}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="admin-vazio">A carregar…</p>
        ) : itens.length === 0 ? (
          <p className="admin-vazio">Ainda não existe conteúdo aqui.</p>
        ) : itensFiltrados.length === 0 ? (
          <p className="admin-vazio">Nenhum item para este filtro.</p>
        ) : (
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  {recurso.colunas.map(col => <th key={col.campo}>{col.label}</th>)}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {itensFiltrados.map((item) => (
                  <tr key={item.id}>
                    {recurso.colunas.map(col => (
                      <td key={col.campo}>
                        {col.ref
                          ? valorRef(item, col.ref)
                          : col.formatar
                            ? col.formatar(item[col.campo])
                            : (item[col.campo] ?? '—')}
                      </td>
                    ))}
                    <td className="admin-tabela-acoes">
                      <button className="admin-btn admin-btn-secundario" onClick={() => iniciarEdicao(item)}>Editar</button>
                      <button className="admin-btn admin-btn-perigo" onClick={() => remover(item)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
