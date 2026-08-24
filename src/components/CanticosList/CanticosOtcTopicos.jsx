
import React from "react";
import "./CanticosKmbTopicos.css";

// O Otchikwama ainda não tem nenhum cântico com letra autorizada — mostra
// logo o estado vazio, sem chamar nenhum endpoint (que não existe ainda).
export default function CanticosOtcTopicos() {
  return (
    <div className="canticos-kmb-topicos-container">
      <div style={{ color: "#888" }}>Ainda não há cânticos disponíveis neste idioma.</div>
    </div>
  );
}
