const express = require('express')
const router = express.Router()
const titlebarModel = require('../../db/model/titlebarModel')

// const multer = require('multer')
// const fs = require('fs')
// const path = require('path')


//banner添加
router.post('/titlebaradd',(req,res)=>{
    let {title,imgpath}=req.body
    titlebarModel.insertMany({title,imgpath})
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


//banner列表/查询
router.post('/titlebarlist',(req,res)=>{
     let {page,pageSize}=req.body
     let total=0
     let {title,imgpath}=req.body

    titlebarModel.find()
    .then((data)=>{
        console.log(data)
        total=data.length
        return titlebarModel.find().skip((page-1)*pageSize).limit(Number(pageSize))
    })
    .then((data)=>{
        res.send({err:0,msg:'查询OK',data,total:total})
    })
    // .then((data)=>{
    //     total=data.length
    //     console.log(data)
    //     if(data.length>0){
    //         res.send({err:0,msg:'查询成功',total:total})  
    //         console.log(req.body)
    //         return bannerModel.find().skip((page-1)*pageSize).limit(Number(pageSize))

    //     }else{
    //         res.send({err:-1,msg:'查询失败'})
    //     }
    //})
    .catch((err)=>{
        console.log(err)
        res.send({err:-880,msg:'内部错误请重试'})
    })
})



//banner删除
router.post('/titlebardel',(req,res)=>{
    let {_id}=req.body
    console.log(req.body)
    console.log(_id)
    titlebarModel.deleteOne({_id:_id})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:'删除ok'})
    })
    .catch((err)=>{
        res.send({err:-998,msg:'删除失败'})
    })
})

//banner修改
router.post('/titlebarupdate',(req,res)=>{
    let {_id,title,imgpath}=req.body  
    titlebarModel.updateOne({_id:_id},{title,imgpath})
    .then((data)=>{
            res.send({err:0,msg:'修改成功'})  
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-880,msg:'内部错误请重试'})
    })
})




module.exports = router                               