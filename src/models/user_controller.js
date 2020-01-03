let User = require('./user')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')

async function save(req, res) {
    let token
    existeToken = 0
    typeof req.headers.cookie != 'undefined' ? token = req.headers.cookie.split('=')[1] : ''
    jwt.verify(token, process.env.SECRET, (e, decoded) => {
        if (decoded) {
            res.render('signup', {
                err: 'You are already registered'
            })
            existeToken = 1
        }
    })
    if (existeToken == 0) {
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
                    msg = 'Data base error.'
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
            password,
            admin: false
        })
        newUser.password = await newUser.encryptPassword(newUser.password)
        await newUser.save()
        res.render('signup', {
            succesfull: 'User registred'
        })
    }
}

module.exports = {
    Save: save,
}