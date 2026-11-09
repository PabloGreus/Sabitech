export class salas {
  constructor(id_sala, nombre, capacidad, ubicacion, estado) {
    this.id_sala = id_sala;
    this.nombre = nombre;
    this.capacidad = capacidad;
    this.ubicacion = ubicacion;
    this.estado = estado;
  }

  static fromJson(json) {
    return new salas(
      json.id_sala,
      json.nombre,
      json.capacidad,
      json.ubicacion,
      json.estado,
    );
  }

  toJson() {
    return {
      id_sala: this.id_sala,
      nombre: this.nombre,
      capacidad: this.capacidad,
      ubicacion: this.ubicacion,
      estado: this.estado,
    };
  }
}
