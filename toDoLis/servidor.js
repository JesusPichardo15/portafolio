const express = require('express'), 
mysql = require('mysql'),
cors = require('cors'),
app = express(),
port = 3000,
router = express.Router()
;

//crear las cors para el servidor
const corsOption = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: '*',
}

//agregar las cors a la app
app.use(cors(corsOption));
//habilitamos los json para que no haya problemas al recibir
app.use(express.json());

//recibir los datos enviados del ciente
router.post('/enviar', (req,res)=>{
  let data = req.body;

  connection.query('SELECT COUNT(*) AS total_tareas FROM tareasyhorariosdiarios', (error, result) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
    }
    
    var totalTareas = result[0].total_tareas;

    connection.query('SELECT id FROM tareasyhorariosdiarios',(e,r)=>{
      const existId = r.map(row => row.id);
      if(totalTareas == 0 || existId.indexOf(1) === -1 || totalTareas == undefined){
        values = [parseInt(1),`${data.dailyTasks }`,`${data.schedule}`];
        connection.query(`INSERT INTO tareasyhorariosdiarios (id,tarea,horario) VALUES (?,?,?)`,values, (err,res)=>{
          if(err){
            console.error("error al hacer la consulta:",err);
          }
        });
      }else{
        for(let i = 0; i < totalTareas+1;i++){

          if(existId[i] == undefined) existId[i] = 0;

          if(parseInt(data.id) > existId[i]){
            values = [parseInt(data.id),`${data.dailyTasks }`,`${data.schedule}`];
            connection.query(`INSERT INTO tareasyhorariosdiarios (id,tarea,horario) VALUES (?,?,?)`,values, (err,res)=>{
              if(err){
                console.error(err);              }
            });
          }else{
            data.id = `${parseInt(data.id)+1}`;
          }
        }
      }  
    }) 
  });
  res.send("los datos llegaron correctamente");
});

router.get('/obtener',(req,res)=>{
  connection.query('SELECT * FROM tareasyhorariosdiarios',(err,result)=>{
    if(err){
      console.error('error al obtener los datos',err);
      res.status(500).send('error al recibir los datos');
    }else{
      res.json(result);
    }
  });
});

router.post('/actualizar-datos', (req,res)=>{
  let id = req.body;
  connection.query(`DELETE FROM tareasyhorariosdiarios WHERE id=${id.id}`,(err,result)=>{
    if(err){
      console.log("error al hacer los cambios: ", err);
    }
    
    connection.query('SELECT * FROM tareasyhorariosdiarios',(err,result)=>{
      if(err){
        console.error('error al obtener los datos',err);
        res.status(500).send('error al recibir los datos');
      }else{
        res.json(result);

        if (result && result.length > 0) {
          var totalTareas = result[0].total_tareas;

          
          for (let i = 0; i <= totalTareas+1;i++){
            connection.query(`UPDATE tareasyhorariosdiarios SET id =${i+1}  WHERE id = ${i}`,(err,result)=>{
              if(err){
                console.error('error al modificar los datos: ',err)
              }else{
                res.send(result)
              }
            })
          }
        }else{
          console.log("la consulta no devolvio resultados")
        }
      }
    });
  })
})

//agregamos la ruta a la app
app.use("/api",router);

//inicializar el servidor en el puerto 3000
const server = app.listen(port, ()=>{
  console.log("servidor inicializado en el puerto ", port);
});

//conectarme a la base de datos
const connection = mysql.createConnection({
    host : 'localhost',
    database : 'tareas',
    user : 'jesusPichardo',
    password : '01293458Je.'
});

connection.connect((err)=>{
    if(err){
        console.error('Error al conectar a la base de datos', err.message);
    }else{
    console.log('La conexion a la base de datos fue exitosa');
}
});
