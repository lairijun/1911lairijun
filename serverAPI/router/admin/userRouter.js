const express = require('express')
const router = express.Router()
const userModel = require('../../db/model/userModel')
const jwt = require('jsonwebtoken')
const secret = 'qwerqwer'

router.post('/login',(req,res)=>{
    let {us,ps} =req.body
    userModel.find({username:us})
    .then((data)=>{
        if(data[0].username==us && data[0].password==ps){
            let token=jwt.sign({us:us,uid:ps},secret,{expiresIn:'7d'})
            res.send({err:0,msg:'登录ok',username:us,token:token})
        }else{
            res.send({err:-1,msg:'账户密码错误，登陆失败'})
        }
    })
    .catch((err)=>{
        res.send({err:-998,msg:'无此用户'})
    })
    
})
router.post('/register',(req,res)=>{
    let {us,ps}=req.body
    console.log(us,ps)
    userModel.insertMany({username:us,password:ps})
    .then((data)=>{
        if(data.length>0){
            res.send({err:0,msg:'账户添加成功'})  
        }else{
            res.send({err:-1,msg:'账户添加失败'})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-880,msg:'内部错误请重试'})
    })
})

module.exports = router