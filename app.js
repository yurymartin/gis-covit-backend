'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const socketIO = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const cors = require('cors')
const api = require('./routes')

//socket
require('./sockets')(io)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)

module.exports = {app, server}