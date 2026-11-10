import Header from "./components/Header";
import "./css/App.css";
import Logo from "./components/logo";
import { ListarCharlasButton } from "./components/ListarCharlas";
import TalkCard from "./views/Talkcards";

export default function App() {
  return (
    <>
      <Header />
      <ListarCharlasButton />
      <TalkCard />
      <main>
        <h1 id="inicio">Bienvenido a SABITECH WEB</h1>
      </main>
    </>
  );
}
