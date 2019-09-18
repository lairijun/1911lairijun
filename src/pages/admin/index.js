import React,{Component} from 'react'
import './index.less'
import {withRouter} from 'react-router-dom'
import LeftNav from 'components/leftnav'
import TopNav from 'components/topnav'

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
    // localStorage.setItem("logindata",`[{"us":${this.props.location.state.us}},{"token":${this.props.location.state.token}}]`)
  }
    render(){
      
        return(
            <div className='admin'>
            <div className='admin-left'>
                <LeftNav></LeftNav>
            </div>
            <div className='admin-right'>
             <div className='admin-right-top'><TopNav></TopNav></div>
             <div className='admin-right-center'>  {this.props.children}</div>
             <div className='admin-right-footer'>footer</div>
            </div>
          </div>
        )
    }
}

export default withRouter(Admin)