const mongoose = require('mongoose')
const TitlebarSchema = mongoose.Schema({
    title:{type:String,required:true},
    imgpath:{type:String,required:true},
})

const TitlebarModel = mongoose.model('titlebar',TitlebarSchema)
module.exports = TitlebarModel