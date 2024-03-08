const mongoose = require("mongoose")
const { Schema } = mongoose

mongoose.connect("mongodb+srv://jadhavvivek2743:B4F2CRtobPNJ2X@cluster0.rsqrkw6.mongodb.net/table")

const userSchema = Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String
})

const bankSchema = Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const User = mongoose.model("User", userSchema)
const Accounts = mongoose.model("Account", bankSchema)

module.exports = {
    User,
    Accounts
}
