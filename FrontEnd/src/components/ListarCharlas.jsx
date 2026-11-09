import { listCharla } from "../api/charlasApi";
export function ListarCharlasButton() {
  async function listarCharlas() {
    //TODO
    console.log("Listar Charlas");
    await listCharla();
  }
  return (
    <>
      <button onClick={listarCharlas}>Listar Charlas</button>
    </>
  );
}
