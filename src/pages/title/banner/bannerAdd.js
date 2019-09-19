import React,{Component} from 'react'
import {Card, Button ,message} from 'antd'

class bannerAdd extends Component{
   constructor(){
      super()
      this.state={id:'',imgpath:''}
   }
   submit=()=>{   //商品信息上传
        let {id,imgpath} = this.state
        console.log({id,imgpath})
        if(imgpath !==''){
            let url='/hehe/admin/banner/banneradd'
            let data={id,imgpath}
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
        let {id,imgpath} = this.state   
        return (
            <Card className='add_container'>
                <span>id:</span><input type="text" value = {id} onChange={(e)=>{
                   this.setState({id:e.target.value}) 
                }}/><br/>
            
                <span>缩略图:</span><input type="file" ref='file'/> 
                <button onClick={this.upload}>上传</button>
                <img src={imgpath} width='80' height='80' alt=""/>

                <br/>
                <Button type='primary' onClick={this.submit}>提交</Button>
            </Card>
        )
   }
}
export default  bannerAdd
