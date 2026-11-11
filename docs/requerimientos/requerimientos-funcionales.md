## Requisitos funcionales

Derivados del backlog del proyecto (épicas E1–E6). E0 es infraestructura y E7 es QA/entrega,
no son funciones para el usuario final.

### Autenticación y roles

- **RF-01** · Registro de clientes con correo y contraseña, con confirmación de cuenta.
- **RF-02** · Inicio y cierre de sesión con sesión persistente.
- **RF-03** · Dos roles: `cliente` y `admin`. Las rutas privadas se protegen según sesión y rol.

### Menú y catálogo

- **RF-04** · Página de menú con categorías (Aperitivos, Platos Principales,
  Acompañamientos, Postres); cada plato muestra nombre, descripción, precio e imagen.
- **RF-05** · Filtro por categoría y búsqueda por nombre, sin recargar la página.
- **RF-06** · Ofertas diarias con precio especial, visibles en el home y en el menú (badge).
- **RF-07** · Home con: presentación, sobre nosotros, categorías, ofertas del día,
  ingredientes, testimonios, blog y llamado a reservar.

### Reservas

- **RF-08** · Formulario de reserva: fecha, hora y número de personas (mismas opciones del
  negocio: 1, 2, 5, 10, 15, 20).
- **RF-09** · Reglas aplicadas: sin fechas pasadas, domingos cerrados, solo dentro del
  horario del día y con cupo limitado por fecha y hora.
- **RF-10** · Se puede reservar como invitado o con cuenta; con cuenta, la reserva queda
  vinculada al usuario.
- **RF-11** · Cada cliente puede ver y cancelar sus reservas pendientes.

### Contacto

- **RF-12** · Formulario de contacto (nombre, correo, mensaje) que entrega el mensaje al
  equipo; solo el administrador los lee.

### Contenido

- **RF-13** · Página "Sobre nosotros" con la historia y propuesta del restaurante.
- **RF-14** · Blog con listado y detalle público de artículos.
- **RF-15** · Testimonios de clientes en el home (solo los aprobados).

### Panel de administración (solo rol admin)

- **RF-16** · Gestión de reservas: ver por fecha, confirmar y cancelar.
- **RF-17** · Gestión del catálogo: crear, editar y desactivar categorías y platos, con
  subida de imágenes. Los cambios se reflejan de inmediato en el sitio público.
- **RF-18** · Bandeja de mensajes de contacto, con opción de marcar como atendidos.
- **RF-19** · Gestión de testimonios y del blog.
- **RF-20** · Gestión de usuarios: cambiar roles cliente↔admin con confirmación.
- **RF-21** · Dashboard con métricas del día (reservas de hoy, pendientes, mensajes sin
  atender, platos no disponibles).