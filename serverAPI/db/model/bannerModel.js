const mongoose = require('mongoose')
const BannerSchema = mongoose.Schema({
    id:{type:String,required:true},
    url:{type:String,required:true},
    
   
})

const BannerModel = mongoose.model('banner',BannerSchema)
module.exports = BannerModel