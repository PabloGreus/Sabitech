import { useState } from "react";
import { formatFecha } from "./Talkcards";
import { getUserId } from "../utils/session";

const API_URL = "http://localhost:8080/api";

export default function ReservarView({ charla, onVolver, onVerReservas }) {
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [hecha, setHecha] = useState(false);

  if (!charla) {
    return (
      <section>
        <p>No has seleccionado ninguna charla.</p>
        <button onClick={onVolver}>Volver a las charlas</button>
      </section>
    );
  }

  const confirmar = async () => {
    setError("");
    setMensaje("");

    const id_usuario = getUserId();
    if (!id_usuario) {
      setError("No se ha encontrado tu usuario. Vuelve a iniciar sesión.");
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/ReservaCharla`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id_usuario,
          id_charla: charla.id_charla,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMensaje(data.mensaje || "Reserva realizada correctamente.");
        setHecha(true);
      } else if (res.status === 409) {
        setError(data.mensaje || "Ya tienes reservada esta charla.");
      } else if (data.errors) {
        setError(Object.values(data.errors).flat().join(" "));
      } else {
        setError(data.mensaje || data.message || `Error ${res.status}`);
      }
    } catch {
      setError("No hay conexión con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="reservar">
      <h2>Reservar plaza</h2>

      <article className="charla">
        <h3>{charla.titulo}</h3>
        <p className="charla-ponente">{charla.ponente}</p>
        <p className="charla-descripcion">{charla.descripcion}</p>
        <p className="charla-fecha">{formatFecha(charla.fecha)}</p>
        <span className="charla-estado">{charla.estado}</span>
      </article>

      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}
      {mensaje && <p role="status">{mensaje}</p>}

      {!hecha ? (
        <button onClick={confirmar} disabled={enviando}>
          {enviando ? "Reservando…" : "Confirmar reserva"}
        </button>
      ) : (
        <button onClick={onVerReservas}>Ver mis reservas</button>
      )}
      <button type="button" onClick={onVolver}>
        Volver a las charlas
      </button>
    </section>
  );
}
