import { useState } from "react";
import "../css/Login.css"; // Puedes reutilizar o adaptar tus estilos de login

const REGISTER_ENDPOINT = "http://localhost:8080/api/register";

// Props opcional: onSuccess(usuario) se ejecuta cuando el registro es correcto
export default function Register({ onSuccess, onIrALogin }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);
    console.log("Enviando registro:", nombre, correo, contrasena);
    try {
      const res = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ nombre, correo, contraseña: contrasena }),
      });
      const data = await res.json().catch(() => ({}));
      console.log("Respuesta del registro:", res.status, data);

      if (!res.ok) {
        // 422 = error de validación o correo duplicado · 500 = error del servidor
        const detalle = data.errors
          ? Object.values(data.errors).flat().join(" ")
          : data.message;
        throw new Error(detalle || `Error ${res.status}`);
      }
      console.log("Registro correcto:", data);
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
      <h2>Crear cuenta</h2>

      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        type="text"
        autoComplete="name"
        required
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

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
        autoComplete="new-password"
        required
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      <button type="submit" disabled={enviando}>
        {enviando ? "Registrando…" : "Registrarse"}
      </button>
      <p>
        ¿Ya tienes cuenta?{" "}
        <button type="button" onClick={onIrALogin}>
          Inicia sesión
        </button>
      </p>
    </form>
  );
}
