Create DATABASE Sabitech;

use Sabitech;

create table usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
);

create table usuarios_admin (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
);

create table usuario_ponente(
    id_ponente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    biografia TEXT NOT NULL,
);

create table tockens_qr (

);

create table charlas (
    id_usuario INT NOT NULL,
    id_charla INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado Enum(proximamente, en_curso, finalizada, cancelada) default 'proximamente',
    
);

create table Reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_charla INT NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado Enum(confirmada, cancelada) default 'confirmada',
    
);

create table salas (
    id_sala INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    capacidad INT NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    estado Enum(disponible, ocupada, en_mantenimiento) default 'disponible',
    
);

create table asisitencias (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_charla INT NOT NULL,
    fecha_asistencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado Enum(presente, ausente) default 'ausente',
    
);


------------------------------------------Usuarios------------------------------------------------
CREATE USER 'lector'@'%' IDENTIFIED BY 'O4N9a-^Zl@hLEEHO&6aX#led&TfCxj';
GRANT SELECT ON Sabitech.* TO 'lector'@'%';
FLUSH PRIVILEGES;
-- usuario solo lectura.

Create user 'Desarrollador@%' IDENTIFIED BY 'n1z]1NaJ4(9FE9ObpYLaKu-iqD0DJh';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX,
ALTER ON Sabitech.* TO 'Desarrollador@%';
FLUSH PRIVILEGES;
-- Usuario con permisos de desarrollador