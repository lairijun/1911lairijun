import React,{Component} from 'react'
import {HashRouter,Switch,Redirect,Route} from 'react-router-dom'
import App from './App'
import Admin from 'pages/admin'
import Login from 'pages/login/login.js'
import Goodsadd from 'pages/goods/goodsAdd'
class RootRouter extends Component{
    render(){
        return(
            <App>
            <HashRouter>
                <Switch>
                <Redirect exact from='/' to='/admin'></Redirect>
              
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