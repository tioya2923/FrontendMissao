import { useState, useCallback } from 'react';
import api from '../api';
import { LojaAuthContext } from './lojaAuthContextObject';

const TOKEN_KEY = 'loja_token';
const NOME_KEY = 'loja_nome';
const ID_KEY = 'loja_id';

export function LojaAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [nome, setNome] = useState(() => localStorage.getItem(NOME_KEY));
  const [lojaId, setLojaId] = useState(() => localStorage.getItem(ID_KEY));

  const guardarSessao = (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(NOME_KEY, data.nome);
    localStorage.setItem(ID_KEY, String(data.lojaId));
    setToken(data.token);
    setNome(data.nome);
    setLojaId(data.lojaId);
  };

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/api/lojas/login', { email, password });
    guardarSessao(data);
  }, []);

  const registar = useCallback(async (payload) => {
    const { data } = await api.post('/api/lojas/registar', payload);
    guardarSessao(data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NOME_KEY);
    localStorage.removeItem(ID_KEY);
    setToken(null);
    setNome(null);
    setLojaId(null);
  }, []);

  return (
    <LojaAuthContext.Provider value={{ token, nome, lojaId, isAuthenticated: !!token, login, registar, logout }}>
      {children}
    </LojaAuthContext.Provider>
  );
}
