const mongoose = require('mongoose')
const env = require('dotenv')

env.config()

function conexion() {
    return mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/Books_Project`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    connect: conexion
}