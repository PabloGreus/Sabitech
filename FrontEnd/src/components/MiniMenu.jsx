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
        {enlaces.map((e) => (
          <li key={e.texto}>
            <a
              href="#"
              onClick={(ev) => {
                ev.preventDefault();
                e.onClick?.();
                onNavegar();
              }}
            >
              {e.texto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
