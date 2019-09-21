const express = require('express')
const router = express.Router()
const goodsModel = require('../../db/model/goodsModel')

// const multer = require('multer')
// const fs = require('fs')
// const path = require('path')


//商品添加
router.post('/goodsadd',(req,res)=>{
    let {name,desc,imgpath,price,goodstype}=req.body
    goodsModel.insertMany({name,desc,imgpath,price,goodstype})
    .then((data)=>{
        if(data.length>0){
            res.send({err:0,msg:'添加成功'})  
        }else{
            res.send({err:-1,msg:'添加失败'})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-880,msg:'内部错误请重试'})
    })
})

//商品删除
router.post('/del',(req,res)=>{
    let {id}=req.body
    // console.log(req.body)
    
    goodsModel.deleteOne({_id:id})
    .then((data)=>{ 
        console.log(data)
        res.send({err:0,msg:'删除ok'})
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-911,msg:'删除失败'})
    })
})

//商品修改
router.post('/update',(req,res)=>{
    let {_id,name,desc,imgpath,price,goodstype}=req.body
    console.log(req.body)
    goodsModel.updateOne({_id:_id},{name,desc,imgpath,price,goodstype})
    .then((data)=>{
        res.send({err:0,msg:'商品已修改'})
    })
})

//商品查询
router.post('/findByTypePage',(req,res)=>{
    let {goodstype,page,pageSize}=req.body
    let typeSearch={}
    if(goodstype){
        typeSearch.goodstype=goodstype
    }
    let total=0
    goodsModel.find(typeSearch)
    .then((data)=>{
        total=data.length
        return goodsModel.find(typeSearch).skip((page-1)*pageSize).limit(Number(pageSize))
    })
    .then((data)=>{
        res.send({err:0,msg:'查询OK',list:data,total:total})
    })
})

module.exports = router                               