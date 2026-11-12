import { useState } from "react";
import "../css/Login.css";

const LOGIN_ENDPOINT = "http://localhost:8080/api/login";

// Props opcional: onSuccess(usuario) se ejecuta cuando el login es correcto
export default function Login({ onSuccess, onIrARegistro }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);
    console.log("Enviando login:", correo, contrasena);
    try {
      const res = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ correo, contraseña: contrasena }),
      });
      const data = await res.json().catch(() => ({}));
      console.log("Respuesta del login:", res.status, data);

      if (!res.ok) {
        // 401 = credenciales incorrectas · 422 = faltan campos (Laravel manda { errors: {...} })
        const detalle = data.errors
          ? Object.values(data.errors).flat().join(" ")
          : data.message;
        throw new Error(detalle || `Error ${res.status}`);
      }
      console.log("Login correcto:", data);
      const usuario = data.user ?? data;
      localStorage.setItem("user", JSON.stringify(usuario));
      if (data.token) localStorage.setItem("token", data.token);
      onSuccess?.(usuario);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "No hay conexión con el servidor."
          : err.message,
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="login" onSubmit={enviar}>
      <h2>Iniciar sesión</h2>

      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      <label htmlFor="correo">Correo electrónico</label>
      <input
        id="correo"
        type="email"
        autoComplete="email"
        required
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <label htmlFor="contrasena">Contraseña</label>
      <input
        id="contrasena"
        type="password"
        autoComplete="current-password"
        required
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      <button type="submit" disabled={enviando}>
        {enviando ? "Entrando…" : "Entrar"}
      </button>
      <p>
        ¿No tienes cuenta?{" "}
        <button type="button" onClick={onIrARegistro}>
          Regístrate
        </button>
      </p>
    </form>
  );
}
