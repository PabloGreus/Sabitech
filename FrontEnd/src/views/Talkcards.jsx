import { useEffect, useState } from "react";
import "../css/talkcards.css";

const API_URL = "http://localhost:8080/api";
const CHARLAS_ENDPOINT = `${API_URL}/charlas`;

// "2027-04-15 10:00:00" -> "15/04/2027 · 10:00"
export function formatFecha(fecha) {
  const m = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/.exec(fecha || "");
  return m ? `${m[3]}/${m[2]}/${m[1]} · ${m[4]}:${m[5]}` : fecha;
}

function Charla({ charla, onReservar }) {
  return (
    <article className="charla">
      <h3>{charla.titulo}</h3>
      <p className="charla-ponente">{charla.ponente}</p>
      <p className="charla-descripcion">{charla.descripcion}</p>
      <p className="charla-fecha">{formatFecha(charla.fecha)}</p>
      <div className="charla-pie">
        <span className="charla-estado">{charla.estado}</span>
        <button type="button" onClick={() => onReservar(charla)}>
          Reservar plaza
        </button>
      </div>
    </article>
  );
}

export default function TalkCard({ onReservar }) {
  const [charlas, setCharlas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(CHARLAS_ENDPOINT)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(setCharlas)
      .catch(() => setError("No se han podido cargar las charlas."))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando charlas…</p>;
  if (error) return <p className="charla-error">{error}</p>;
  if (charlas.length === 0) return <p>No hay charlas disponibles.</p>;

  return (
    <div className="charlas">
      {charlas.map((c) => (
        <Charla key={c.id_charla} charla={c} onReservar={onReservar} />
      ))}
    </div>
  );
}
