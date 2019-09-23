import React,{Component} from 'react'
import {Menu,Icon,Switch} from 'antd'
import {withRouter} from 'react-router-dom'
import Navdata from './navData'
import './index.less'
const {SubMenu}=Menu;

 class leftNav extends Component{
   constructor(){
     super()
     this.state={
       data:[]
     }
   }
   componentDidMount(){
     setTimeout(()=>{
       this.setState({data:Navdata.data})
     },200)
   }
   renderItem(arr){
    //  console.log(arr)
     if(!arr.length){
       return '暂无数据'
     }
     return arr.map((item)=>{
       if(item.children){
         return(
           <SubMenu key={item.key}  title={ 
             <span>
            <Icon type={item.type} />
            <span>{item.name}</span>
          </span>}>
            
             {this.renderItem(item.children)}
           </SubMenu>
         )
       }else{
         return(  
           <Menu.Item key={item.key}
            onClick={this.jump.bind(this,item.path)}
        ><Icon type={item.type} /> <span>{item.name}</span></Menu.Item>)
       }
     })
   }
   state = {
    theme: 'dark',
    current: '1',
  };

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
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
        <div className='leftNav' >
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
        />
        <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
        {/* <Menu.Item  key="70" onClick={this.jump.bind(this,'/admin/home')}> <Icon type="home" />
            <span>首页</span></Menu.Item>
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
              <Menu.Item key="91" onClick={this.jump.bind(this,'/admin/banner/list')}>轮播图列表</Menu.Item>
              <Menu.Item key="92" onClick={this.jump.bind(this,'/admin/banner/add')}>轮播图上传</Menu.Item>
              
            
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
          </SubMenu> */}
           {this.renderItem(this.state.data)}
        </Menu>
        
      </div>
    )
}
 }
 export default withRouter(leftNav)