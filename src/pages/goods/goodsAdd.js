import React,{Component} from 'react'
<<<<<<< HEAD
import {Card, Button ,message} from 'antd'
// import  qs from 'qs'
import  './goodsAdd.less'
class GoodsAdd extends Component{
=======
import { Card ,Button, message} from 'antd'

import  qs from 'qs'
class FoodAdd extends Component{
>>>>>>> zhy
   constructor(){
      super()
      this.state={name:'',price:'',imgpath:'',desc:'',goodstype:'男装'}
   }
<<<<<<< HEAD

//    initData(){
//         this.$axios.post('/hehe/admin/goods/goodsadd',{
//             name:'wqe',price:'41',imgpath:'asd',desc:'das',goodstype:'sad'
//         }).then((res)=>{
//             console.log(res)
//         })
//    }

//    componentDidMount(){
//         this.initData()
//    }

=======
<<<<<<< HEAD
>>>>>>> 7c18df0a0900a684761a076ec3ae1f3f9667e7c7
   submit=()=>{   //商品信息上传
        let {name,price,imgpath,desc,goodstype} = this.state
        console.log({name,price,imgpath,desc,goodstype})
        if(imgpath !==''){
            let url='/hehe/admin/goods/goodsadd'
            let data={name,price,imgpath,desc,goodstype}
            this.$axios.post(url,data).then((res)=>{
            console.log(res)
                if(res.err===0){
                    message.success('add ok')
                }
            })
        }else{
            message.error('快点上传图片')
        }    
   }
   upload=()=>{  //图片信息上传
        let file=this.refs.file.files[0]
        console.log(file)
        let formdata= new FormData()
        formdata.append('img',file)//key值是single里的image
        this.$axios.post('/hehe/imgupload',formdata)
        .then((data)=>{
            console.log(data)
            if(data.data.err === 0){
                this.setState({imgpath:data.data.imgpath})
            }else{
                message.error('文件上传失败请重试')
=======
  submit=()=>{
     let {name,price,imgPath,desc,foodType} = this.state
     console.log({name,price,imgPath,desc,foodType})
     if(imgPath !== ''){
         let query =qs.stringify({name,price,imgPath,desc,foodType})
         console.log(query)
         this.$axios.get('/hehe/admin/food/addFood?'+query)
         .then((data)=>{
            if(data.err===0){
               message.success('add ok')
>>>>>>> zhy
            }
        })
   }
   render(){
        let {name,price,imgpath,desc,goodstype} = this.state   
        return (
            <Card className='add_container'>
                <span>品名:</span><input type="text" value = {name} onChange={(e)=>{
                   this.setState({name:e.target.value}) 
                }}/><br/>
                <span>价格:</span><input type="number" value = {price} onChange={(e)=>{
                   this.setState({price:e.target.value}) 
                }}/><br/>
                {/* <span>缩略图:</span><input type="file" ref='file'/><br/>
                <button onClick={this.upload}>上传</button>
                <img src={imgpath} withd='80' height='80' alt=""/> */}
                <span>缩略图:</span><input type="file" ref='file'/> 
                <button onClick={this.upload}>上传</button>
                <img src={imgpath} width='80' height='80' alt=""/>

                <br/>

<<<<<<< HEAD
                <span>描述:</span><input type="text" value = {desc} onChange={(e)=>{
                   this.setState({desc:e.target.value}) 
                }}/><br/>
                {/* <span>类型:</span><input type="text" value = {goodstype} onChange={(e)=>{
                   this.setState({goodstype:e.target.value}) 
                }}/> */}
                <span>类型:</span><select value={goodstype}  onChange={(e)=>{
                    this.setState({goodstype:e.target.value})
                }}>
                    <option >男装</option>
                    <option >女装</option>
                    <option >新品上架</option>
                    <option >童装区</option>
                    <option >秋冬外套</option>
                </select>
                <br/>

                <Button type='primary' onClick={this.submit}>提交</Button>
            </Card>
        )
   }
=======
    
  }
  upload=()=>{
   let file=this.refs.file.files[0]  
   // 获取文件域里的文件信息
   let formdata= new FormData()
   // 创建formdata对象
   formdata.append('hehe',file)
   // 将文件信息以 hehe 为key 添加点到formdata对象里面去
   this.$axios.post('/hehe/admin/file/img',formdata)
   .then((data)=>{
      if(data.err === 0){
         this.setState({imgPath:data.imgPath})
      }else{
         message.error('文件上传失败请重试')
      }
   })
  }
  render(){
     let {name,price,imgPath,desc,foodType} = this.state
    return(
      <Card title='商品添加'>
          <span>name:</span><input type="text" value={name} onChange={(e)=>{
             this.setState({name:e.target.value})
          }}/><br/>
          <span>价格</span><input type="number" value={price} onChange={(e)=>{
             this.setState({price:e.target.value})
          }}/><br/>
          <span>缩略图:</span><input type="file" ref='file'/><br/>
          <button onClick={this.upload}>上传</button>
          <img src={imgPath} withd='80' height='80' alt=""/>
          <hr/>
          <span>描述:</span><input type="text" value={desc} onChange={(e)=>{
             this.setState({desc:e.target.value})
          }}/><br/>
          <span>类型</span>
          <select value={foodType}  onChange={(e)=>{
             this.setState({foodType:e.target.value})
          }}>
             <option >热菜</option>
             <option >凉菜</option>
             <option >食堂菜</option>
          </select>
         
          <Button type='primay' onClick={this.submit}>提交</Button>
      </Card>
    )
  }
>>>>>>> zhy
}
export default  GoodsAdd
