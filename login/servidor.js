const express = require('express'), 
mysql = require('mysql'),
cors = require('cors'),
app = express(),
port = 3000,
router = express.Router();

const corsOption = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: '*',
}
  
  //agregar las cors a la app
app.use(cors(corsOption));
  //habilitamos los json para que no haya problemas al recibir
app.use(express.json());

router.post("/sendRegisterData",(req,res)=>{
  let data = req.body,
  values = [parseInt(data.id),data.user,data.password,data.email], userRegister = true;
  
  connection.query("SELECT * FROM basederegistro",(e,r)=>{
    
    for(let i = 0; i < r.length;i++){
      if(data.user == r[i].usuario && data.password == r[i].contraseña){
        userRegister = true;
        break
      }else{
        userRegister = false;
      }
    }
    if(userRegister == false){
      connection.query(`INSERT INTO basederegistro (id,usuario,contraseña,email) VALUES(?,?,?,?)`,values,(e,r)=>{
        if(e){
          console.error(e);
        }
      })
    }
    res.send(userRegister);
  })
});

router.get("/getIDFromDB",(req,res)=>{
  connection.query("SELECT id FROM basederegistro",(e,r)=>{
    if(e){
      console.error(e);
    }else{
      res.json(r);
    }
  })
});

router.post("/enterToWebSite", (req,res)=>{
  let data = req.body,
  values = [data.user, data.password],
  clientExist;
  connection.query("SELECT id FROM basederegistro WHERE usuario = ? AND contraseña = ?",values, (e,r)=>{
    if(e){
      console.error(e)
    }else if(r.length > 0){
        clientExist = true;
    }else{
      console.log("no se encontro el usuario en la base de datos");
      clientExist = false;
    }
    res.send(clientExist);
  })
});


  app.use("/api",router);

  const server = app.listen(port, ()=>{
    console.log("servidor inicializado en el puerto ", port);
  });
  
  //conectarme a la base de datos
  const connection = mysql.createConnection({
      host : 'localhost',
      database : 'paginaweb',
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