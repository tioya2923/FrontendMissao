import React from "react";

export default function EliminarConta() {
  return (
    <div className="pagina-texto">
      <div className="texto-corrido">

        <h1 style={{ fontSize: '1.6rem', marginBottom: 4 }}>Eliminação de conta e dados — Ndatava</h1>
        <p style={{ color: 'var(--text-2)', marginTop: 0, marginBottom: 24 }}>Última atualização: 17 de outubro de 2026</p>

        <p>
          Pode eliminar a sua conta da aplicação <strong>Ndatava</strong>, juntamente com os dados associados. Há
          dois tipos de conta, e a eliminação é diferente em cada um.
        </p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>Conta para partilhar cânticos e grupos (na própria aplicação)</h2>
        <p>
          Se criou uma conta na aplicação para enviar cânticos a outras pessoas, ter contactos ou participar em grupos,
          pode eliminá-la a qualquer momento, de forma imediata:
        </p>
        <ol>
          <li>Abra a aplicação Ndatava e toque em <strong>Eu</strong>;</li>
          <li>Toque em <strong>Partilhas</strong> e depois no separador <strong>Conta</strong>;</li>
          <li>Toque em <strong>Eliminar conta</strong> e confirme.</li>
        </ol>
        <p>Ao eliminar, apagamos permanentemente:</p>
        <ul>
          <li>O seu nome, email, palavra-passe cifrada, código pessoal e definições de visibilidade;</li>
          <li>Os cânticos e gravações de voz que enviou e recebeu;</li>
          <li>Os seus contactos e pedidos de contacto;</li>
          <li>As suas publicações em grupos e a sua participação nos grupos. Se era a única pessoa administradora de um
            grupo, a administração passa ao membro mais antigo; se o grupo ficar sem membros, é apagado.</li>
        </ul>
        <p>
          Podemos manter, durante o tempo necessário para analisar abusos, uma cópia do conteúdo que tenha sido
          denunciado por outra pessoa, sem ligação à conta eliminada.
        </p>
        <p>
          Se já não consegue entrar na aplicação, use o email abaixo, a partir do endereço da conta.
        </p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>Conta de vendedor (loja) ou de administrador</h2>
        <p>Para estas contas, o pedido faz-se por email:</p>
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
          Se apenas usa o separador "Eu" da aplicação (nome, foto, datas dos sacramentos, programas de cânticos e
          gravações próprias), esses dados ficam guardados apenas no seu telemóvel — só seguem para os nossos
          servidores o que decidir partilhar com outras pessoas ou grupos, com uma conta. Para apagar os dados do
          telemóvel, basta desinstalar a aplicação ou limpar os dados da app nas definições do telemóvel.
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
