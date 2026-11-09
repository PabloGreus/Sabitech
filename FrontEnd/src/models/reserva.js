export class Charla {
  constructor(id_reserva, id_usuario, id_charla, fecha) {
    this.id_reserva = id_reserva;
    this.id_usuario = id_usuario;
    this.id_charla = id_charla;
    this.fecha = fecha;
  }

  static fromJson(json) {
    return new Charla(
      json.id_reserva,
      json.id_usuario,
      json.id_charla,
      json.fecha,
    );
  }

  toJson() {
    return {
      id_reserva: this.id_reserva,
      id_usuario: this.id_usuario,
      id_charla: this.id_charla,
      fecha: this.fecha,
    };
  }
}
