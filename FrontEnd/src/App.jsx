import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./css/App.css";
import Logo from "./components/logo";
import { ListarCharlasButton } from "./components/ListarCharlas";
import TalkCard from "./views/Talkcards";
import LoginView from "./views/LoginView";
import MainViuw from "./views/MainView";
import RegisterView from "./views/Registerview";

export default function App() {
  const [logeado, setLogeado] = useState(false);

  useEffect(() => {
    comprobarsesionIniciada();
  }, []);

  async function comprobarsesionIniciada() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = await getUser();
        setLogeado(true);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <Header />
      {logeado ? <MainViuw /> : <RegisterView />}
      <main>
        <h1 id="inicio">Bienvenido a SABITECH WEB</h1>
      </main>
    </>
  );
}
