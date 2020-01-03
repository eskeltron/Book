const jwt = require('jsonwebtoken')
module.exports = function verifyToken(req, res) {
    // 1 Es admin , 0 no es admin, -1 token expiro, -2 no existe un token
    let num = 1
    let token
    typeof req.headers.cookie != 'undefined' ? token = req.headers.cookie.split('=')[1] : ''
    if (!token) {
        return num = -2
    }
    let decoded
    jwt.verify(token, process.env.SECRET, (e, decod) => {
        if (e) {
            console.log(e.message)
            num = -1
            return
        }
        decoded = decod
    })
    typeof decoded != 'undefined' ? req.userId = decoded.id : ''
    return num
}