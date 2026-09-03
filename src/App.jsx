import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import CalendarioList from './components/CalendarioList';

import CanticosPtTopicos from './components/CanticosList/CanticosPtTopicos';
import CanticosPorTopico from './components/CanticosList/CanticosPorTopico';
import CanticoCompleto from './components/CanticosList/CanticoCompleto';

import CanticosUbTopicos from './components/CanticosList/CanticosUbTopicos';
import CanticosUbPorTopico from './components/CanticosList/CanticosUbPorTopico';
import CanticoUbCompleto from './components/CanticosList/CanticoUbCompleto';

import CanticosKmbTopicos from './components/CanticosList/CanticosKmbTopicos';
import CanticosKmbPorTopico from './components/CanticosList/CanticosKmbPorTopico';
import CanticoKmbCompleto from './components/CanticosList/CanticoKmbCompleto';

import CanticosOtcTopicos from './components/CanticosList/CanticosOtcTopicos';
import CanticosOtcPorTopico from './components/CanticosList/CanticosOtcPorTopico';
import CanticoOtcCompleto from './components/CanticosList/CanticoOtcCompleto';

import CanticosLatTopicos from './components/CanticosList/CanticosLatTopicos';
import CanticosLatPorTopico from './components/CanticosList/CanticosLatPorTopico';
import CanticoLatCompleto from './components/CanticosList/CanticoLatCompleto';

import CatecismoPtTopicos from './components/CatecismoPtList/CatecismoPtTopicos';
import CatecismoPtTitulos from './components/CatecismoPtList/CatecismoPtTitulos';
import CatecismoPtTexto from './components/CatecismoPtList/CatecismoPtTexto';
import Oracoes from './components/CatecismoPtList/Oracoes';

import CatecismoUbTopicos from './components/CatecismoUbList/CatecismoUbTopicos';
import CatecismoUbTitulos from './components/CatecismoUbList/CatecismoUbTitulos';
import CatecismoUbTexto from './components/CatecismoUbList/CatecismoUbTexto';

import CatecismoOtcTopicos from './components/CatecismoOtcList/CatecismoOtcTopicos';
import CatecismoOtcTitulos from './components/CatecismoOtcList/CatecismoOtcTitulos';
import CatecismoOtcTexto from './components/CatecismoOtcList/CatecismoOtcTexto';

import CatecismoLatTopicos from './components/CatecismoLatList/CatecismoLatTopicos';
import CatecismoLatTitulos from './components/CatecismoLatList/CatecismoLatTitulos';
import CatecismoLatTexto from './components/CatecismoLatList/CatecismoLatTexto';

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

      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, paddingBottom: 80 }}>
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
            element={
              <div style={{
                background: '#f7f7f7',
                borderBottom: '1.5px solid #e0e0e0',
                padding: '32px 0 24px 0',
                marginBottom: 32,
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
                  <CalendarioList />
                </div>
              </div>
            }
          />

          {/* Alias Catequese → Catecismo */}
          <Route path="/catequese/portugues" element={<CatecismoPtTopicos />} />
          <Route path="/catequese/umbundu" element={<CatecismoUbTopicos />} />
          <Route path="/catequese/latim" element={<CatecismoLatTopicos />} />
          <Route path="/catequese/otchikwama" element={<CatecismoOtcTopicos />} />

          {/* Catecismo Português */}
          <Route path="/catecismo/portugues" element={<CatecismoPtTopicos />} />
          <Route path="/catecismo/portugues/topico/:topicoId" element={<CatecismoPtTitulos />} />
          <Route path="/catecismo/portugues/titulo/:id" element={<CatecismoPtTexto />} />
          <Route path="/catecismo/portugues/topicos/oracoes" element={<Oracoes />} />

          {/* Catecismo Umbundu */}
          <Route path="/catecismo/umbundu" element={<CatecismoUbTopicos />} />
          <Route path="/catecismo/umbundu/topico/:topicoId" element={<CatecismoUbTitulos />} />
          <Route path="/catecismo/umbundu/titulo/:id" element={<CatecismoUbTexto />} />

          {/* Catecismo Latim */}
          <Route path="/catecismo/latim" element={<CatecismoLatTopicos />} />
          <Route path="/catecismo/latim/topico/:topicoId" element={<CatecismoLatTitulos />} />
          <Route path="/catecismo/latim/titulo/:id" element={<CatecismoLatTexto />} />

          {/* Catecismo Otchikwama (Ordem da Missa) */}
          <Route path="/catecismo/otchikwama" element={<CatecismoOtcTopicos />} />
          <Route path="/catecismo/otchikwama/topico/:topicoId" element={<CatecismoOtcTitulos />} />
          <Route path="/catecismo/otchikwama/titulo/:id" element={<CatecismoOtcTexto />} />

          {/* Cânticos Português */}
          <Route path="/canticos/portugues" element={<CanticosPtTopicos />} />
          <Route path="/canticos/portugues/topico/:nome" element={<CanticosPorTopico />} />
          <Route path="/canticos/portugues/cantico/:slug" element={<CanticoCompleto />} />

          {/* Cânticos Umbundu */}
          <Route path="/canticos/umbundu" element={<CanticosUbTopicos />} />
          <Route path="/canticos/umbundu/topicos/:nome" element={<CanticosUbPorTopico />} />
          <Route path="/canticos/umbundu/cantico/:slug" element={<CanticoUbCompleto />} />

          {/* Cânticos Kimbundu */}
          <Route path="/canticos/kimbundu" element={<CanticosKmbTopicos />} />
          <Route path="/canticos/kimbundu/topicos/:nome" element={<CanticosKmbPorTopico />} />
          <Route path="/canticos/kimbundu/cantico/:slug" element={<CanticoKmbCompleto />} />

          {/* Cânticos Latim */}
          <Route path="/canticos/latim" element={<CanticosLatTopicos />} />
          <Route path="/canticos/latim/topico/:nome" element={<CanticosLatPorTopico />} />
          <Route path="/canticos/latim/cantico/:slug" element={<CanticoLatCompleto />} />

          {/* Cânticos Otchikwama */}
          <Route path="/canticos/otchikwama" element={<CanticosOtcTopicos />} />
          <Route path="/canticos/otchikwama/topico/:nome" element={<CanticosOtcPorTopico />} />
          <Route path="/canticos/otchikwama/cantico/:slug" element={<CanticoOtcCompleto />} />

          {/* Calendário */}
          <Route path="/calendario" element={<CalendarioList />} />

          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <h2>404 - Página não encontrada</h2>
              <p>O conteúdo que procura não existe ou foi movido.</p>
              <a href="/" style={{ color: '#007bff' }}>Voltar para a Página Inicial</a>
            </div>
          } />

        </Routes>
      </div>

      <Footer />
    </Router>
    </LojaAuthProvider>
    </AuthProvider>
  );
}

export default App;
