const mongoose = require('mongoose')
const UmSchema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    profile:{type:String,required:false},
    phone:{type:String,required:true},
    address:{type:String,required:false},
    clienttype:{type:Number,required:true},
    order:{typr:Array,required:false}
})

const UmModel = mongoose.model('clientInfos',UmSchema)
module.exports = UmModel