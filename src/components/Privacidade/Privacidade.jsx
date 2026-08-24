import React from "react";

export default function Privacidade() {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 32, maxWidth: 900, margin: '32px auto', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ fontSize: '1.05rem', lineHeight: 1.7, textAlign: 'justify' }}>

        <h1 style={{ fontSize: '1.6rem', marginBottom: 4 }}>Política de Privacidade</h1>
        <p style={{ color: '#666', marginTop: 0, marginBottom: 24 }}>Última atualização: 24 de agosto de 2026</p>

        <p>
          Esta política explica que dados a aplicação e o site <strong>Ndatava</strong> ("nós", "a aplicação")
          recolhem, para que servem, e como pode aceder-lhes ou pedir a sua eliminação.
          Ao usar a Ndatava, aceita esta política.
        </p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>1. Que dados recolhemos</h2>
        <p><strong>Conta e perfil:</strong> nome, email e palavra-passe (guardada de forma cifrada, nunca em texto simples),
          e, se preencher, fotografia de perfil, datas de sacramentos (nascimento, batismo, primeira comunhão, crisma,
          casamento, ordem), diocese e paróquia.</p>
        <p><strong>Localização:</strong> se autorizar, usamos a localização aproximada ou exata do dispositivo apenas para
          mostrar lojas e artigos mais próximos de si. Não é guardada nem partilhada — é usada no momento do pedido.</p>
        <p><strong>Biometria (impressão digital / Face ID):</strong> usada apenas para desbloquear a aplicação no seu
          próprio dispositivo. Nunca sai do telemóvel nem chega aos nossos servidores.</p>
        <p><strong>Fotografias:</strong> se optar por carregar uma foto de perfil, ou se for dono de uma loja parceira e
          carregar fotos de produtos, essas imagens ficam guardadas nos nossos servidores.</p>
        <p><strong>Marketplace:</strong> se comprar através da Ndatava, guardamos os dados da encomenda (produtos, valores,
          contacto) para que a loja parceira a possa preparar e entregar. Se for dono de uma loja, guardamos os dados da
          loja e dos produtos que publica.</p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>2. Para que usamos os dados</h2>
        <p>Para criar e gerir a sua conta, mostrar-lhe conteúdo relevante (lojas próximas, por exemplo), processar
          encomendas na loja, e manter a aplicação a funcionar em segurança. Não usamos os seus dados para publicidade,
          nem os vendemos a terceiros.</p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>3. Com quem partilhamos dados</h2>
        <p>Os dados de uma encomenda (nome, contacto, artigos pedidos) são partilhados apenas com a loja parceira à qual
          fez a encomenda, para que a possa preparar. Não partilhamos os seus dados com mais ninguém, exceto se exigido
          por lei.</p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>4. Onde ficam guardados os dados</h2>
        <p>Os dados ficam numa base de dados alojada por um fornecedor de serviços cloud, com ligação cifrada (HTTPS/TLS)
          entre a aplicação e os nossos servidores.</p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>5. Os seus direitos</h2>
        <p>Pode, a qualquer momento, editar o seu perfil dentro da aplicação, ou pedir-nos a eliminação completa da sua
          conta e dados associados, escrevendo para o email abaixo. Respondemos em até 30 dias.</p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>6. Crianças</h2>
        <p>A Ndatava não se dirige especificamente a crianças menores de 13 anos e não recolhe intencionalmente dados
          de crianças nessa faixa etária.</p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>7. Alterações a esta política</h2>
        <p>Podemos atualizar esta política ocasionalmente. A data no topo desta página indica a versão mais recente.</p>

        <h2 style={{ fontSize: '1.2rem', marginTop: 28 }}>8. Contacto</h2>
        <p>Para questões sobre privacidade ou para pedir a eliminação dos seus dados, escreva para{' '}
          <a href="mailto:ndatava3@gmail.com">ndatava3@gmail.com</a>.</p>

      </div>
    </div>
  );
}
