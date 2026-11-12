import React from "react";
import { ListarCharlasButton } from "../components/ListarCharlas";
import TalkCard from "./Talkcards";

export default function Inicio({ onLogout }) {
  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <p>Esta es la página principal de nuestra aplicación.</p>
      <button onClick={onLogout}>Cerrar sesión</button>
      <ListarCharlasButton />
      <TalkCard />
    </div>
  );
}
