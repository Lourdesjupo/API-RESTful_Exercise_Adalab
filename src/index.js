// Servidor Express

// Imports

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require('dotenv').config()



// Arracar el servidor

const server = express();

// Configuración del servidor

server.use(cors());
server.use(express.json({limit: "25mb"}));
server.set('view engine', 'ejs');



// Conexion a la base de datos

async function getConnection() {
  const connection = await mysql.createConnection(
    {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS,  // <-- Pon aquí tu contraseña o en el fichero /.env en la carpeta raíz
      database: process.env.DB_NAME || "Clase",
    }
  );

  connection.connect();

  return connection;
}



// Poner a escuchar el servidor

const port = process.env.PORT || 4500;
server.listen(port, () => {
  console.log(`Ya se ha arrancado nuestro servidor: http://localhost:${port}/`);
});



// Endpoints

//Obtener todas las recetas (GET /recetas)

server.get('/recetas', async (req, res) => {
  const selectAll = 'select * from recetas_db.recetas';
  const connection = await getConnection();
  const [result] = await connection.query(selectAll);

  connection.end();
  res.json({
    info: {
      count: result.length,
    },
    results: result,
  });
});

//Obtener una receta por su ID (GET /recetas/:id)
server.get('/recetas/:id', async (req, res) => {
  const id = req.params.id;
  const select = 'select * from recetas_db.recetas where id = ?';
  const connection = await getConnection();
  const [result] = await connection.query(select, id);
  connection.end();
  res.json({
    results: result,
  });
});

//Crear una nueva receta (POST /recetas)

server.post('/recetas', async (req,res)=>{
 try{
  const infoReceta = req.body
  const insert =
    'insert into recetas_db.recetas (nombre,ingredientes,instrucciones) values (?,?,?)';
  const connection = await getConnection();
  const [result] = await connection.query(insert, [
    infoReceta.nombre,
    infoReceta.ingredientes,
    infoReceta.instrucciones,
  ]);
  
  connection.end()
  res.json({
    success: true,
    id: result.insertId
  });
  } catch (error) {
    res.json({
      success: false,
      message: 'Ha ocurrido un error revise los campos',
    });
  }

})

//Actualizar una receta existente (PUT /recetas/:id)
server.put('/recetas/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, ingredientes, instrucciones} = req.body;

  try {
    const update =
      'UPDATE recetas_db.recetas SET nombre = ?, ingredientes = ? , instrucciones = ? WHERE id = ?';
    const connection = await getConnection();
    const [result] = await connection.query(update, [
      nombre,
      ingredientes,
      instrucciones,
      id
    ]);
    connection.end();
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Ha ocurrido un error revise los campos',
    });
  }
});

//Eliminar una receta (DELETE /recetas/:id)

server.delete('/recetas/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleteSql = 'Delete from recetas_db.recetas where id = ? ';
    const conn = await getConnection();
    const [result] = await conn.query(deleteSql, [id]);
    conn.end();
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Ha ocurrido un error revise los campos',
    });
  }
});

