export class Charla {
  constructor(id_charla, titulo, descripcion, id_usuario, estado) {
    this.id_charla = id_charla;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.id_usuario = id_usuario;
    this.fecha = fecha;
    this.estado = estado;
  }

  static fromJson(json) {
    return new Charla(
      json.id_charla,
      json.titulo,
      json.descripcion,
      json.id_usuario,
      json.fecha,
      json.estado,
    );
  }

  toJson() {
    return {
      id_charla: this.id_charla,
      titulo: this.titulo,
      descripcion: this.descripcion,
      id_usuario: this.id_usuario,
      fecha: this.fecha,
      estado: this.estado,
    };
  }
}
