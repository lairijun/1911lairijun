import React,{Component} from 'react'
import {HashRouter,Switch,Redirect,Route} from 'react-router-dom'
import App from './App'
import Admin from 'pages/admin'
import Login from 'pages/login/login.js'
<<<<<<< HEAD
import UserManage from 'pages/usermanage/usermanage.js'
import AdminManage from 'pages/adminmanage/adminmanage.js'
=======
import Goodsadd from 'pages/goods/goodsAdd'
>>>>>>> ywd
class RootRouter extends Component{
    render(){
        return(
            <App>
            <HashRouter>
                <Switch>
<<<<<<< HEAD
                <Redirect exact from='/' to='/login'></Redirect>
                <Route path='/admin' render={()=>{
                    return(
                        <Admin>
                            <Route exact path='/admin/usermanage' component={UserManage}></Route>
                            <Route exact path='/admin/adminmanage' component={AdminManage}></Route>
                        </Admin>
                    )
                }}></Route>
=======
                <Redirect exact from='/' to='/admin'></Redirect>
              
>>>>>>> ywd
                <Route path='/login' component={Login}></Route>
                <Route path='/admin' render={(props)=>{
                    return(
                        <Admin>
                           <Route path='/admin/goodsadd' component={Goodsadd}></Route>
                        </Admin>
                    )
                }}
                ></Route>
              </Switch>    
            </HashRouter>
            </App>
        )
    }
}

export default RootRouter