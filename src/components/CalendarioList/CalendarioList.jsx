
import React, { useEffect, useState, useRef } from 'react';
import api from '../../api';
import './CalendarioList.css';

export default function CalendarioList() {
    // Estado principal
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataBase, setDataBase] = useState(new Date());

    // Carregar eventos
    useEffect(() => {
        api.get('/api/calendario')
            .then(res => {
                setEventos(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Constantes
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    // Navegação customizada
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const [mesSelecionado, setMesSelecionado] = useState(dataBase.getMonth());
    const [openMes, setOpenMes] = useState(false);
    const mesRef = useRef();
    const [anoSelecionado, setAnoSelecionado] = useState(dataBase.getFullYear());
    const [openAno, setOpenAno] = useState(false);
    const anoRef = useRef();

    // Geração de anos para o select (2026 até 2100)
    const anos = [];
    for (let y = 2026; y <= 2100; y++) {
        anos.push(y);
    }

    const irParaMesAno = () => {
        const novaData = new Date(dataBase);
        novaData.setFullYear(anoSelecionado);
        novaData.setMonth(mesSelecionado);
        setDataBase(novaData);
    };

    const irParaHoje = () => {
        const hoje = new Date();
        setDataBase(hoje);
        setMesSelecionado(hoje.getMonth());
        setAnoSelecionado(hoje.getFullYear());
    };

    const mudarSemana = (delta) => {
        const novaData = new Date(dataBase);
        novaData.setDate(novaData.getDate() + delta * 7);
        setDataBase(novaData);
        setMesSelecionado(novaData.getMonth());
        setAnoSelecionado(novaData.getFullYear());
    };

    // Cálculo dos 8 dias, agrupados de 2 em 2, começando e terminando no domingo
    const diaSemanaBase = dataBase.getDay();
    // Encontrar o domingo anterior ou igual à dataBase
    const inicio = new Date(dataBase);
    inicio.setDate(dataBase.getDate() - diaSemanaBase);

    // Gerar 8 dias consecutivos, incluindo a data completa (yyyy-mm-dd)
    const diasOito = Array.from({ length: 8 }, (_, idx) => {
        const data = new Date(inicio);
        data.setDate(inicio.getDate() + idx);
        // Formato ISO para comparar datas (yyyy-mm-dd)
        const dataISO = data.toISOString().slice(0, 10);
        return {
            dia: data.getDate(),
            mes: data.toLocaleString('default', { month: 'long' }),
            ano: data.getFullYear(),
            diaSemana: diasSemana[data.getDay()],
            dataISO
        };
    });

    // Agrupar de 2 em 2
    const grupos = [];
    for (let i = 0; i < 8; i += 2) {
        grupos.push([diasOito[i], diasOito[i + 1]]);
    }

    // Render
    return (
        <div className="section">

            <h2>Calendário Litúrgico</h2>

            <div className="calendario-navegacao-custom">
                {/* ...navegação existente... */}
                {/* Dropdown customizado de mês */}
                <span
                    style={{ position: 'relative', display: 'inline-block', minWidth: 120 }}
                    ref={mesRef}
                    onMouseEnter={() => setOpenMes(true)}
                    onMouseLeave={() => setOpenMes(false)}
                >
                    <div
                        className="mes-select custom-select"
                        style={{ paddingRight: 24, cursor: 'pointer', border: '1.5px solid #0f0f0fff', borderRadius: 8, minWidth: 120, background: '#fff', height: 32, display: 'flex', alignItems: 'center', userSelect: 'none' }}
                    >
                        <span style={{ flex: 1 }}>{meses[mesSelecionado]}</span>
                        <span style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>▼</span>
                    </div>
                    {openMes && (
                        <div style={{
                            position: 'absolute',
                            top: 36,
                            left: 0,
                            zIndex: 10,
                            background: '#fff',
                            borderRadius: 8,
                            boxShadow: '0 4px 16px rgba(25, 118, 210, 0.10)',
                            minWidth: 120,
                            maxHeight: 260,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            padding: '4px 0',
                            scrollbarColor: '#000 #fff',
                            scrollbarWidth: 'thin'
                        }}>
                            {meses.map((mes, idx) => (
                                <div
                                    key={mes}
                                    className="dropdown-item"
                                    style={{
                                        padding: '8px 20px',
                                        cursor: 'pointer',
                                        background: idx === mesSelecionado ? '#e3f0fc' : '#fff',
                                        color: idx === mesSelecionado ? '#090909ff' : '#222',
                                        fontWeight: idx === mesSelecionado ? 600 : 400,
                                        transition: 'background 0.15s, color 0.15s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = '#f0f7ff'}
                                    onMouseOut={e => e.currentTarget.style.background = idx === mesSelecionado ? '#e3f0fc' : '#fff'}
                                    onClick={() => { setMesSelecionado(idx); setOpenMes(false); }}
                                >
                                    {mes}
                                </div>
                            ))}
                        </div>
                    )}
                </span>
                {/* Dropdown customizado de ano */}
                <span
                    style={{ position: 'relative', display: 'inline-block', marginLeft: 4, marginRight: 4, minWidth: 80 }}
                    ref={anoRef}
                    onMouseEnter={() => setOpenAno(true)}
                    onMouseLeave={() => setOpenAno(false)}
                >
                    <div
                        className="ano-select custom-select"
                        style={{ paddingRight: 24, cursor: 'pointer', border: '1.5px solid #0d0d0eff', borderRadius: 8, minWidth: 90, background: '#fff', height: 32, display: 'flex', alignItems: 'center', userSelect: 'none' }}
                    >
                        <span style={{ flex: 1 }}>{anoSelecionado}</span>
                        <span style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>▼</span>
                    </div>
                    {openAno && (
                        <div style={{
                            position: 'absolute',
                            top: 36,
                            left: 0,
                            zIndex: 10,
                            background: '#fff',
                            borderRadius: 8,
                            boxShadow: '0 4px 16px rgba(25, 118, 210, 0.10)',
                            maxHeight: 260,
                            minWidth: 90,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            padding: '4px 0',
                            scrollbarColor: '#000 #fff',
                            scrollbarWidth: 'thin'
                        }}>
                            {anos.map((ano) => (
                                <div
                                    key={ano}
                                    className="dropdown-item"
                                    style={{
                                        padding: '8px 20px',
                                        cursor: 'pointer',
                                        background: ano === anoSelecionado ? '#e3f0fc' : '#fff',
                                        color: ano === anoSelecionado ? '#0b0b0bff' : '#222',
                                        fontWeight: ano === anoSelecionado ? 600 : 400,
                                        transition: 'background 0.15s, color 0.15s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = '#f0f7ff'}
                                    onMouseOut={e => e.currentTarget.style.background = ano === anoSelecionado ? '#e3f0fc' : '#fff'}
                                    onClick={() => { setAnoSelecionado(ano); setOpenAno(false); }}
                                >
                                    {ano}
                                </div>
                            ))}
                        </div>
                    )}
                </span>
                <button onClick={irParaMesAno}>Ir</button>
                <button onClick={() => mudarSemana(-1)} style={{ marginLeft: 16 }}>Anterior</button>
                <button onClick={irParaHoje} style={{ marginLeft: 4, marginRight: 4, fontWeight: 'bold' }}>Hoje</button>
                <button onClick={() => mudarSemana(1)}>Próximo</button>
            </div>

            <div className="calendario-grid oito-dias">
                {grupos.map((par, idx) => (
                    <div className="calendario-grupo" key={idx}>
                        {par.map((dia, j) => {
                            // Filtrar eventos para o dia
                            const eventosDoDia = eventos.filter(ev => {
                                // Suporte para data no formato ISO (yyyy-mm-dd) ou Date
                                const dataStr = ev.data || ev.Data;
                                if (dataStr) {
                                    // Se vier como string ISO
                                    return dataStr.slice(0, 10) === dia.dataISO;
                                }
                                return false;
                            });
                            // Determinar cor do fundo e da borda do dia
                            let corFundoData = '#fff';
                            let corBordaDia = '#000';
                            if (eventosDoDia.length > 0) {
                                const desc = eventosDoDia.map(ev => (ev['descrição'] || ev['descricao'] || '')).join(' ').toLowerCase();
                                if (desc.includes('vermelho')) {
                                    corFundoData = 'red';
                                    corBordaDia = 'red';
                                } else if (desc.includes('roxo')) {
                                    corFundoData = 'purple';
                                    corBordaDia = 'purple';
                                } else if (desc.includes('verde')) {
                                    corFundoData = 'green';
                                    corBordaDia = 'green';
                                } else if (desc.includes('branco')) {
                                    corFundoData = '#fff';
                                    corBordaDia = '#fff';
                                }
                            }
                            return (
                                <div className="calendario-dia" key={j} style={{ border: `2px solid ${corBordaDia}` }}>
                                    <span
                                        className="calendario-dia-num"
                                        style={{
                                            background: corFundoData,
                                            border: `1px solid ${corBordaDia}`,
                                            borderRadius: '50%',
                                            width: 36,
                                            height: 36,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: corFundoData === 'red' ? '#fff' : '#000',
                                            fontWeight: 700,
                                            fontSize: '1.1em',
                                            position: 'absolute',
                                            top: 4,
                                            right: 4,
                                            zIndex: 2,
                                        }}
                                    >
                                        {dia.dia}
                                    </span>
                                    <div className="eventos-do-dia" style={{ marginRight: 8 }}>
                                        {eventosDoDia.length > 0 ? (
                                            eventosDoDia.map((ev, idxEv) => (
                                                <div
                                                    className="evento-item"
                                                    key={idxEv}
                                                    style={{
                                                        fontSize: '0.95em',
                                                        marginTop: 2,
                                                        color: '#111',
                                                        background: 'none',
                                                        borderRadius: 4,
                                                        padding: '2px 4px',
                                                        whiteSpace: 'pre-line',
                                                        wordBreak: 'break-word',
                                                        width: '100%',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {/* ...exibe apenas eventos, sem notícias... */}
                                                    {Object.entries(ev).map(([key, value]) => (
                                                        key !== 'data' && value && typeof value === 'string' && value.trim() !== '' ? (
                                                            <div key={key} style={{ marginBottom: 0 }}>
                                                                {key === 'titulo'
                                                                    ? <strong><span dangerouslySetInnerHTML={{ __html: value }} /></strong>
                                                                    : (['descrição', 'descricao', 'leituras', 'observações', 'observacoes'].includes(key)
                                                                        ? <span dangerouslySetInnerHTML={{ __html: value }} />
                                                                        : (<><strong>{key}:</strong> <span dangerouslySetInnerHTML={{ __html: value }} /></>))}
                                                            </div>
                                                        ) : null
                                                    ))}
                                                </div>
                                            ))
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
