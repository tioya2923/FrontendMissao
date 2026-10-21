import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import CalendarioList from './components/CalendarioList';

import Oracoes from './components/CatecismoPtList/Oracoes';
import CanticosTopicos from './components/Conteudo/CanticosTopicos';
import CanticosPorTopico from './components/Conteudo/CanticosPorTopico';
import CanticoCompleto from './components/Conteudo/CanticoCompleto';
import CatecismoTopicos from './components/Conteudo/CatecismoTopicos';
import CatecismoTopico from './components/Conteudo/CatecismoTopico';
import CatecismoTexto from './components/Conteudo/CatecismoTexto';

import Sobre from './components/Sobre/Sobre';
import Contacto from './components/Contacto/Contacto';
import Privacidade from './components/Privacidade/Privacidade';
import EliminarConta from './components/EliminarConta/EliminarConta';
import Apoiar from './components/Apoiar/Apoiar';
import AdminLogin from './components/Admin/AdminLogin';
import AdminHome from './components/Admin/AdminHome';
import AdminResourceCrud from './components/Admin/AdminResourceCrud';
import AdminEncomendas from './components/Admin/AdminEncomendas';
import AdminLojas from './components/Admin/AdminLojas';
import AdminVendas from './components/Admin/AdminVendas';
import AdminVersaoApp from './components/Admin/AdminVersaoApp';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import LojaLogin from './components/Loja/LojaLogin';
import LojaRegistar from './components/Loja/LojaRegistar';
import LojaPainel from './components/Loja/LojaPainel';
import LojaProtectedRoute from './components/Loja/LojaProtectedRoute';
import { LojaAuthProvider } from './context/LojaAuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
    <LojaAuthProvider>
    <Router>
      <Navbar />

      <main className="pagina">
        <Routes>
          {/* Contacto */}
          <Route path="/contacto" element={<Contacto />} />
          {/* Sobre */}
          <Route path="/sobre" element={<Sobre />} />
          {/* Política de Privacidade */}
          <Route path="/privacidade" element={<Privacidade />} />
          {/* Eliminação de conta e dados */}
          <Route path="/eliminar-conta" element={<EliminarConta />} />
          {/* Apoiar (doações voluntárias) */}
          <Route path="/apoiar" element={<Apoiar />} />

          {/* Administração */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path="/admin/encomendas" element={<ProtectedRoute><AdminEncomendas /></ProtectedRoute>} />
          <Route path="/admin/lojas" element={<ProtectedRoute><AdminLojas /></ProtectedRoute>} />
          <Route path="/admin/vendas" element={<ProtectedRoute><AdminVendas /></ProtectedRoute>} />
          <Route path="/admin/versao-app" element={<ProtectedRoute><AdminVersaoApp /></ProtectedRoute>} />
          <Route path="/admin/:key" element={<ProtectedRoute><AdminResourceCrud /></ProtectedRoute>} />

          {/* Área das lojas parceiras */}
          <Route path="/loja/login" element={<LojaLogin />} />
          <Route path="/loja/registar" element={<LojaRegistar />} />
          <Route path="/loja/painel" element={<LojaProtectedRoute><LojaPainel /></LojaProtectedRoute>} />

          {/* Página inicial */}
          <Route
            path="/"
            element={<CalendarioList />}
          />

          {/* Catecismo e orações: qualquer idioma (portugues, umbundu, latim, otchikwama, ou o código de um idioma novo) */}
          <Route path="/catequese/:idioma" element={<CatecismoTopicos />} />
          <Route path="/catecismo/:idioma" element={<CatecismoTopicos />} />
          <Route path="/catecismo/:idioma/topico/:topicoId" element={<CatecismoTopico />} />
          <Route path="/catecismo/:idioma/titulo/:id" element={<CatecismoTexto />} />
          <Route path="/catecismo/portugues/topicos/oracoes" element={<Oracoes />} />

          {/* Cânticos: qualquer idioma ("topicos" é o endereço antigo de alguns idiomas e continua a funcionar) */}
          <Route path="/canticos/:idioma" element={<CanticosTopicos />} />
          <Route path="/canticos/:idioma/topico/:slug" element={<CanticosPorTopico />} />
          <Route path="/canticos/:idioma/topicos/:slug" element={<CanticosPorTopico />} />
          <Route path="/canticos/:idioma/cantico/:slug" element={<CanticoCompleto />} />

          {/* Calendário */}
          <Route path="/calendario" element={<CalendarioList />} />

          <Route path="*" element={
            <div className="nao-encontrada">
              <h2>404 - Página não encontrada</h2>
              <p>O conteúdo que procura não existe ou foi movido.</p>
              <a href="/">Voltar para a Página Inicial</a>
            </div>
          } />

        </Routes>
      </main>

      <Footer />
    </Router>
    </LojaAuthProvider>
    </AuthProvider>
  );
}

export default App;
