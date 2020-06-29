'use strict'
const Temperature = require('../models/temperature')

function getTemperature(req, res) {
  let _id = req.params.id

  Temperature.findById(_id, (err, temperature) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!temperature) return res.status(404).send({message: `la temperatura no existe`})

    res.status(200).send({ temperature })
  })
}

function getTemperatures(req, res) {
  Temperature.find({}, (err, temperatures) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!temperatures) return res.status(404).send({message: `No existen temperaturas`})

    res.send(200, { temperatures })
  })
}

function saveTemperature(req, res) {
  console.log('POST /api/temperature');
  console.log(req.body);
  let temperature = new Temperature()
  temperature.user_id = req.body.user_id
  temperature.temperatura = req.body.temperatura
  temperature.state = req.body.state
  temperature.save((err, temperatureStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({
      temperature: temperatureStored
    })
  })
}

function updateTemperatue(req, res) {
  let _id = req.params.id
  let update = req.body

  Temperature.findByIdAndUpdate(_id, update, (err, temperatureUpdated) => {
    if(err) res.status(500).send({ message: `Error al actualizar el temperatura: ${err}`})
    
    res.status(200).send({ temperature: temperatureUpdated })
  })
}

function deleteTemperature(req, res) {
  let _id = req.params.id
  
  Temperature.findById(_id, (err, temperature) => {
    if(err) res.status(500).send({ message: `Error al borrar la temperatura: ${err}`})

    temperature.remove(err => {
      if(err) res.status(500).send({ message: `Error al borrar la temperatura: ${err}`})
      res.status(200).send({message: `El producto ha sido eliminado`})
    })
  })
}

function ultimatemperatureUser(req, res) {
  let user_id = req.params.iduser

  Temperature.findOne({user_id: user_id}, (err, temperature) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!temperature) return res.status(404).send({message: `No existe nunca temperatura`})

    res.status(200).send({ temperature })
  }).sort({ date: 'descending' })
}

function temperatureuser(req, res) {
  let user_id = req.params.id

  Temperature.find({user_id: user_id}, (err, temperatures) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!temperatures) return res.status(404).send({message: `No Existen temperaturas`})

    res.status(200).send({ temperatures })
  }).sort({ date: 'descending' })
}

module.exports = {
  getTemperature,
  getTemperatures,
  saveTemperature,
  updateTemperatue,
  deleteTemperature,
  ultimatemperatureUser,
  temperatureuser
}