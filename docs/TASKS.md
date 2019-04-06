# TASKS

[README](../README.md) / TASKS

* &#9744; Autenticación
  - &#9744; Crear usuario user@example.com / 1234
* &#9745; Internacionalización
  - &#9745; Incluir selector de idioma
* &#9744; Subida de imagen con tarea en background
  - &#9744; Subida de imagen con POST
  - &#9744; Creación de thumbnail de imagen subida
* &#9744; Testing (Opcional)
* &#9744; Bonus Track (Opcional)

## Autenticación

Implementar JWT al API. (No necesario en website).

* POST /api/authenticate -> hacer login, devuelve token JWT
* GET /api/anuncios + JWT -> incluir JWT en header o query-string para hacer petición correcta (200 OK)
* GET /api/anuncios -> responde HTTP 401 + json con info de error
* GET /api/anuncios + JWT caducado -> responde HTTP 401 + json info de error

Crear al menos un usuario user@example.com / 1234

## Internacionalización

Convertir el front en multi-idioma [español|inglés] (No es necesario en API).
Debe incluir un selector de idioma.

## Subida de imagen con tarea en background

Añadir a POST /api/anuncios la subida de imagen y guardado en server, obteniendo la ruta a la imagen (y funcionando) al hacer GET /api/anuncios.

Las imágenes han de tener thumbnail.

Crear microservicio que reciba trabajos (cote.js o cola de RabbitMQ) y se encarge de crear los thumbnails.

### Pasos para crear thumbnail

1. Buscar por `node.js image resize` y probar (jimp)
2. Hacer que API mande un mensaje con la ruta del filesystem a la imagen.
3. Crear un worker suscrito a mensaje/cola y cree thumbnails de las imágenes a 100x100 px.
4. Hacer petición por Postman con el campo imagen como File.

## Testing (Opcional)

Incluir tests del API con [Supertest](https://github.com/visionmedia/supertest) que se ejecuten en `npm test`.

## Bonus Track (Opcional)

Publicar un trabajo. Crear una utilidad.