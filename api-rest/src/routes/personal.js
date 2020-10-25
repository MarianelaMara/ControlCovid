const config = require('../configs/config.js');
const express = require('express');
const jwt = require('jwt-simple');
const moment = require('moment');
const router = express.Router();
const mysqlConnection  = require('../database.js');



//Crear Token
const createToken = (idpersona) => {
  let payload = {
    idpersona: idpersona,
    createdAt: moment().unix(),
    expiresAt: moment().add(1, 'day').unix()
  }
  return jwt.encode(payload, config.llave);
}

//RUTAS
// GET Todos los empleados
router.get('/personal', (req, res) => {
  mysqlConnection.query('SELECT * FROM persona', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});
//GET datos de un usuario por su id
router.get('/datapersonal', (req, res) => {
  mysqlConnection.query('SELECT * FROM personal INNER JOIN persona ON personal.idpersona = persona.idpersona WHERE persona.idpersona= '+ [req.id] , (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});



//POST
router.post('/login', (req, res) => {
    var personal;
    var username= req.body.username;
    var password= req.body.password;
    mysqlConnection.query('SELECT * FROM personal INNER JOIN persona ON personal.idpersona = persona.idpersona WHERE usuario="'+ [username] + '" AND contraseña='+ [password] ,(err, rows, fields) => {
      if ( rows[0] === undefined ){
          res.json({
            error: 'No esta el empleado con ese id'
          });
        } else {
          personal= rows[0];
          res.json({
            token: createToken(personal.idpersona),
            idpersona: personal.idpersona,
            nombre: personal.nombre,
            apellido: personal.apellido,
            rol: personal.rol,
            idsistema: personal.idsistema
          });
        }
    }); 
})

module.exports = router;

