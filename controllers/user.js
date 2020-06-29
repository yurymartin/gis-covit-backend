'use strict'

const User = require('../models/user')
const services = require('../services');
const bcrypt = require('bcrypt-nodejs');

function getUsers(req, res) {
  User.find({}, (err, users) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!users) return res.status(404).send({message: `No existen usuarios`})

    res.send(200, { users })
  })
}

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })
  user.save((err) => {
    if(err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(200).send({
      token: services.createToken(user),
      data: user,
      message: 'Usuario creado exitosamente'
    })
  })
}

function signIn(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err})
    if (!user) return res.status(404).send({ message: 'No existe el usuario'})
    if (!bcrypt.compareSync(req.body.password, user.password)) return res.status(404).send({message: 'Password equivocado'})
    req.user = user
    res.status(200).send({ 
      message: 'Te has logueado correctamente',
      token: services.createToken(user),
      data: user
    })
  })
}

module.exports = {
  signUp,
  signIn,
  getUsers
}