import React, { useEffect, useMemo, useState } from 'react';
import api from '../../api';
import './CalendarioList.css';

const DIAS_SEMANA = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
const ANOS = Array.from({ length: 2100 - 2026 + 1 }, (_, i) => 2026 + i);

// Cores litúrgicas (as mesmas da app)
const COR_MAP = {
    branco: { bg: '#ffffff', claro: true },
    vermelho: { bg: '#c0392b' },
    verde: { bg: '#27ae60' },
    roxo: { bg: '#6c3483' },
    morado: { bg: '#6c3483' },
    rosa: { bg: '#d45f9e' },
    preto: { bg: '#1a1a1a' },
    dourado: { bg: '#c9a84c' },
};
const COR_PADRAO = { bg: '#8a8178' };

function coresDoDia(descricao) {
    const parte = (descricao || '').split(/[–-]/)[0].toLowerCase();
    const nomes = Object.keys(COR_MAP).filter(k => parte.includes(k));
    if (nomes.length === 0) return [COR_PADRAO];
    // "Verde ou branco" aparece duas vezes se houver sinónimos iguais; ficamos com cores distintas
    const vistas = [];
    nomes.forEach(n => { if (!vistas.some(c => c.bg === COR_MAP[n].bg)) vistas.push(COR_MAP[n]); });
    return vistas;
}

function paraISO(data) {
    const a = data.getFullYear();
    const m = String(data.getMonth() + 1).padStart(2, '0');
    const d = String(data.getDate()).padStart(2, '0');
    return `${a}-${m}-${d}`;
}

const html = (valor) => ({ __html: valor });

export default function CalendarioList() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [dataBase, setDataBase] = useState(new Date());
    const [mesSelecionado, setMesSelecionado] = useState(dataBase.getMonth());
    const [anoSelecionado, setAnoSelecionado] = useState(dataBase.getFullYear());

    useEffect(() => {
        api.get('/api/calendario')
            .then(res => setEventos(Array.isArray(res.data) ? res.data : []))
            .catch(() => setErro(true))
            .finally(() => setLoading(false));
    }, []);

    const irParaMesAno = () => {
        const nova = new Date(dataBase);
        nova.setDate(1);
        nova.setFullYear(anoSelecionado);
        nova.setMonth(mesSelecionado);
        setDataBase(nova);
    };

    const irParaHoje = () => {
        const hoje = new Date();
        setDataBase(hoje);
        setMesSelecionado(hoje.getMonth());
        setAnoSelecionado(hoje.getFullYear());
    };

    const mudarSemana = (delta) => {
        const nova = new Date(dataBase);
        nova.setDate(nova.getDate() + delta * 7);
        setDataBase(nova);
        setMesSelecionado(nova.getMonth());
        setAnoSelecionado(nova.getFullYear());
    };

    const hojeISO = paraISO(new Date());

    const dias = useMemo(() => {
        const inicio = new Date(dataBase);
        inicio.setDate(dataBase.getDate() - dataBase.getDay());
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(inicio);
            d.setDate(inicio.getDate() + i);
            return { numero: d.getDate(), semana: DIAS_SEMANA[d.getDay()], iso: paraISO(d) };
        });
    }, [dataBase]);

    const primeiro = new Date(dias[0].iso + 'T00:00:00');
    const ultimo = new Date(dias[6].iso + 'T00:00:00');
    const rotuloSemana = primeiro.getMonth() === ultimo.getMonth()
        ? `${MESES[primeiro.getMonth()]} ${primeiro.getFullYear()}`
        : `${MESES[primeiro.getMonth()]} – ${MESES[ultimo.getMonth()]} ${ultimo.getFullYear()}`;

    return (
        <div className="calendario">
            <h2 className="calendario-titulo">Calendário Litúrgico</h2>

            <div className="calendario-barra">
                <div className="calendario-seletores">
                    <select aria-label="Mês" value={mesSelecionado} onChange={e => setMesSelecionado(Number(e.target.value))}>
                        {MESES.map((mes, i) => <option key={mes} value={i}>{mes}</option>)}
                    </select>
                    <select aria-label="Ano" value={anoSelecionado} onChange={e => setAnoSelecionado(Number(e.target.value))}>
                        {ANOS.map(ano => <option key={ano} value={ano}>{ano}</option>)}
                    </select>
                    <button onClick={irParaMesAno}>Ir</button>
                </div>
                <div className="calendario-navegacao">
                    <button className="btn-contorno" onClick={() => mudarSemana(-1)}>‹ Anterior</button>
                    <button onClick={irParaHoje}>Hoje</button>
                    <button className="btn-contorno" onClick={() => mudarSemana(1)}>Próximo ›</button>
                </div>
                <div className="calendario-semana">{rotuloSemana}</div>
            </div>

            {loading && <div className="loading">A carregar o calendário…</div>}
            {erro && <div className="erro">Não foi possível carregar o calendário.</div>}

            <div className="calendario-grid">
                {dias.map(dia => {
                    const doDia = eventos.filter(ev => (ev.data || ev.Data || '').slice(0, 10) === dia.iso);
                    const primeiraDesc = doDia[0] ? (doDia[0].descricao || doDia[0]['descrição'] || '') : '';
                    const cores = doDia.length ? coresDoDia(primeiraDesc) : [];
                    const cor = cores[0];
                    const dupla = cores.length >= 2;
                    const fundoBadge = !cor ? 'transparent'
                        : dupla ? `linear-gradient(90deg, ${cores[0].bg} 50%, ${cores[1].bg} 50%)`
                        : cor.bg;
                    const textoClaro = cores.some(c => c.claro);
                    return (
                        <article
                            key={dia.iso}
                            className={`calendario-dia${dia.iso === hojeISO ? ' hoje' : ''}${doDia.length ? '' : ' vazio'}`}
                            style={cor ? { borderLeftColor: cor.claro ? '#b0aaa2' : cor.bg } : undefined}
                        >
                            <header className="calendario-dia-topo">
                                <span className="calendario-dia-semana">{dia.semana}</span>
                                <span
                                    className={`calendario-dia-num${cor ? '' : ' sem-cor'}${textoClaro ? ' texto-escuro' : ''}`}
                                    style={{ background: fundoBadge }}
                                >
                                    {dia.numero}
                                </span>
                            </header>
                            {doDia.map((ev, i) => {
                                const descricao = ev.descricao || ev['descrição'];
                                const observacoes = ev.observacoes || ev['observações'];
                                return (
                                    <div className="calendario-evento" key={ev.id ?? i}>
                                        {ev.titulo && <h3 dangerouslySetInnerHTML={html(ev.titulo)} />}
                                        {descricao && <p className="descricao" dangerouslySetInnerHTML={html(descricao)} />}
                                        {ev.leituras && <p className="meta" dangerouslySetInnerHTML={html(ev.leituras)} />}
                                        {observacoes && <p className="meta" dangerouslySetInnerHTML={html(observacoes)} />}
                                    </div>
                                );
                            })}
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
