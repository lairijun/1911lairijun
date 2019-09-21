import React,{Component} from 'react'
import {Card, Button ,message} from 'antd'

class titlebarAdd extends Component{
   constructor(){
      super()
      this.state={title:'',imgpath:''}
   }
   submit=()=>{   //标题信息上传
        let {title,imgpath} = this.state
        console.log({title,imgpath})
        if(imgpath !==''){
            let url='/hehe/admin/titlebar/titlebaradd'
            let data={title,imgpath}
            this.$axios.post(url,data).then((res)=>{
            console.log(res)
                if(res.err===0){
                    message.success('add ok')
                }
            })
        }else{
            message.error('请上传图片')
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
        let {title,imgpath} = this.state   
        return (
            <Card className='add_container'>
                <span>标题:</span><input type="text" value = {title} onChange={(e)=>{
                   this.setState({title:e.target.value}) 
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
export default  titlebarAdd
