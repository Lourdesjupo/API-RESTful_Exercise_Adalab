# API-RESTful_Exercise_Adalab
Ejercicio para desarrollar un **API** que permita **insertar, modificar, listar y eliminar** recetas de cocina.

## Tecnologías
🔸Express.js  
🔸Node.js  
🔸MySQL  

## Especificaciones  

Creación de una BBDD en MySQL llamada "recetas_db" que contiene la siguiente tabla:
- "recetas": esta tabla debe tener los siguientes campos:
- "id": un identificador único para cada receta (tipo: INT y es una clave primaria que se incrementa
automáticamente).
- "nombre": el nombre de la receta (tipo: VARCHAR).
- "ingredientes": una lista de ingredientes separados por comas (tipo: VARCHAR).
- "instrucciones": las instrucciones para preparar la receta (tipo: TEXT).

Utilizo Express.js y NodeJS para crear una APIRESTful que permite realizar las siguientes operaciones: 
- Obtener todas las recetas (GET /recetas): La respuesta del servidor será un json con la
siguiente información:
```
 {
 "info": { "count": numOfElements}, // número de elementos 
 "results": results // listado
 }
```
- Obtener una receta por su ID (GET /recetas/:id): Recibe en un URL param el id de una receta y
devolverá un json que será un objeto con todos los campos de esa receta.

- Crear una nueva receta (POST /recetas): este endpoint espera en el body de la petición toda la
información de la receta a insertar. La respuesta del servidor será un json especificando si la
solicitud fue exitosa y el id de la nueva fila:

```
 {
 "success": true,
 "id": nuevo_id // id que generó MySQL para la nueva fila
 }
o un json especificando que la solicitud no fue exitosa:
 {
 "success": false,
 "message": "Texto mínimamente descriptivo del error"
 }
```
- Actualizar una receta existente (PUT /recetas/:id): donde id en la ruta es el identificador de la
receta que se quiere actualizar. Este endpoint también espera por el body de la petición un objeto con
toda la información del receta actualizada. La respuesta del servidor será un json especificando si
la solicitud fue exitosa (con {"success": true}) o no (con {"success": false, "message":
""}, como en el apartado anterior).

- Eliminar una receta (DELETE /recetas/:id): donde id es el identificador de la receta que se quiere
eliminar. La respuesta del servidor será un json especificando si la solicitud fue exitosa (con
{"success": true}) o no (con {"success": false, "message": ""}, similar al apartado de
la creación de la receta).
```
{
 "success": false,
 "message": "Ha ocurrido un error"
}
```
