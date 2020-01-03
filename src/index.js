const app = require('./app')
const db = require('./db.js')
const env = require('dotenv')
env.config()
db.connect()
    .then(async function () {
        console.log(`Database port ${process.env.DB_PORT}`)
        await app.listen(app.get('port'), console.log(`Web server port ${app.get('port')}`))
    })
    .catch(() => console.log('error'))




