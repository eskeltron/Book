const { Schema, model } = require('mongoose')
require('dotenv').config()

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status:{
        type: Number,
        required: true
    }
})

bookSchema.methods.setImgUrl = function setImgurl(filename) {
    this.image = `http://${process.env.APP_HOST}:${process.env.APP_PORT}/public/${filename}`
}

module.exports = model('Book', bookSchema)