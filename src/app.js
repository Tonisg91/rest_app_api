require('dotenv').config()
require('./config/db.config')

const express = require('express')
const app = express()

const http = app.listen(5000, () => console.log('Server listen at port 5000'))

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    socket.on('ping', () => io.emit('pong'))
})

module.exports = app
