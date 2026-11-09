export class Usuario {
  constructor(id_usuario, nombre, correo, contraseña, rol, fecha_creacion) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.correo = correo;
    this.senha = contraseña;
    this.rol = "usuario";
    this.fecha_creacion = new Date();
  }

  static fromJson(json) {
    return new Usuario(
      json.id_usuario,
      json.nombre,
      json.correo,
      json.contraseña,
      json.rol,
      json.fecha_creacion,
    );
  }

  toJson() {
    return {
      id_usuario: this.id_usuario,
      nombre: this.nombre,
      correo: this.correo,
      contraseña: this.senha,
      rol: this.rol,
      fecha_creacion: this.fecha_creacion,
    };
  }
}
