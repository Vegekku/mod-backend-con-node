# DEVOPS

[README](../README.md) / DEVOPS

## Tasks

* &#9745; Desplegar en AWS
  - &#9745; Indicar URL en el README.
  - &#9745; Node como servidor de app y PM2 como gestor de procesos.
    - &#9745; Siempre en ejecución y con arranque automático.
  - &#9745; Nginx como proxy inverso
    - &#9745; Servir archivos estáticos con HTTP header X-Owner=Vegekku
  - &#9745; A la app se accede a través de nombre de dominio
* &#9745; Mostrar plantilla https://startbootstrap.com al acceder por dirección IP
* &#9744; Despliegue con docker (Opcional)

## Ejercicio 1

Desplegar en AWS esta práctica. En el README debe indicarse la URL donde se desplegará la práctica.

* Node como servidor de aplicación con PM2 como gestor de procesos. Siempre en ejecución. Debe arrancarse automáticamente al arrancar el servidor (startup).
* Nginx como proxy inverso encargado de recibir peticiones HTTP y derivarlas a node.
* Archivos estáticos deben ser servidos por nginx (no node). Añadir cabecera HTTP con valor X-Owner=Vegekku. En caso de que la aplicación no tenga archivos estáticos, crear uno a tal efecto. Deberá indicarse en el README.

## Ejercicio 2

Si se accede al servidor web por dirección IP en lugar de nombre de dominio, debe mostrarse una plantilla de https://startbootstrap.com.

## Extras

Puede usarse Docker, pero el resultado ha de ser el mismo.

## Anotaciones

* Actualmente la versión corriendo en el servidor AWS es la **v1.1.1**.
* Se puede hacer uso de los filtros indicados en la parte web.
* Las peticiones API funcionan a excepción de POST ads.
