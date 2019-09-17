import React,{Component} from 'react'
import './index.less'
import LeftNav from 'components/leftnav'
import TopNav from 'components/topnav'
class Admin extends Component{
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

export default Admin