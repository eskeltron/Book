const jwt = require('jsonwebtoken')
const User = require("../models/user");
module.exports = async function getUser(req) {
    let user,
        token,
        decodedToken

        req.headers.cookie ? token=req.headers.cookie.split('=')[1] : ""

        if(token){
            await jwt.verify(token,process.env.SECRET, async (err, dToken) => {
                if(typeof err != 'undefined'){
                    decodedToken = dToken
                    user = await User.findOne({id:decodedToken.id},{password:0})
                }
            })
        }
    return user
}