const mongoose = require('mongoose')
const GoodsSchema = mongoose.Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    imgpath:{type:String,required:true},
    price:{type:String,required:true},
    goodstype:{type:String,required:true}
})

const GoodsModel = mongoose.model('goods',GoodsSchema)
module.exports = GoodsModel

