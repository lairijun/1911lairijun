const express = require('express')
const router = express.Router()
const bannerModel = require('../../db/model/bannerModel')
const jwt = require('jsonwebtoken')
const secret = 'qwerqwer'


const fs=require('fs')
const path=require('path')



app.post('/imgupload',multer().single('img'),(req,res)=>{
    console.log(req.file)
    let {buffer,mimetype} = req.file
    let filename=(new Date().getTime()+parseInt(Math.random()*999999)+parseInt(Math.random()*999999))
    let extname=mimetype.split('/')[1]
    let dir=path.join(__dirname,'./www/images')
    let imgpath=`/public/images/${filename}.${extname}`
    fs.writeFile(`${dir}/${filename}.${extname}`,buffer,(err)=>{
        if(err){
            res.send({err:-1,msg:'图片上传失败'})
        }else{
            res.send({err:0,msg:'图片上传成功',imgpath:imgpath})
        }
    })
})

module.exports = router