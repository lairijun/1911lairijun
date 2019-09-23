import React,{Component} from 'react'
import './index.less'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {withRouter} from 'react-router-dom'
import LeftNav from 'components/leftnav'
import TopNav from 'components/topnav'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ActionCreator from 'store/actionCreator'
const { Header, Sider, Content } = Layout;

class Admin extends Component{
 
  componentDidMount(){
  if(!localStorage.getItem('us')){
    if(!this.props.location.state){
      alert('奸贼快滚')
        this.props.history.push('/login')
    }else{
          localStorage.setItem('us',this.props.location.state.us)
    }
 }
    // console.log(this.props.location.state.us)
  }

    render(){
      
      // console.log(this.props.collapsed)
      let {pathname}=this.props.location
        return(
          <div>
          <Layout>
            <Sider 
            trigger={null} collapsible collapsed={this.props.collapsed}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
             
             <LeftNav></LeftNav>
              </Menu>
            </Sider>  
            
            <Header style={{background:'#fff',padding:0,height:0}}>
            <TopNav/>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{pathname}</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight:650,
                  minWidth:1150,
                  maxWidth:1160
                }}
              >
               {this.props.children}
              </Content>
            </Layout>
         </Header>
          </Layout>
        </div> 


          
          //   <div className='admin'>
          //   <div className='admin-left'>
          //       <LeftNav></LeftNav>
          //   </div>
          //   <div className='admin-right'>
          //    <div className='admin-right-top'><TopNav></TopNav></div>
          //    <div className='admin-right-center'>  {this.props.children}</div>
          //    <div className='admin-right-footer'>footer</div>
          //   </div>
          // </div>
        )
    }
}
let NewComponent= withRouter(Admin)
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(ActionCreator,dispatch)
})(NewComponent)