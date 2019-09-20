import React,{Component} from 'react'
import {Card,Button,Input,} from 'antd'
import './bannerupdate.less'


class BannerUpdate extends Component{
    constructor(props){
        super(props)
        this.state=props.record
    }
    submit=()=>{
        let {_id,id,imgpath} = this.state
        let data={_id,id,imgpath}
        console.log(data)
        let url = '/hehe/admin/banner/bannerupdate'
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
        
        let {id} = this.state
        return(
            <div className='updateModel'>
                <Card className='card'>
                    banner图id
                    <Input type='text' value={id} onChange={(e)=>{
                        this.setState({id:e.target.value})
                    }}/>
                  
                    <hr/>
                    用户头像
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

export default BannerUpdate