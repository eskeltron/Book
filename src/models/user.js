const {Schema , model} = require('mongoose')
const bcrypt = require('bcryptjs')
const Book = require('./book')
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    id: {
        type: String,
        required: true
    },
    book:{
        bookBuy:{ type: Schema.ObjectId, ref: "Book" },
        date:Date
    },
    admin:{
        type: Boolean,
        required:true
    }
})

userSchema.methods.encryptPassword = async function (pass){
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

userSchema.methods.validatePassword = function (pass){
    return bcrypt.compare(pass, this.password)
}

module.exports = model('user', userSchema)