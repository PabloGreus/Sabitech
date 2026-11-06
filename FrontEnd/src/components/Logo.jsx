import logoImg from "../assets/Logo.svg";
import "../css/Logo.css";

export default function Logo() {
  return (
    <a href="#inicio" className="logo" aria-label="SABITECH WEB, ir al inicio">
      <img src={logoImg} alt="" className="logo__img" />
      <span className="logo__texto">
        SABITECH <span>WEB</span>
      </span>
    </a>
  );
}
