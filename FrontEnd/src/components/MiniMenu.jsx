import React from "react";
import "../css/MiniMenu.css";

export default function MiniMenu({ enlaces, abierto, onNavegar }) {
  return (
    <nav
      id="menu-principal"
      className={`minimenu ${abierto ? "minimenu--abierto" : ""}`}
      aria-label="Navegación principal"
    >
      <ul>
        {enlaces.map((enlace) => (
          <li key={enlace.href}>
            <a href={enlace.href} onClick={onNavegar}>
              {enlace.texto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
