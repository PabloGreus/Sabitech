import { useState } from "react";
import Header from "./components/Header";
import "./css/App.css";
import TalkCard from "./views/Talkcards";
import LoginView from "./views/LoginView";
import RegisterView from "./views/Registerview";
import ReservarView from "./views/ReservarView";
import MisReservasView from "./views/MisReservasView";

export default function App() {
  const [vista, setVista] = useState("login");
  const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);

  const haySesion = () => Boolean(localStorage.getItem("user"));

  const irA = (destino) => {
    const necesitaSesion = ["talks", "reservar", "misreservas"];
    console.log(`[irA] Destino: "${destino}" · ¿hay sesión?:`, haySesion());
    if (necesitaSesion.includes(destino) && !haySesion()) {
      console.log("[irA] Sin sesión, redirigiendo a login");
      setVista("login");
    } else {
      setVista(destino);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCharlaSeleccionada(null);
    setVista("login");
  };

  const elegirCharla = (charla) => {
    console.log("[2] App recibe la charla elegida:", charla);
    setCharlaSeleccionada(charla);
    irA("reservar");
  };

  return (
    <>
      <Header
        onIrALogin={() => setVista("login")}
        onIrARegistro={() => setVista("register")}
        onIrACharlas={() => irA("talks")}
        onIrAMisReservas={() => irA("misreservas")}
      />

      {vista === "login" && (
        <LoginView
          onSuccess={() => setVista("talks")}
          onIrARegistro={() => setVista("register")}
        />
      )}

      {vista === "register" && (
        <RegisterView
          onSuccess={() => setVista("talks")}
          onIrALogin={() => setVista("login")}
        />
      )}

      {vista === "talks" && (
        <>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
          <TalkCard onReservar={elegirCharla} />
        </>
      )}

      {vista === "reservar" && (
        <ReservarView
          charla={charlaSeleccionada}
          onVolver={() => irA("talks")}
          onVerReservas={() => irA("misreservas")}
        />
      )}

      {vista === "misreservas" && (
        <MisReservasView onIrACharlas={() => irA("talks")} />
      )}
    </>
  );
}
