let User = require('./user')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')

async function save(req, res) {
    let errNum = 0
    let msg
    let user
    const { username, email, password, validatePassword } = req.body
    password != validatePassword ? err = 1 : ''
    user = await User.findOne({ username: username }, (err, user) => { err ? errNum = -1 : '' })
    if (user != null) { errNum = 2 }
    else {
        user = await User.findOne({ email: email }, (err, user) => { err ? errNum = -1 : '' })
        user != null ? errNum = 3 : ''
    }
    if (errNum != 0) {
        switch (errNum) {
            case -1:
                msg = 'Error in the data base.'
                break;
            case 1:
                msg = 'Passwords do not match.'
                break;
            case 2:
                msg = 'A user with that nickname already exists.'
                break;
            case 3:
                msg = 'A user with that email already exists.'
                break;
        }
        res.render('signup', {
            err: msg
        })
        return
    }
    const newUser = new User({
        username,
        email,
        id: uuid(),
        password
    })
    newUser.password = await newUser.encryptPassword(newUser.password)
    await newUser.save()
    const token = jwt.sign({id:newUser.id},process.env.SECRET,{
        expiresIn: 60*60*24 // en segundos
    })
    console.log(token)
    res.render('signup', {
        succesfull: 'received without problems'
    })
}

module.exports = {
    Save: save,
}