import React,{Component} from 'react'
import {Card, Button ,message} from 'antd'

import './goodsRevise.less'
class GoodsRevise extends Component { 
  constructor(props){
    super(props)
    console.log(props,'super传')
    this.state=props.record
  }
  submit=()=>{   //商品信息上传 
    let {_id,name,price,imgpath,desc,goodstype} = this.state // 更新数据
    // console.log({name,price,imgpath,desc,goodstype},'更新的数据？') 
    if(imgpath !==''){
        let url='/hehe/admin/goods/update'
        let data={_id,name,price,imgpath,desc,goodstype}
        console.log(data)
        this.$axios.post(url,data).then((res)=>{
        
          if(res.data.err===0){
            message.success('商品修改成功！')
          }
          console.log(this.props)
          this.props.refreshG()
        })
    }else{
        message.error('快点上传图片！')
    }    
  }
  upload=()=>{  //图片信息上传
    let file=this.refs.file.files[0]
    console.log(file)
    let formdata= new FormData()
    formdata.append('img',file) //key值是single里的img
    this.$axios.post('/hehe/imgupload',formdata)
    .then((data)=>{
        console.log(data)
        if(data.data.err === 0){
            this.setState({imgpath:data.data.imgpath})
            message.success('图片上传成功')
        }else{
            message.error('文件上传失败请重试')
        }
    })
  }  
  render(){
      let {name,price,imgpath,desc,goodstype} = this.state   
      console.log(this,'更新组件')
      return(
      <div className='reviseGoods'>
        <Card className='card'>
                <span>品名:</span><input type="text" value = {name} onChange={(e)=>{
                   this.setState({name:e.target.value}) 
                }}/><br/>

                <span>价格:</span><input type="number" value = {price} onChange={(e)=>{
                   this.setState({price:e.target.value}) 
                }}/><br/>

                <span>缩略图:</span><input type="file" ref='file'/> 
                <br/>

                <button onClick={this.upload} className='onebut'>上传</button>
                <img src={`http://localhost:8080${imgpath}`}  alt=""/>
                <br/>
                
                <span>描述:</span><input type="text" value = {desc} onChange={(e)=>{
                   this.setState({desc:e.target.value}) 
                }}/><br/>
              
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

                <Button type='primary' onClick={this.submit} >提交</Button>
        </Card>
      </div>
    ) 
  }
}
export default  GoodsRevise 
