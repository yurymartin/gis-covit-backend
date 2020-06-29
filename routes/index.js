'use strict'

const express = require('express')
const TemperatureCtrl = require('../controllers/temperature')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/temperature', auth, TemperatureCtrl.getTemperatures)
api.get('/temperatureuser/:id', auth, TemperatureCtrl.temperatureuser)
api.get('/temperature/:id', auth, TemperatureCtrl.getTemperature)
api.post('/temperature', auth, TemperatureCtrl.saveTemperature)
api.put('/temperature/:id', auth, TemperatureCtrl.updateTemperatue)
api.delete('/temperature/:id', auth, TemperatureCtrl.deleteTemperature)
api.get('/ultimatemperatureUser/:iduser',auth, TemperatureCtrl.ultimatemperatureUser)

api.get('/users', userCtrl.getUsers)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

module.exports = api