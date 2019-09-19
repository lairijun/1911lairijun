const express = require('express')
const mongodb = require('./db/connect')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const secret = 'qwerqwer'
const app = express()

const multer = require('multer')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//静态资源目录
app.use('/public',express.static(path.join(__dirname,'./www')))

//登录
const AdminUser = require('./router/admin/userRouter')
app.use('/admin/user',AdminUser)

//商品添加
const GoodsAdd = require('./router/admin/goodsRouter')
app.use('/admin/goods',GoodsAdd)

//banner添加
const BannerAdd=require('./router/admin/bannerRouter')
app.use('/admin/banner',BannerAdd)

//菜品管理
const AdminFood = require('./router/admin/foodRouter')
app.use('/admin/food',(req,res,next)=>{
    //验证token合法性
    let {token} = req.body||req.file
    console.log('body',req)
    console.log('file',req.file)
    if(token){
        jwt.verify(token,secret,(err,data)=>{
            if(err){
                res.send({err:-997,msg:'token失效'})
            }else{
                next()
            }
        })
    }else{
        res.send({err:-998,msg:'token缺失'})
    }
},AdminFood)


//图片上传
app.post('/imgupload',multer().single('img'),(req,res)=>{
    console.log(req.file)
    let {buffer,mimetype} = req.file
    let filename=(new Date().getTime()+parseInt(Math.random()*999999)+parseInt(Math.random()*999999))//独一无二图片名
    let extname=mimetype.split('/')[1] //文件后缀img/gif,选gif
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

//用户管理
const UserAdmin = require('./router/admin/umRouter')
app.use('/admin/usermanage',UserAdmin)


app.listen(8080,()=>{
    console.log('server start')
})