import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLojaAuth } from '../../context/useLojaAuth';
import '../Admin/Admin.css';

export default function LojaLogin() {
  const { login } = useLojaAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/loja/painel', { replace: true });
    } catch {
      setErro('Credenciais inválidas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1 className="admin-titulo">Entrar na minha loja</h1>
        <p className="admin-subtitulo">Área reservada às lojas parceiras.</p>

        {erro && <div className="admin-erro">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
          </div>
          <div className="admin-field">
            <label htmlFor="password">Palavra-passe</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          </div>
          <button type="submit" className="admin-btn" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'A entrar…' : 'Entrar'}
          </button>
        </form>

        <p style={{ marginTop: 16, fontSize: '0.9rem' }}>
          Ainda não tem loja registada? <Link to="/loja/registar">Registar agora</Link>
        </p>
      </div>
    </div>
  );
}
