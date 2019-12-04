const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')


app.set('port', 5000) // Indico que el puerto será 5000
app.set('views', path.join(__dirname, 'views')) // Le indico a express donde se encuentra la carpeta views
app.set('view engine', 'ejs')  //Lenguaje que se puede utilizar dentro de HTML, condicionales etc.

//Middlewares
// Funciones que se ejecutan antes que lleguen a las rutas

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false })) // Gracias a este método, express entenderá lo que llega a través de los formularios.
app.use(bodyParser.json())


//Routes

app.use(require('./routes/index'))

//Static

app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'public/imgs')))



// 404 handler

app.use((req, res, next) => {
    res.status(404).send('404 Not found')

})

module.exports = app;

