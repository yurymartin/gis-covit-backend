'use strict'

const mongoose = require('mongoose')
const {app, server} = require('./app')
const config = require('./config');

mongoose.connect(config.db,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology:true
},(err, res) => {
  if(err) {return console.log(`Error al conectar la base de datos: ${err}`);}
  console.log('Conexion ala base de datos establecida...')
  server.listen(config.port, () => {
    console.log(`Server on port ${config.port}`);
  })
})
