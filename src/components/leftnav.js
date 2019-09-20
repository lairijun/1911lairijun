import React,{Component} from 'react'
import {Menu,Icon} from 'antd'
import {Switch,withRouter} from 'react-router-dom'


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
    jump=(path)=>{
      this.props.history.push({pathname:path})
    }
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
            <SubMenu key="9"  title={
              <span>
                <Icon type="mail" />
                <span>banner管理</span>
              </span>
            }>
              <Menu.Item key="91">轮播图列表</Menu.Item>
              <Menu.Item key="92" onClick={this.jump.bind(this,'/admin/banner/add')}>轮播图添加</Menu.Item>
              <Menu.Item key="93">轮播图修改</Menu.Item>
              <Menu.Item key="94">轮播图删除</Menu.Item>
            
            </SubMenu>
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
           <Menu.Item key="30" onClick={this.jump.bind(this,'/admin/goodsadd')}>商品添加</Menu.Item>
           <Menu.Item key="918" onClick={this.jump.bind(this,'/admin/goodsabout')}>商品查询</Menu.Item>
           
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
           <Menu.Item key="20" onClick={this.jump.bind(this,'/admin/usermanage')}>客户管理</Menu.Item>
            <Menu.Item key="21" onClick={this.jump.bind(this,'/admin/adminmanage')}>管理员管理</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
}
 }
 export default withRouter(leftNav)