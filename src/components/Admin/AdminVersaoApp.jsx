import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../api';
import './Admin.css';

export default function AdminVersaoApp() {
  const { nome, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    versaoRecomendada: '',
    versaoMinima: '',
    urlDownload: '',
    mensagem: '',
  });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [aGuardar, setAGuardar] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const { data } = await api.get('/api/versao-app');
      setForm({
        versaoRecomendada: data.versaoRecomendada || '',
        versaoMinima: data.versaoMinima || '',
        urlDownload: data.urlDownload || '',
        mensagem: data.mensagem || '',
      });
    } catch (e) {
      if (e.response?.status === 401) {
        logout();
        navigate('/admin/login', { replace: true });
        return;
      }
      setErro('Não foi possível carregar a configuração.');
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => { carregar(); }, [carregar]);

  const guardar = async (e) => {
    e.preventDefault();
    setAGuardar(true);
    setErro(null);
    setGuardado(false);
    try {
      await api.put('/api/versao-app', form);
      setGuardado(true);
    } catch {
      setErro('Não foi possível guardar.');
    } finally {
      setAGuardar(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-topbar">
        <div>
          <Link to="/admin" className="admin-voltar">← Administração</Link>
          <h1>Versão da App</h1>
        </div>
        <div className="admin-sessao">
          <span>{nome}</span>
          <button onClick={() => { logout(); navigate('/admin/login'); }}>Sair</button>
        </div>
      </div>

      <div className="admin-card">
        <p style={{ color: '#666', marginTop: 0 }}>
          Quando a versão instalada no telemóvel dos utilizadores for mais antiga do que a
          indicada aqui, a app mostra um aviso a pedir para atualizar. Se for mais antiga do que
          a "versão mínima", o aviso não pode ser fechado.
        </p>

        {loading && <div>A carregar...</div>}
        {erro && <div className="admin-erro">{erro}</div>}

        {!loading && (
          <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 480 }}>
            <label>
              Versão recomendada (ex.: 1.0.1)
              <input
                type="text"
                value={form.versaoRecomendada}
                onChange={e => setForm(f => ({ ...f, versaoRecomendada: e.target.value }))}
              />
            </label>
            <label>
              Versão mínima (opcional — obriga a atualizar)
              <input
                type="text"
                value={form.versaoMinima}
                onChange={e => setForm(f => ({ ...f, versaoMinima: e.target.value }))}
              />
            </label>
            <label>
              URL de download (Play Store ou APK direto)
              <input
                type="text"
                value={form.urlDownload}
                onChange={e => setForm(f => ({ ...f, urlDownload: e.target.value }))}
              />
            </label>
            <label>
              Mensagem mostrada ao utilizador
              <textarea
                rows={3}
                value={form.mensagem}
                onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))}
              />
            </label>

            <button type="submit" className="admin-btn" disabled={aGuardar}>
              {aGuardar ? 'A guardar...' : 'Guardar'}
            </button>
            {guardado && <div style={{ color: 'green' }}>Guardado.</div>}
          </form>
        )}
      </div>
    </div>
  );
}
