export class Charla {
  constructor(id_asistencia, id_usuario, id_charla, fecha_asistencia, estado) {
    this.id_charla = id_asistencia;
    this.titulo = id_charla;
    this.descripcion = descripcion;
    this.id_usuario = id_usuario;
    this.fecha_Asistencia = fecha_asistencia;
    this.estado = estado;
  }

  static fromJson(json) {
    return new Charla(
      json.id_asistencia,
      json.id_usuario,
      json.id_charla,
      json.fecha_asistencia,
      json.estado,
    );
  }

  toJson() {
    return {
      id_asistencia: this.id_asistencia,
      id_usuario: this.id_usuario,
      id_charla: this.id_charla,
      fecha_asistencia: this.fecha_asistencia,
      estado: this.estado,
    };
  }
}
