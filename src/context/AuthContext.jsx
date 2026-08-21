import { useState, useCallback } from 'react';
import api from '../api';
import { AuthContext } from './authContextObject';

const TOKEN_KEY = 'gestor_token';
const NOME_KEY = 'gestor_nome';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [nome, setNome] = useState(() => localStorage.getItem(NOME_KEY));

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(NOME_KEY, data.nome);
    setToken(data.token);
    setNome(data.nome);
  }, []);

  // Autentica com um token já emitido noutro sítio (ex.: a app móvel, depois de
  // validar as credenciais do gestor diretamente contra /api/auth/login), sem
  // pedir a password outra vez.
  const entrarComToken = useCallback((novoToken, novoNome) => {
    localStorage.setItem(TOKEN_KEY, novoToken);
    localStorage.setItem(NOME_KEY, novoNome);
    setToken(novoToken);
    setNome(novoNome);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NOME_KEY);
    setToken(null);
    setNome(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, nome, isAuthenticated: !!token, login, entrarComToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
