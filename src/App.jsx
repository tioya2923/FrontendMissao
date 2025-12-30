import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Noticias from './components/Noticias/Noticias';
import NoticiaDetalhe from './components/Noticias/NoticiaDetalhe';

import CalendarioList from './components/CalendarioList';
import Fotografias from './components/Fotografias';
import Videos from './components/Videos';

import CanticosPtTopicos from './components/CanticosList/CanticosPtTopicos';
import CanticosPorTopico from './components/CanticosList/CanticosPorTopico';
import CanticoCompleto from './components/CanticosList/CanticoCompleto';

import CanticosUbTopicos from './components/CanticosList/CanticosUbTopicos';
import CanticosUbPorTopico from './components/CanticosList/CanticosUbPorTopico';
import CanticoUbCompleto from './components/CanticosList/CanticoUbCompleto';

import CatecismoPtTopicos from './components/CatecismoPtList/CatecismoPtTopicos';
import CatecismoPtTitulos from './components/CatecismoPtList/CatecismoPtTitulos';
import CatecismoPtTexto from './components/CatecismoPtList/CatecismoPtTexto';
import Oracoes from './components/CatecismoPtList/Oracoes';

import CatecismoUbTopicos from './components/CatecismoUbList/CatecismoUbTopicos';
import CatecismoUbTitulos from './components/CatecismoUbList/CatecismoUbTitulos';
import CatecismoUbTexto from './components/CatecismoUbList/CatecismoUbTexto';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, paddingBottom: 80 }}>
        <Routes>

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
                  <Noticias />
                </div>
                <CalendarioList />
                <Fotografias />
                <Videos />
              </div>
            }
          />

          {/* Notícias */}
          <Route path="/noticias/:id" element={<NoticiaDetalhe />} />

          {/* Alias Catequese → Catecismo */}
          <Route path="/catequese/portugues" element={<CatecismoPtTopicos />} />
          <Route path="/catequese/umbundu" element={<CatecismoUbTopicos />} />

          {/* Catecismo Português */}
          <Route path="/catecismo/portugues" element={<CatecismoPtTopicos />} />
          <Route path="/catecismo/portugues/topico/:topicoId" element={<CatecismoPtTitulos />} />
          <Route path="/catecismo/portugues/titulo/:id" element={<CatecismoPtTexto />} />
          <Route path="/catecismo/portugues/topicos/oracoes" element={<Oracoes />} />

          {/* Catecismo Umbundu */}
          <Route path="/catecismo/umbundu" element={<CatecismoUbTopicos />} />
          <Route path="/catecismo/umbundu/topico/:topicoId" element={<CatecismoUbTitulos />} />
          <Route path="/catecismo/umbundu/titulo/:id" element={<CatecismoUbTexto />} />

          {/* Cânticos Português */}
          <Route path="/canticos/portugues" element={<CanticosPtTopicos />} />
          <Route path="/canticos/portugues/topico/:nome" element={<CanticosPorTopico />} />
          <Route path="/canticos/portugues/cantico/:slug" element={<CanticoCompleto />} />

          {/* Cânticos Umbundu */}
          <Route path="/canticos/umbundu" element={<CanticosUbTopicos />} />
          <Route path="/canticos/umbundu/topicos/:nome" element={<CanticosUbPorTopico />} />
          <Route path="/canticos/umbundu/cantico/:slug" element={<CanticoUbCompleto />} />

          {/* Calendário */}
          <Route path="/calendario" element={<CalendarioList />} />

        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
