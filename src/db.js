const mongoose = require('mongoose')
const path = require('path')
const env = require('dotenv').config({path : path.join(process.cwd(), '/config/.env')})

function conexion() {
    return mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/Books_Project`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    connect: conexion
}