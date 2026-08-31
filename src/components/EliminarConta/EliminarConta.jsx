import React from "react";

export default function EliminarConta() {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 32, maxWidth: 900, margin: '32px auto', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ fontSize: '1.05rem', lineHeight: 1.7, textAlign: 'justify' }}>

        <h1 style={{ fontSize: '1.6rem', marginBottom: 4 }}>Eliminação de conta e dados — Ndatava</h1>
        <p style={{ color: '#666', marginTop: 0, marginBottom: 24 }}>Última atualização: 31 de agosto de 2026</p>

        <p>
          Se tem uma conta de vendedor (loja) ou de administrador na aplicação <strong>Ndatava</strong> e pretende
          eliminá-la, juntamente com os dados associados, siga os passos abaixo.
        </p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>Como pedir a eliminação</h2>
        <p>
          Envie um email para{' '}
          <a href="mailto:ndatava3@gmail.com?subject=Elimina%C3%A7%C3%A3o%20de%20conta%20Ndatava">ndatava3@gmail.com</a>{' '}
          a partir do endereço de email associado à sua conta, com o assunto <strong>"Eliminação de conta Ndatava"</strong>,
          indicando:
        </p>
        <ul>
          <li>O nome da sua loja (se for conta de vendedor) ou o seu nome de utilizador;</li>
          <li>O email usado para criar a conta;</li>
          <li>Que pretende a eliminação total da conta e dos dados associados.</li>
        </ul>
        <p>
          Processamos o pedido manualmente e confirmamos por email assim que a eliminação estiver concluída,
          normalmente dentro de 30 dias.
        </p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>Que dados são eliminados</h2>
        <p>Ao confirmar a eliminação, apagamos permanentemente:</p>
        <ul>
          <li>Os dados da conta (nome, email, palavra-passe cifrada);</li>
          <li>Os dados da loja e dos produtos publicados, se aplicável;</li>
          <li>As imagens carregadas associadas à conta.</li>
        </ul>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>Que dados podem ser mantidos</h2>
        <p>
          Por obrigações legais e contabilísticas, mantemos o histórico de encomendas já concluídas
          (produtos, valores e data) mesmo após a eliminação da conta, sem dados de identificação direta
          associados à conta eliminada.
        </p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>Perfil pessoal (utilizadores sem conta de vendedor)</h2>
        <p>
          Se apenas usa o separador "Eu" da aplicação (nome, foto, datas dos sacramentos), esses dados ficam
          guardados apenas no seu telemóvel — nunca chegam aos nossos servidores. Para os eliminar, basta
          desinstalar a aplicação ou limpar os dados da app nas definições do telemóvel.
        </p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>Mais informação</h2>
        <p>
          Para mais detalhes sobre como tratamos os dados, consulte a nossa{' '}
          <a href="/privacidade">Política de Privacidade</a>.
        </p>

      </div>
    </div>
  );
}
