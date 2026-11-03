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
    tokens_id
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

--------------------------------Procedimeintos--Almacenados--------------------------------
-----Añade un nuevo usuario a la tabla usuarios-----------------------
DELIMITER $$

Create procedure ADDUsuario(
    IN p_nombre VARCHAR(100),
    IN p_correo VARCHAR(100),
    IN p_contraseña VARCHAR(255)
)
END $$

DELIMITER ;

--------Añade un usuario administrador a la tabla usuarios_admin-----------------------
DELIMITER $$

CREATE PROCEDURE sp_crear_administrador(
    IN  p_nombre      VARCHAR(100),
    IN  p_correo      VARCHAR(150),
    IN  p_passw_hash  VARCHAR(255),
    OUT p_admin_id    INT
)
BEGIN
    -- Si ocurre cualquier error, se revierte y se propaga
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    -- Validaciones básicas
    IF p_nombre IS NULL OR TRIM(p_nombre) = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre es obligatorio';
    END IF;

    IF p_correo IS NULL OR p_correo NOT REGEXP '^[^@[:space:]]+@[^@[:space:]]+\\.[^@[:space:]]+$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El correo no tiene un formato válido';
    END IF;

    IF p_passw_hash IS NULL OR CHAR_LENGTH(p_passw_hash) < 60 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La contraseña debe llegar ya hasheada';
    END IF;

    IF EXISTS (SELECT 1 FROM administrador WHERE correo = LOWER(TRIM(p_correo))) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe un administrador con ese correo';
    END IF;

    START TRANSACTION;

    INSERT INTO administrador (nombre, correo, passw)
    VALUES (TRIM(p_nombre), LOWER(TRIM(p_correo)), p_passw_hash);

    SET p_admin_id = LAST_INSERT_ID();

    COMMIT;
END$$

DELIMITER ;
