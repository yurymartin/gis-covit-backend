'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TemperatureSchema = Schema({
    user_id: String,
    temperatura: String,
    state: String,
    date: { type: Date, default: Date.now }
},{
    timestamps: true
})

module.exports = mongoose.model('Temperature', TemperatureSchema)

