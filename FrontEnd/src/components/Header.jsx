import { useState } from "react";
import Logo from "../assets/Logo.svg";
import MiniMenu from "./MiniMenu";
import "../css/Header.css";

const enlaces = [
  { texto: "Inicio", href: "#inicio" },
  { texto: "Charlas", href: "#charlas" },
  { texto: "Cómo funciona", href: "#funciones" },
  { texto: "Reservar", href: "#reservar" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="header">
      <a href="#inicio" className="logo">
        SABITECH <span>WEB</span>
      </a>
      <button
        className="header__toggle"
        onClick={() => setAbierto((prev) => !prev)}
        aria-expanded={abierto}
        aria-controls="menu-principal"
        aria-label="Abrir o cerrar el menú"
      >
        ☰
      </button>

      <MiniMenu
        enlaces={enlaces}
        abierto={abierto}
        onNavegar={() => setAbierto(false)}
      />
    </header>
  );
}
