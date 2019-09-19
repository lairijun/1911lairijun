const mongoose = require('mongoose')
const BannerSchema = mongoose.Schema({
    id:{type:Number,required:true},
    imgpath:{type:String,required:true},
})

const BannerModel = mongoose.model('banner',BannerSchema)
module.exports = BannerModel