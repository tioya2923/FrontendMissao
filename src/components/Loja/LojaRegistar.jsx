import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLojaAuth } from '../../context/useLojaAuth';
import { MOEDAS } from '../../constants/moeda';
import '../Admin/Admin.css';

export default function LojaRegistar() {
  const { registar } = useLojaAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '', email: '', password: '', telefone: '', morada: '', categoria: '', descricao: '', moeda: 'AOA',
  });
  const [coords, setCoords] = useState(null);
  const [aLocalizar, setALocalizar] = useState(false);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const campo = (nome) => (e) => setForm((f) => ({ ...f, [nome]: e.target.value }));

  const usarLocalizacaoAtual = () => {
    if (!navigator.geolocation) {
      setErro('O seu navegador não suporta geolocalização.');
      return;
    }
    setALocalizar(true);
    setErro(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setALocalizar(false);
      },
      () => {
        setErro('Não foi possível obter a sua localização. Permita o acesso e tente novamente.');
        setALocalizar(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    if (!coords) {
      setErro('Indique a localização da loja — toque em "Usar a minha localização atual".');
      return;
    }
    if (!form.nome.trim() || !form.email.trim() || !form.password.trim()) {
      setErro('Nome, email e password são obrigatórios.');
      return;
    }
    if (form.password.length < 6) {
      setErro('A password tem de ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await registar({ ...form, latitude: coords.latitude, longitude: coords.longitude });
      navigate('/loja/painel', { replace: true });
    } catch (e) {
      setErro(e.response?.data || 'Não foi possível concluir o registo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1 className="admin-titulo">Registar a minha loja</h1>
        <p className="admin-subtitulo">
          Depois de registada, a sua loja fica pendente de aprovação antes de aparecer nas pesquisas dos compradores.
        </p>

        {erro && <div className="admin-erro">{String(erro)}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Nome da loja</label>
            <input value={form.nome} onChange={campo('nome')} required />
          </div>
          <div className="admin-field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={campo('email')} autoComplete="username" required />
          </div>
          <div className="admin-field">
            <label>Palavra-passe</label>
            <input type="password" value={form.password} onChange={campo('password')} autoComplete="new-password" required />
          </div>
          <div className="admin-field">
            <label>Telefone</label>
            <input value={form.telefone} onChange={campo('telefone')} />
          </div>
          <div className="admin-field">
            <label>Morada</label>
            <input value={form.morada} onChange={campo('morada')} />
          </div>
          <div className="admin-field">
            <label>Categoria (ex.: Livros, Devocionais, Artesanato...)</label>
            <input value={form.categoria} onChange={campo('categoria')} />
          </div>
          <div className="admin-field">
            <label>Moeda em que a loja vende</label>
            <select value={form.moeda} onChange={campo('moeda')}>
              {MOEDAS.map((m) => (
                <option key={m.codigo} value={m.codigo}>{m.label}</option>
              ))}
            </select>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: 6 }}>
              Todos os seus produtos e encomendas usarão esta moeda. Escolha conforme o país onde a sua loja opera.
            </p>
          </div>
          <div className="admin-field">
            <label>Descrição</label>
            <textarea rows={3} value={form.descricao} onChange={campo('descricao')} />
          </div>

          <div className="admin-field">
            <label>Localização</label>
            <button type="button" className="admin-btn admin-btn-secundario" onClick={usarLocalizacaoAtual} disabled={aLocalizar}>
              {aLocalizar ? 'A localizar…' : coords ? '✓ Localização definida — repetir' : 'Usar a minha localização atual'}
            </button>
            {coords && (
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: 6 }}>
                Lat {coords.latitude.toFixed(5)}, Lng {coords.longitude.toFixed(5)}
              </p>
            )}
          </div>

          <button type="submit" className="admin-btn" disabled={loading} style={{ width: '100%', marginTop: 8 }}>
            {loading ? 'A registar…' : 'Registar loja'}
          </button>
        </form>

        <p style={{ marginTop: 16, fontSize: '0.9rem' }}>
          Já tem conta? <Link to="/loja/login">Iniciar sessão</Link>
        </p>
      </div>
    </div>
  );
}
