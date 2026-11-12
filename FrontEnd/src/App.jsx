import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./css/App.css";
import TalkCard from "./views/Talkcards";
import LoginView from "./views/LoginView";
import RegisterView from "./views/Registerview";

export default function App() {
  const [vista, setVista] = useState("login");

  useEffect(() => {
    if (localStorage.getItem("user") || localStorage.getItem("token")) {
      setVista("talks");
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setVista("login");
  };

  return (
    <>
      <Header />

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
          <TalkCard />
        </>
      )}
    </>
  );
}
