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
//图片上传
// router.post('/imgload',multer().single('img'),(req,res)=>{
//     console.log(123,req.file)
//     let {buffer,mimetype} = req.file
//     let filename=(new Date().getTime()+parseInt(Math.random()*999999)+parseInt(Math.random()*999999))
//     let extname=mimetype.split('/')[1]
//     let dir=path.join(__dirname,'../../www/images')
//     let imgpath=`/public/images/${filename}.${extname}`
//     fs.writeFile(`${dir}/${filename}.${extname}`,buffer,(err)=>{
//         if(err){
//             res.send({err:-1,msg:'图片上传失败'})
//         }else{
//             res.send({err:0,msg:'图片上传成功',imgpath:imgpath})
//         }
//     })
// })
module.exports = router                               