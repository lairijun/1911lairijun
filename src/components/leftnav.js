import React,{Component} from 'react'
import {Menu,Icon} from 'antd'
import {Switch} from 'react-router-dom'
const {SubMenu}=Menu;
 class leftNav extends Component{
    state = {
        theme: 'dark',
        current: '1',
      };
      handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };
render(){
    return(
        <div>
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
        />
        <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
          style={{ width: 200 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>主题管理</span>
              </span>
            }
          >
            <Menu.Item key="9">banner管理</Menu.Item>
            <Menu.Item key="10">广告位管理</Menu.Item>
            <Menu.Item key="11">标题栏管理</Menu.Item>
            <Menu.Item key="12">...</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>商品管理</span>
              </span>
            }
          >
          
            <SubMenu key="sub3" title="Submenu">
          
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="setting" />
                <span>购物车管理</span>
              </span>
            }
          >
         
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <Icon type="setting" />
                <span>用户管理</span>
              </span>
            }
          >
           <Menu.Item key="20">客户管理</Menu.Item>
            <Menu.Item key="21">管理员管理</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
}
 }
 export default leftNav