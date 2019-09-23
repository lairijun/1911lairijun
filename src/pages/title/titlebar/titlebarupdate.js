import React,{Component} from 'react'
import {Card,Button,Input,} from 'antd'
import './titlebarupdate.less'


class TitlebarUpdate extends Component{
    constructor(props){
        super(props)
        this.state=props.record
    }
    submit=()=>{
        let {_id,title,imgpath} = this.state
        let data={_id,title,imgpath}
        console.log(data)
        let url = '/hehe/admin/titlebar/titlebarupdate'
        this.$axios.post(url,data).then((data)=>{
            console.log('客户更新',data)
            this.props.refreshfun()
        })
    }


    cancel=()=>{
        this.props.refreshfun()
    }
    upload=()=>{
        let img=this.refs.img.files[0]
        // console.log(img)
        let formdata=new FormData()
        formdata.append('img',img)
        let url='/hehe/imgupload'
        this.$axios.post(url,formdata)
        .then((res)=>{
            console.log(res)
            this.setState({imgpath:res.data.imgpath})
        }).catch((err)=>{
            console.log(err)
        })

    }
    render(){
        // console.log(this,'更新模态框')
        
        let {title} = this.state
        return(
            <div className='updateModel'>
                <Card className='card'>
                    标题：
                    <Input type='text' value={title} onChange={(e)=>{
                        this.setState({title:e.target.value})
                    }}/>
                  
                    <hr/>
                    用户头像:
                    {/* <img src="#" alt='' ref='img'/> */}
                    <input type="file" ref='img'/>
                    <button onClick={this.upload}>上传</button>
                    <Button type="primary" onClick={this.submit}>确认修改</Button>
                    <Button type="dashed" onClick={this.cancel}>取消修改</Button>
                </Card>
            </div>
        )
    }
}

export default TitlebarUpdate