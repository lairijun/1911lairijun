const express = require('express')
const router = express.Router()
const umModel = require('../../db/model/umModel')

//用户添加
router.post('/add',(req,res)=>{
    let {username,password,phone,address}=req.body
    let profile=''
    let clienttype=0
    let order=[]
    umModel.insertMany({username,password,profile,phone,address,order,clienttype})
    .then((data)=>{
        if(data.length>0){
            res.send({err:0,msg:'用户注册成功'})
        }else{
            res.send({err:-1,msg:'用户注册失败'})
        }
    })
    .catch((err)=>{
        res.send({err:-880,msg:'内部错误请重试'})
    })
})

//用户注销
router.post('/del',(req,res)=>{
    let _id=req.body
    umModel.deleteOne({_id:_id})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:'删除OK'})
    })
    .catch((err)=>{
        res.send({err:-998,msg:'删除失败，请重试'})
    })
})

//用户查询
router.post('/info',(req,res)=>{
    let {clienttype,page,pageSize}=req.body
    let typeSearch={}
    if(clienttype){
        typeSearch.clienttype=clienttype
    }
    let total=0
    umModel.find(typeSearch)
    .then((data)=>{
        console.log(data)
        total=data.length
        return umModel.find(typeSearch).skip((page-1)*pageSize).limit(Number(pageSize))
    })
    .then((data)=>{
        res.send({err:0,msg:'查询OK',list:data,total:total})
    })
})

//用户模糊查询
router.post('/kw',(req,res)=>{
    let {kw,page,pageSize}=req.body
    let reg=new RegExp(kw)
    let total=0
    umModel.find({$or:[{username:{$regex:reg}},{phone:{$regex:reg}}]})
    .then((data)=>{
        total=data.length
        return umModel.find({$or:[{username:{$regex:reg}},{phone:{$regex:reg}}]}).skip((page-1)*pageSize).limit(Number(pageSize))
    })
    .then((data)=>{
        res.send({err:0,msg:'查询OK',list:data,total:total})
    })
})

//用户信息更新
router.post('/update',(req,res)=>{
    let{_id,username,password,profile,phone,address,clienttype}=req.body
    umModel.updateOne({_id:_id},{username,password,profile,phone,address,clienttype})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:'修改成功'})
    })
    .catch((err)=>{
        res.send({err:-880,msg:'内部错误，请重试'})
    })
})

module.exports = router