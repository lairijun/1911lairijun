import React,{Component} from 'react'
import { Card ,Button, message} from 'antd'
import  qs from 'qs'
class FoodAdd extends Component{
   constructor(){
      super()
      this.state={name:'',price:'',imgPath:'',desc:"",foodType:"热菜"}
   }
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
            }
         })
     }else{
        message.error('请先上传图片')
     }

    
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
      if(data.err ===0){
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
}
export default FoodAdd