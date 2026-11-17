# SABITECH WEB

**Gestión de reservas y asistencia a las jornadas tecnológicas SABITECH**

Proyecto intermodular · 2.º de Desarrollo de Aplicaciones Web (DAW) · XTART Formación Profesional

<p align="center">
  <img src="https://github.com/PabloGreus/Sabitech/blob/feature/011PagInicio/FrontEnd/src/assets/Logo.svg" />
  <img src="https://github.com/PabloGreus/Sabitech/blob/feature/011PagInicio/FrontEnd/src/assets/Logo_xtart_.jpg" />
</p>
 
---
 
## Índice
 
- [SABITECH WEB](#sabitech-web)
  - [Índice](#índice)
  - [1. ¿Qué es SABITECH WEB?](#1-qué-es-sabitech-web)
    - [Cómo se ha aplicado a la interfaz](#cómo-se-ha-aplicado-a-la-interfaz)
  - [3. Arquitectura general](#3-arquitectura-general)
  - [4. Tecnologías utilizadas](#4-tecnologías-utilizadas)
  - [5. Cómo se ha construido la base de datos](#5-cómo-se-ha-construido-la-base-de-datos)
    - [Tablas](#tablas)
    - [Relaciones](#relaciones)
    - [Decisiones de diseño](#decisiones-de-diseño)
  - [6. Cómo se ha construido el backend (API)](#6-cómo-se-ha-construido-el-backend-api)
    - [Rutas (`routes/api.php`)](#rutas-routesapiphp)
    - [`AuthController`](#authcontroller)
    - [`CharlaController`](#charlacontroller)
    - [`ReservaController`](#reservacontroller)
    - [Códigos de respuesta usados](#códigos-de-respuesta-usados)
  - [7. Cómo se ha construido el frontend](#7-cómo-se-ha-construido-el-frontend)
    - [Navegación (`App.jsx`)](#navegación-appjsx)
    - [Vistas](#vistas)
    - [Buenas prácticas aplicadas](#buenas-prácticas-aplicadas)
    - [Diseño responsive](#diseño-responsive)
    - [Capa de acceso a la API (`charlasApi.js`)](#capa-de-acceso-a-la-api-charlasapijs)
  - [8. Cómo se ha construido el entorno (Docker)](#8-cómo-se-ha-construido-el-entorno-docker)
  - [9. Flujo completo de una reserva](#9-flujo-completo-de-una-reserva)
  - [10. Puesta en marcha](#10-puesta-en-marcha)
    - [Requisitos](#requisitos)
    - [Pasos](#pasos)
    - [Accesos en local](#accesos-en-local)
    - [Prueba rápida de la API](#prueba-rápida-de-la-api)
  - [11. Estado actual y trabajo pendiente](#11-estado-actual-y-trabajo-pendiente)
    - [✅ Implementado](#-implementado)
    - [🔜 Pendiente](#-pendiente)
  - [12. Estructura del repositorio](#12-estructura-del-repositorio)
---
 
## 1. ¿Qué es SABITECH WEB?
 
SABITECH WEB es una aplicación web *responsive* que permite:
 
- Consultar el programa de charlas de las jornadas SABITECH.
- Registrarse e iniciar sesión.
- Reservar plaza en una charla.
- Consultar y cancelar las reservas propias.
Forma parte del proyecto intermodular de 2.º DAW, en el que cada pareja actúa como una empresa tecnológica ficticia que recibe el encargo de construir la solución completa. El desarrollo se plantea por fases: primero el recorrido **catálogo → identificación → reserva → mis reservas**, y después se incorporarán el control aforo, el correo de confirmación y la asistencia mediante QR temporal.
 
---
 
### Cómo se ha aplicado a la interfaz
 
- **Cabecera** (`Header.css`, `Logo.css`): barra azul-grisácea (`#4a5a82`) con el logotipo a la izquierda (`height: 2rem; width: auto`, para que el ancho se ajuste solo) y el menú a la derecha.
- **Color de acento** (`Logo.css`): el texto del logo usa `#2dd4bf` (turquesa), tomado del extremo izquierdo del degradado del logotipo.
- **Paleta de la aplicación** (`App.css`): se definen variables CSS en `:root` (`--color-primario`, `--color-peligro`, `--color-exito`, `--color-superficie`, etc.) para que todos los componentes usen los mismos colores y sea fácil cambiarlos en un único sitio.
- **Tarjetas de charlas** (`talkcards.css`): fondo blanco, borde suave, sombra y elevación al pasar el ratón. El nombre del ponente usa el color primario y el estado se muestra como una «píldora» de color suave.
---
 
## 3. Arquitectura general
 
La aplicación está desacoplada en tres capas que se comunican por HTTP/JSON:
 
```
┌────────────────┐    fetch (JSON)     ┌─────────────────────┐    consultas    ┌──────────────┐
│   FRONTEND     │ ──────────────────► │      BACKEND        │ ──────────────► │   MySQL 8.4  │
│ React (Vite)   │ ◄────────────────── │  Laravel (PHP) API  │ ◄────────────── │   sabitech   │
│ :5173          │   respuestas JSON   │  :8080  /api/...    │                 │   :3306      │
└────────────────┘                     └─────────────────────┘                 └──────────────┘
                                                                                      ▲
                                                                              ┌───────┴──────┐
                                                                              │  phpMyAdmin  │
                                                                              │    :8081     │
                                                                              └──────────────┘
```
 
- El **frontend** nunca habla con la base de datos: solo consume la API.
- El **backend** concentra las reglas de negocio (validación, comprobación de duplicados, permisos de cancelación) y es el único que accede a MySQL.
- **phpMyAdmin** se incluye únicamente como herramienta de apoyo durante el desarrollo.
---
 
## 4. Tecnologías utilizadas
 
| Capa | Tecnología | Para qué se usa |
|---|---|---|
| Frontend | **React** + JavaScript | Interfaz por componentes y vistas |
| Estilos | **CSS** propio con variables | Diseño responsive e identidad visual |
| Backend | **PHP + Laravel** | API REST, rutas, controladores, validaciones y migraciones |
| Base de datos | **MySQL 8.4** | Almacenamiento persistente |
| Entorno | **Docker Compose** | Levantar web, base de datos y phpMyAdmin de forma reproducible |
| Control de versiones | **Git + GitHub** | Trabajo en pareja y seguimiento del avance |
 
---
 
## 5. Cómo se ha construido la base de datos
 
El modelo se ha creado con **migraciones de Laravel**, de modo que cualquier persona puede reconstruir exactamente las mismas tablas con un solo comando. Los nombres de tablas y columnas se han escrito en castellano, y las claves primarias tienen nombre propio (`id_usuario`, `id_charla`, …) en lugar del genérico `id`.
 
### Tablas
 
| Tabla | Descripción | Campos principales |
|---|---|---|
| `usuarios` | Personas que usan la web. | `id_usuario`, `nombre`, `correo` (único), `contraseña` (hash), `rol` (`usuario`, `ponente`, `personal_de_acceso`), `fecha_creacion` |
| `usuarios_admin` | Cuentas de la organización, separadas de las de usuarios. | `id_admin`, `nombre`, `correo` (único), `contraseña`, `fecha_creacion` |
| `salas` | Espacios donde se celebran las charlas. | `id_sala`, `nombre`, `capacidad`, `ubicacion`, `estado` (`disponible`, `ocupada`, `en_mantenimiento`) |
| `charlas` | Programa de las jornadas. | `id_charla`, `id_usuario` (ponente), `id_sala`, `id_admin`, `titulo`, `descripcion`, `fecha`, `estado` (`proximamente`, `en_curso`, `finalizada`, `cancelada`) |
| `reservas` | Plaza reservada por un usuario en una charla. | `id_reserva`, `id_usuario`, `id_charla`, `fecha` |
| `asistencias` | Registro de asistencia real (para el control por QR). | `id_asistencia`, `id_usuario`, `id_charla`, `fecha_asistencia`, `estado` (`presente`, `ausente`) |
 
### Relaciones
 
```
usuarios ──┬──< charlas        (un usuario con rol ponente imparte varias charlas)
           ├──< reservas >──── charlas
           └──< asistencias >─ charlas
 
salas ────────< charlas        (una sala acoge varias charlas)
usuarios_admin < charlas       (la organización crea/gestiona las charlas)
```
 
### Decisiones de diseño
 
- **Integridad referencial**: todas las relaciones usan claves foráneas (`foreignId()->constrained()`).
- **`restrictOnDelete`** en `charlas` y `reservas`: no se puede borrar un usuario, una sala o una charla si hay datos que dependen de ellos, evitando perder reservas por accidente.
- **`cascadeOnDelete`** en `asistencias`: el registro de asistencia es un dato derivado y se elimina junto a su usuario o charla.
- **Contraseñas**: se guardan siempre con hash (`Hash::make`), nunca en texto plano.
- **Roles**: el campo `rol` de `usuarios` prepara la distinción entre asistente, ponente y personal de acceso, para aplicar permisos por perfil en el servidor.
- **Orden de migraciones**: los prefijos de fecha (`2026_11_06_…`) garantizan que se crean primero las tablas de las que dependen otras (`usuarios`, `usuarios_admin`, `salas`) y después `charlas`, `reservas` y `asistencias`.
---
 
## 6. Cómo se ha construido el backend (API)
 
El backend es una API REST en Laravel. Los controladores viven en `App\Http\Controllers\api` y comparten una clase base `Controller`. Las consultas se realizan con el *Query Builder* (`DB::table(...)`), que usa consultas parametrizadas y evita inyección SQL.
 
### Rutas (`routes/api.php`)
 
| Método | Ruta | Controlador | Descripción |
|---|---|---|---|
| `GET` | `/api/charlas` | `CharlaController@index` | Lista todas las charlas con el nombre del ponente |
| `POST` | `/api/login` | `AuthController@login` | Inicia sesión |
| `POST` | `/api/register` | `AuthController@register` | Crea una cuenta |
| `GET` | `/api/reserva/{id_usuario}` | `ReservaController@reserva` | Reservas de un usuario |
| `POST` | `/api/ReservaCharla` | `ReservaController@ReservaCharla` | Reserva una charla |
| `DELETE` | `/api/cancelarReserva/{id_reserva}` | `ReservaController@cancelarReserva` | Cancela una reserva |
 
### `AuthController`
 
- **`register`**: valida `nombre`, `correo` (formato email) y `contraseña` (mínimo 6 caracteres); comprueba que el correo no exista (si existe, responde `422`); inserta el usuario con la contraseña hasheada y devuelve `201` con los datos públicos del usuario.
- **`login`**: busca el usuario por correo y compara la contraseña con `Hash::check`. Si algo falla responde `401` con un mensaje genérico (sin revelar si falló el correo o la contraseña). Si es correcto, devuelve `id`, `nombre` y `email`, **nunca la contraseña**.
### `CharlaController`
 
- **`index`**: hace un `JOIN` entre `charlas` y `usuarios` para devolver, en una sola consulta, el título, la descripción, la fecha, el estado y el **nombre del ponente** (`usuarios.nombre as ponente`), ordenado por `id_charla`.
### `ReservaController`
 
- **`reserva`**: devuelve las reservas de un usuario con los datos de la charla y de su ponente (dos `JOIN`), ordenadas de la más reciente a la más antigua.
- **`ReservaCharla`**: valida que el usuario y la charla **existan** (`exists:`), comprueba que no haya una reserva previa del mismo usuario en esa charla (si la hay, responde `409 Conflict`) y crea la reserva (`201`).
- **`cancelarReserva`**: elimina la reserva filtrando por `id_reserva` **y** por `id_usuario`, de forma que un usuario no pueda cancelar reservas ajenas. Si no se borra ninguna fila, responde `404`.
### Códigos de respuesta usados
 
| Código | Significado en la app |
|---|---|
| `200` | Operación correcta |
| `201` | Recurso creado (usuario o reserva) |
| `401` | Credenciales incorrectas |
| `404` | Reserva no encontrada |
| `409` | Reserva duplicada |
| `422` | Error de validación o correo ya registrado |
 
---
 
## 7. Cómo se ha construido el frontend
 
El frontend es una aplicación React organizada en **vistas** (pantallas) y **componentes**. En lugar de un enrutador, `App.jsx` mantiene un estado `vista` que decide qué pantalla se muestra.
 
### Navegación (`App.jsx`)
 
- Estados principales: `vista` (`login`, `register`, `talks`, `reservar`, `misreservas`) y `charlaSeleccionada`.
- La función `irA(destino)` **protege las vistas privadas**: si el usuario intenta entrar a `talks`, `reservar` o `misreservas` sin sesión, lo redirige al login.
- La sesión se guarda en `localStorage` (`user`, y `token` si el servidor lo envía) y se elimina en `cerrarSesion`.
### Vistas
 
| Vista | Archivo | Qué hace |
|---|---|---|
| Login | `LoginView.jsx` | Formulario de acceso. Envía `correo` y `contraseña` a `/api/login`, guarda el usuario y avisa a `App` con `onSuccess` |
| Registro | `Registerview.jsx` | Formulario de alta. Reutiliza los estilos de `Login.css` |
| Charlas | `Talkcards.jsx` | Descarga las charlas de la API y las pinta como tarjetas. Gestiona estados de **carga**, **error** y **lista vacía** |
| Reservar | `ReservarView.jsx` | Muestra la charla elegida y un botón de confirmación que llama a `/api/ReservaCharla`. Gestiona el caso de reserva duplicada (`409`) |
| Mis reservas | `MisReservasView.jsx` | Lista las reservas del usuario y permite cancelarlas |
 
### Buenas prácticas aplicadas
 
- **Estados de la operación visibles**: cada acción muestra «Entrando…», «Reservando…», errores en rojo (`role="alert"`) y confirmaciones (`role="status"`).
- **Manejo de errores diferenciado**: se distingue «sin conexión con el servidor» (`TypeError` de `fetch`) de los errores que devuelve la API (`401`, `409`, `422`), mostrando el mensaje del servidor cuando existe.
- **Validación en el cliente y en el servidor**: los formularios usan `required` y `type="email"` como ayuda al usuario, pero la decisión final la toma siempre el backend.
- **Accesibilidad**: cada campo tiene su `<label htmlFor>`, los mensajes de error usan `role="alert"`, hay `:focus-visible` con un contorno bien visible (`outline: 3px solid #f59e0b`) y se respeta `prefers-reduced-motion`.
- **Formato de fechas**: la función `formatFecha` convierte `2027-04-15 10:00:00` en `15/04/2027 · 10:00`.
- **Componentes reutilizados**: la tarjeta de charla (`.charla`) se usa en el listado, en la pantalla de reserva y en «Mis reservas», cambiando solo los botones.
### Diseño responsive
 
- **Cabecera y menú** (`Header.css`, `MiniMenu.css`): en móvil el menú se despliega bajo la cabecera con un botón de hamburguesa; a partir de **768 px** se muestra en línea.
- **Rejilla de charlas** (`talkcards.css`): `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` adapta el número de columnas al ancho disponible; por debajo de **600 px** pasa a una sola columna y los botones ocupan todo el ancho.
### Capa de acceso a la API (`charlasApi.js`)
 
Centraliza la llamada `listCharla()` y lanza un `ApiError` con el mensaje y el código HTTP cuando la respuesta no es correcta. Está pensado para ir moviendo ahí el resto de llamadas `fetch` y no repetirlas en cada vista.
 
---
 
## 8. Cómo se ha construido el entorno (Docker)
 
El archivo `compose.yaml` define el proyecto `sabiteck-despliegue` con cuatro servicios:
 
| Servicio | Imagen / build | Puerto local | Función |
|---|---|---|---|
| `frontend` | `build: .` | `127.0.0.1:5173` | Servidor de desarrollo de React |
| `web` | `build: .` | `127.0.0.1:8080` | Servidor web con PHP/Laravel (API) |
| `db` | `mysql:8.4` | `127.0.0.1:3306` | Base de datos `sabitech` |
| `phpmyadmin` | `phpmyadmin:5` | `127.0.0.1:8081` | Administración visual de la base de datos |
 
Decisiones relevantes:
 
- Todos los puertos se publican solo en **`127.0.0.1`**, de modo que los servicios no quedan expuestos a otros equipos de la red.
- La carpeta `./app` se monta como volumen (`/var/www/html`) para que los cambios en el código se vean al instante sin reconstruir la imagen.
- Los datos de MySQL se guardan en el volumen con nombre `mysql_data`, por lo que **persisten** aunque se destruyan los contenedores.
- phpMyAdmin depende de `db` (`depends_on`) y se conecta a él por el nombre del servicio (`PMA_HOST: db`).
> ⚠️ **Seguridad**: las contraseñas de MySQL **no deben subirse al repositorio**. Hay que moverlas a un archivo `.env` (ignorado por Git) y referenciarlas desde `compose.yaml` con `${MYSQL_PASSWORD}` y `${MYSQL_ROOT_PASSWORD}`. En el repositorio solo debe haber un `.env.example` con valores de ejemplo.
 
---
 
## 9. Flujo completo de una reserva
 
Este es el recorrido que sigue un asistente, y qué parte del sistema interviene en cada paso:
 
1. **Registro / login** → `RegisterView` / `LoginView` → `POST /api/register` o `/api/login`. El usuario se guarda en `localStorage`.
2. **Listado de charlas** → `TalkCard` → `GET /api/charlas`. Se muestran las tarjetas con ponente, fecha y estado.
3. **Elegir charla** → el botón «Reservar plaza» llama a `elegirCharla()` en `App`, que guarda la charla seleccionada y cambia a la vista `reservar`.
4. **Confirmar reserva** → `ReservarView` → `POST /api/ReservaCharla` con `id_usuario` e `id_charla`. El servidor valida, comprueba duplicados e inserta la reserva.
5. **Resultado** → se muestra «Reserva realizada correctamente» (o «Ya tienes reservada esta charla» si hay duplicado).
6. **Mis reservas** → `MisReservasView` → `GET /api/reserva/{id_usuario}`. La reserva persiste aunque se cierre y se vuelva a abrir la sesión, porque está en la base de datos y no en el navegador.
7. **Cancelar** → `DELETE /api/cancelarReserva/{id_reserva}` enviando el `id_usuario`; la reserva desaparece de la lista.
---
 
## 10. Puesta en marcha
 
### Requisitos
 
- Docker y Docker Compose
- Git
### Pasos
 
```bash
# 1. Clonar el repositorio
git clone <URL-DEL-REPOSITORIO>
cd <carpeta-del-proyecto>
 
# 2. Crear el archivo de variables de entorno a partir del ejemplo
cp .env.example .env
#    (editar .env y poner las contraseñas de MySQL)
 
# 3. Levantar los servicios
docker compose up -d --build
 
# 4. Crear las tablas (migraciones de Laravel)
docker compose exec web php artisan migrate
```
 
### Accesos en local
 
| Servicio | URL |
|---|---|
| Frontend (React) | http://localhost:5173 |
| API (Laravel) | http://localhost:8080/api |
| phpMyAdmin | http://localhost:8081 |
 
### Prueba rápida de la API
 
```bash
curl http://localhost:8080/api/charlas
```
 
Debe devolver un JSON con las charlas cargadas en la base de datos.
 
---
 
## 11. Estado actual y trabajo pendiente
 
### ✅ Implementado
 
- Modelo de datos completo con migraciones (usuarios, administradores, salas, charlas, reservas y asistencias).
- Registro e inicio de sesión con contraseñas hasheadas.
- Listado de charlas conectado a la base de datos.
- Reserva de plaza con control de reservas duplicadas.
- Consulta y cancelación de reservas propias.
- Interfaz responsive con identidad visual propia, estados de carga/error y accesibilidad básica.
- Entorno reproducible con Docker Compose.
### 🔜 Pendiente
 
- **Control de aforo**: impedir reservas cuando no quedan plazas y resolver la concurrencia sobre la última plaza (por ejemplo con transacciones y bloqueo de fila).
- **Correo de confirmación** al reservar, con gestión de fallos del servicio de correo.
- **QR temporal** que se renueve cada 30 segundos, con caducidad validada en el servidor, y registro de asistencia (`AsistenciaController` aún vacío).
- **Autenticación con token** y autorización por rol en el servidor (hoy el `id_usuario` lo envía el cliente).
- **Área de organización** para gestionar charlas, salas y consultar inscripciones y asistencias.
- **Pruebas automatizadas** y comprobación de integración continua.
- Mover el resto de llamadas `fetch` a la capa `api/` del frontend.
---
 
## 12. Estructura del repositorio
 
```
.
├── README.md
├── compose.yaml
├── docs/
│   └── img/                      # Logotipos usados en este README
└── app/
    ├── backend/                  # Laravel
    │   ├── routes/api.php
    │   ├── app/Http/Controllers/api/
    │   │   ├── Controller.php
    │   │   ├── AuthController.php
    │   │   ├── CharlaController.php
    │   │   └── ReservaController.php
    │   └── database/migrations/
    │       ├── ..._create_users_table.php
    │       ├── ..._create_admins_table.php
    │       ├── ..._create_sala_table.php
    │       ├── ..._create_charlas_table.php
    │       ├── ..._create_reservas_table.php
    │       └── ..._create_asistencias_table.php
    └── frontend/                 # React
        └── src/
            ├── App.jsx
            ├── api/charlasApi.js
            ├── components/Header, Logo, MiniMenu
            ├── views/
            │   ├── LoginView.jsx
            │   ├── Registerview.jsx
            │   ├── Talkcards.jsx
            │   ├── ReservarView.jsx
            │   └── MisReservasView.jsx
            └── css/
                ├── App.css  Header.css  MiniMenu.css  Logo.css
                └── Login.css  talkcards.css
```
