import React,{Component,Fragment} from 'react'
import { Form, Icon, Input, Button, Card } from 'antd';
import './login.less'

class Login extends Component{
   
    login=()=>{
        let result = this.props.form.getFieldsValue()
        console.log(result)
        let {us,ps}=result
        let url='/hehe/admin/user/login'
        let data={us:us,ps:ps}
        this.$axios.post(url,data)
        .then((res)=>{
            if(res.data.err===-998){
                alert('无此用户，请重试！')
            }else if(res.data.err===-1){
                alert('用户名密码错误')
            }else{
             
                let us=res.data.username
                let token=res.data.token 
                //   console.log(us,token)
                  localStorage.setItem('token',token)
                this.props.history.push({pathname:'/admin',state:{us:us,token:token}})
            }
        })
    }
    render(){
        // console.log('this',this)
        if(localStorage.length!==0){
            localStorage.clear()
            }
        const { getFieldDecorator } = this.props.form;
        return(
            <Fragment>
            <Card className='login'>
                <h2>admin登录</h2>
                <Form.Item>
                {getFieldDecorator('us',{})(
                    <Input className='inputbox'
                        prefix={    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                    />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('ps',{})(
                <Input className='inputbox' 
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />
                )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                    onClick={this.login}>
                    登录
                    </Button>
                </Form.Item>
                
                
            </Card>
            </Fragment>
        )
    }
}

export default Form.create()(Login)