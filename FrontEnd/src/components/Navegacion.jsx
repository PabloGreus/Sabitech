import { useState } from "react";

// Datos separados del JSX: si mañana añadimos un enlace, solo tocamos este array
const enlaces = [
  { texto: "Charlas", href: "#charlas" },
  { texto: "Cómo funciona", href: "#funciones" },
  { texto: "Reservar", href: "#reservar" },
];

export default function Navbar() {
  // Estado: ¿está desplegado el menú en móvil?
  const [abierto, setAbierto] = useState(false);

  // Alterna entre true y false usando el valor anterior
  const alternarMenu = () => setAbierto((prev) => !prev);

  return (
    <header className="navegacion">
      <a href="#inicio" className="navegacion__logo">
        SABITECH <span>WEB</span>
      </a>

      {/* aria-expanded y aria-controls informan a lectores de pantalla */}
      <button
        className="navegacion__toggle"
        onClick={alternarMenu}
        aria-expanded={abierto}
        aria-controls="menu-principal"
        aria-label="Abrir o cerrar el menú"
      >
        ☰
      </button>

      {/* Clase condicional: si abierto es true, añadimos "navbar__menu--abierto" */}
      <nav
        id="menu-principal"
        className={`navegacion__menu ${abierto ? "navegacion__menu--abierto" : ""}`}
      >
        <ul>
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              {/* Al pulsar un enlace, cerramos el menú */}
              <a href={enlace.href} onClick={() => setAbierto(false)}>
                {enlace.texto}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
