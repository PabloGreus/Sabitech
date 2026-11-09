import Header from "./components/Header";
import "./css/App.css";
import Logo from "./components/logo";
import { ListarCharlasButton } from "./components/ListarCharlas";

export default function App() {
  return (
    <>
      <Header />
      <ListarCharlasButton />
      <main>
        <h1 id="inicio">Bienvenido a SABITECH WEB</h1>
      </main>
    </>
  );
}
