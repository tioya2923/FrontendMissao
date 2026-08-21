import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import CampoPassword from './CampoPassword';
import './Admin.css';

export default function AdminLogin() {
  const { login, entrarComToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const destino = location.state?.from || '/admin';

  // Ponte para a app móvel: depois de validar as credenciais do gestor no
  // ecrã "Vender no Ndatava", a app abre esta página com o token já emitido,
  // para o administrador não ter de os escrever outra vez no navegador.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const nome = params.get('nome');
    if (token && nome) {
      entrarComToken(token, nome);
      navigate('/admin', { replace: true });
    }
  }, [location.search, entrarComToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate(destino, { replace: true });
    } catch {
      setErro('Credenciais inválidas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1 className="admin-titulo">Administração</h1>
        <p className="admin-subtitulo">Inicie sessão com a sua conta de Gestor.</p>

        {erro && <div className="admin-erro">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <CampoPassword
            id="password" label="Palavra-passe" value={password}
            onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required
          />
          <button type="submit" className="admin-btn" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'A entrar…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
