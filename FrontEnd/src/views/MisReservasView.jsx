import { getUserId } from "../utils/session";
import { useEffect, useState } from "react";
import { formatFecha } from "./Talkcards";

const API_URL = "http://localhost:8080/api";

function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

export default function MisReservasView({ onIrACharlas }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [asistenciasConfirmadas, setAsistenciasConfirmadas] = useState([]);
  const [confirmando, setConfirmando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const cargar = async () => {
    const id_usuario = getUserId();

    console.log("Usuario obtenido:", id_usuario);

    if (!id_usuario) {
      setError("No se ha encontrado tu usuario. Vuelve a iniciar sesión.");
      setCargando(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/reserva/${id_usuario}`, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error al cargar las reservas");
      }

      const data = await res.json();
      setReservas(data);
    } catch (err) {
      setError(err.message || "No se han podido cargar tus reservas.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const cancelar = async (id_reserva) => {
    setError("");
    setMensaje("");
    const id_usuario = getUserId();

    try {
      const res = await fetch(`${API_URL}/cancelarReserva/${id_reserva}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id_usuario }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.mensaje || `Error ${res.status}`);
      setReservas((prev) => prev.filter((r) => r.id_reserva !== id_reserva));
    } catch (err) {
      setError(err.message || "No se ha podido cancelar la reserva.");
    }
  };

  const confirmarAsistencia = async (id_charla) => {
    setError("");
    setMensaje("");

    const id_usuario = getUserId();
    if (!id_usuario) {
      setError("No se ha encontrado tu usuario.");
      return;
    }

    setConfirmando(true);
    try {
      const res = await fetch(`${API_URL}/asistencias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id_usuario, id_charla }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.mensaje ||
            data.message ||
            "No se ha podido confirmar la asistencia.",
        );
      }

      setMensaje("¡Asistencia confirmada correctamente!");
      setAsistenciasConfirmadas((prev) => [...prev, id_charla]);
    } catch (err) {
      setError(err.message);
    } finally {
      setConfirmando(false);
    }
  };

  if (cargando) return <p>Cargando tus reservas…</p>;

  return (
    <section className="reservas">
      <h2>Mis reservas</h2>
      {mensaje && <p role="status">{mensaje}</p>}
      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      {reservas.length === 0 && !error && (
        <p>Todavía no tienes ninguna charla reservada.</p>
      )}

      <div className="charlas">
        {reservas.map((r) => (
          <article className="charla" key={r.id_reserva}>
            <h3>{r.titulo}</h3>
            <p className="charla-ponente">{r.ponente}</p>
            <p className="charla-descripcion">{r.descripcion}</p>
            <p className="charla-fecha">{formatFecha(r.fecha_charla)}</p>
            <p>Reservada el {formatFecha(r.fecha_reserva)}</p>

            <div className="charla-pie">
              <span className="charla-estado">{r.estado}</span>

              <button type="button" onClick={() => cancelar(r.id_reserva)}>
                Cancelar reserva
              </button>

              <button
                type="button"
                onClick={() => confirmarAsistencia(r.id_charla)}
                disabled={
                  confirmando || asistenciasConfirmadas.includes(r.id_charla)
                }
              >
                {asistenciasConfirmadas.includes(r.id_charla)
                  ? "Asistencia confirmada"
                  : confirmando
                    ? "Confirmando..."
                    : "Confirmar asistencia"}
              </button>
            </div>
          </article>
        ))}
      </div>

      <button type="button" onClick={onIrACharlas}>
        Ver charlas
      </button>
    </section>
  );
}
