import React,{Component} from 'react'
import {HashRouter,Switch,Redirect,Route} from 'react-router-dom'
import App from './App'
import Admin from 'pages/admin'
import Login from 'pages/login/login.js'
class RootRouter extends Component{
    render(){
        return(
            <App>
            <HashRouter>
                <Switch>
                <Redirect exact from='/' to='/login'></Redirect>
                <Route path='/admin' component={Admin}></Route>
                <Route path='/login' component={Login}></Route>
              </Switch>    
            </HashRouter>
            </App>
        )
    }
}

export default RootRouter