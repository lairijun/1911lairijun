const express = require('express')
const router = express.Router()
const bannerModel = require('../../db/model/bannerModel')

// const multer = require('multer')
// const fs = require('fs')
// const path = require('path')


//商品添加
router.post('/banneradd',(req,res)=>{
    let {id,imgpath}=req.body
    bannerModel.insertMany({id,imgpath})
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

module.exports = router                               