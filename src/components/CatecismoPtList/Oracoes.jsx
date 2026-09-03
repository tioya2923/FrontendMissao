
import { Navigate } from "react-router-dom";

// Orações é só mais um tópico do Catecismo (id 114 em Português) — esta
// rota antiga mostrava sempre a entrada #1 fixa (nunca as 43 orações reais).
// Redireciona para a lista normal de títulos desse tópico, que já mostra
// tudo corretamente e fica sempre atualizada.
export default function Oracoes() {
  return <Navigate to="/catecismo/portugues/topico/114" replace />;
}
