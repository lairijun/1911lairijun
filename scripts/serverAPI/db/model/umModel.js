const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    address:{typr:String,required:false},
    order:{typr:String,required:false}
})

const UserModel = mongoose.model('userInfos',UserSchema)
module.exports = UserModel