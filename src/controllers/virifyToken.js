const jwt= require('jsonwebtoken')
module.exports = function verifyToken(req, res,next) {
    const token = req.headers.cookie.split(' ')[1].split('=')[1]
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    let decoded
    jwt.verify(token,process.env.SECRET,(e,decod)=>{
        if(e){
            console.log(e)
            res.render('signin',{
                msg:'Your token has been expired, login again'
            })
            return
        }
        decoded=decod
    })
    req.userId = decoded.id
    next()
}