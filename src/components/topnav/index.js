import React,{Component} from 'react'
import {Layout,Menu,Icon, Avatar} from 'antd'
import {withRouter} from 'react-router-dom'
import ActionCreator from 'store/actionCreator'
import Store from 'store/store'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import  './index.less'
// import Store from 'store/store'
const {SubMenu}=Menu;
const {Header}=Layout

 class Topnav extends Component{
    loginout=(path)=>{
      localStorage.removeItem('us')
      localStorage.removeItem('token')
      this.props.history.push(path)
        };
        state = {
            current: 'mail',
          };
      toggle = () => {
        console.log(  Store.dispatch(ActionCreator.changeTriggerState()))
       Store.dispatch(ActionCreator.changeTriggerState(Store.getState()))
       console.log(this.props.changeTriggerState())
      };

    handleClick = e => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    };
componentDidMount(){
  let us=localStorage.getItem('us')
  // console.log(this)
  this.setState({us})
 

  
}
render(){
  // console.log(localStorage.getItem('us'))
  // console.log(Store.getState())
  // let userinfo= Store.getState()
 let userinfo=localStorage.getItem('us')
//   console.log(userinfo)
    return(
        <Header className="header"  style={{ background: '#fff', padding: 0 ,position:'relative'}}>
          <Icon
              className="trigger"
              type={this.props.collapsed? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{position:'absolute',left:0,top:'20px'}}
            />
       <Menu  className='top' onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        
        <Menu.Item key="search">
          <Icon type="search" />
           
        </Menu.Item>

        <Menu.Item key="down-circle" >
          <Icon type="down-circle" />
       
        </Menu.Item>

        <Menu.Item key="bell" >
          <Icon type="bell" />
       </Menu.Item>
             <SubMenu
          title={
            <div className="hand">
             <div className='handimg'>
             <Avatar icon="user" style={{position:'absolute' ,left:'-9px',top:'6px'}} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
   
         <span>{userinfo}</span>
          </div>
          
            </div>
          }
        >
        <Menu.Item key="user">
          <Icon type='user' />
          个人中心
        </Menu.Item>

        <Menu.Item key="setting" >
          <Icon type="setting" />
          个人设置
        </Menu.Item>

        <Menu.Item key="logout" onClick={this.loginout.bind(this,'/login')}>
          <Icon type="logout" />
          退出登录
        </Menu.Item>
        </SubMenu>

        <Menu.Item key="global" >
          <Icon type="global" />
          </Menu.Item>
      </Menu>

      </Header>
    )
}
 }

 let NewComponent=withRouter(Topnav)

export default connect(state=>state,(dispatch)=>{
    return bindActionCreators(ActionCreator,dispatch)
})(NewComponent)