import React,{Component} from 'react'
import {Card,Button,Input,Select} from 'antd'
import './userupdate.less'
const { Option } = Select

class UserUpdate extends Component{
    constructor(props){
        super(props)
        this.state=props.record
    }
    submit=()=>{
        let {_id,username,password,profile,phone,address,clienttype} = this.state
        let data={_id,username,password,profile,phone,address,clienttype}
        let url = '/hehe/admin/usermanage/update'
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
        console.log(img)
        let formdata=new FormData()
        formdata.append('img',img)
        let url='/hehe/imgupload'
        this.$axios.post(url,formdata)
        .then((res)=>{
            this.setState({profile:res.data.imgpath})
        }).catch((err)=>{
            console.log(err)
        })

    }
    render(){
        console.log(this,'更新模态框')
        
        let {username,password,phone,address,clienttype} = this.state
        return(
            <div className='updateModel'>
                <Card className='card'>
                    用户姓名
                    <Input type='text' value={username} onChange={(e)=>{
                        this.setState({username:e.target.value})
                    }}/>
                    密码
                    <Input type='text' value={password} onChange={(e)=>{
                        this.setState({password:e.target.value})
                    }}/>
                    联系方式
                    <Input type='text' value={phone} onChange={(e)=>{
                        this.setState({phone:e.target.value})
                    }}/>
                    用户地址
                    <Input type='text' value={address} onChange={(e)=>{
                        this.setState({address:e.target.value})
                    }}/>
                    用户级别
                    <Select defaultValue={clienttype} onChange={(value)=>{
                        this.setState({clienttype:value})
                    }}>
                        <Option value='0'>0</Option>
                        <Option value='1'>1</Option>
                    </Select>
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

export default UserUpdate