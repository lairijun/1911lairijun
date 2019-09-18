import React,{Component} from 'react'
import { Upload,Icon,Card, Button ,message} from 'antd'
// import  qs from 'qs'
import  './goodsAdd.less'
class GoodsAdd extends Component{
   constructor(){
      super()
      this.state={name:'',price:'',imgpath:'',desc:'',goodstype:'男装'}
   }
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
}
export default  GoodsAdd