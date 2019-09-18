import React,{Component} from 'react'
import {Menu,Icon} from 'antd'
import {withRouter} from 'react-router-dom'
import  './topnav.less'
const {SubMenu}=Menu;


 class Topnav extends Component{
    loginout=(path)=>{
      localStorage.removeItem('us')
      localStorage.removeItem('token')
      this.props.history.push(path)
        };

    state = {
        current: 'mail',
      };

    handleClick = e => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    };
componentDidMount(){
  let us=localStorage.getItem('us')
  console.log(this)
  this.setState({us})
}
render(){
  console.log(this)
    return(
        <div className='topwarp'>
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
               <img src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' alt=''/>
          <span>{this.state.us}</span>
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
        
 
      </div>
    )
}
 }
 export default withRouter(Topnav)