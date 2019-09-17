const express = require('express')
const router = express.Router()
const foodModel = require('../../db/model/foodModel')
const multer = require('multer')
//商品添加
router.post('/add',(req,res)=>{
    let {name,desc,img,price,foodtype}=req.body
    foodModel.insertMany({name,desc,img,price,foodtype})
    .then((data)=>{
        if(data.length>0){
            res.send({err:0,msg:'添加成功'})  
        }else{
            res.send({err:-1,msg:'添加失败'})
        }
    })
    .catch((err)=>{
        res.send({err:-880,msg:'内部错误请重试'})
    })
})

//商品删除
router.post('/del',(req,res)=>{
    let _id=req.body
    foodModel.deleteOne({_id:_id})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:'删除ok'})
    })
    .catch((err)=>{
        res.send({err:-998,msg:'删除失败'})
    })
})

//商品修改
router.post('/update',(req,res)=>{
    let {_id,name,desc,img,price,foodtype}=req.body
    foodModel.updateOne({_id:_id},{name,desc,img,price,foodtype})
    .then((data)=>{
        res.send({err:0,msg:'修改成功'})
    })
})

//商品查询
// router.post('/find',(req,res)=>{
//     foodModel.find()
//     .then((data)=>{
//         res.send({err:0,msg:'查询ok',list:data})
//     })
// })

//分页查询
// router.post('/findByPage',(req,res)=>{
//     let {page,pageSize}=req.body
//     let total=0
//     foodModel.find()
//     .then((data)=>{
//         total=data.length
//         return foodModel.find().skip((page-1)*pageSize).limit(Number(pageSize))
//     })
//     .then((data)=>{
//         res.send({err:0,msg:'查询ok',list:data,total:total})
//     })
// })

//分类查询
// router.post('/findByType',(req,res)=>{
//     let {foodtype,page,pageSize}=req.body
//     let total=0
//     foodModel.find({foodtype})
//     .then((data)=>{
//         total=data.length
//         return foodModel.find({foodtype}).skip((page-1)*pageSize).limit(Number(pageSize))
//     })
//     .then((data)=>{
//         res.send({err:0,msg:'查询OK',list:data,total:total})
//     })
// })

//汇总查询
router.post('/findByTypePage',(req,res)=>{
    let {foodtype,page,pageSize}=req.body
    let typeSearch={}
    if(foodtype){
        typeSearch.foodtype=foodtype
    }
    let total=0
    foodModel.find(typeSearch)
    .then((data)=>{
        total=data.length
        return foodModel.find(typeSearch).skip((page-1)*pageSize).limit(Number(pageSize))
    })
    .then((data)=>{
        res.send({err:0,msg:'查询OK',list:data,total:total})
    })
})

//模糊查询(有分页功能)
router.post('/findByKw',(req,res)=>{
    let {kw,page,pageSize}=req.body
    let reg=new RegExp(kw) //创建正则表达式
    let total=0
    foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})
    .then((data)=>{
        total=data.length
        return foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]}).skip((page-1)*pageSize).limit(Number(pageSize))
    })
    .then((data)=>{
        res.send({err:0,msg:'查询ok',list:data,total:total})
    })
})

//图片上传
router.post('/imgupload',multer().single('img'),(req,res)=>{
    console.log(123,req.file)
    let {buffer,mimetype} = req.file
    let filename=(new Date().getTime()+parseInt(Math.random()*999999)+parseInt(Math.random()*999999))
    let extname=mimetype.split('/')[1]
    let dir=path.join(__dirname,'../../www/images')
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