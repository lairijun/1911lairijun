const express = require('express')
const router = express.Router()
const bannerModel = require('../../db/model/bannerModel')

// const multer = require('multer')
// const fs = require('fs')
// const path = require('path')


//banner添加
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


//banner列表
router.post('/bannerlist',(req,res)=>{
    // let {page,pageSize}=req.body
    // let total=0
    // let {id,imgpath}=req.body
    bannerModel.find()
    .then((data)=>{
        // total=data.length
        if(data.length>0){
            res.send({err:0,msg:'查询成功',data})  
        }else{
            res.send({err:-1,msg:'查询失败'})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-880,msg:'内部错误请重试'})
    })
})

router.post('/bannerdel',(req,res)=>{
    let _id=req.body
    bannerModel.deleteOne({id:_id})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:'删除ok'})
    })
    .catch((err)=>{
        res.send({err:-998,msg:'删除失败'})
    })
})

//banner修改
router.post('/bannerupdate',(req,res)=>{
    let {_id,id,imgpath}=req.body  

    bannerModel.updateOne({_id:_id},{id,imgpath})
    .then((data)=>{
            res.send({err:0,msg:'修改成功'})  
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-880,msg:'内部错误请重试'})
    })
})




module.exports = router                               