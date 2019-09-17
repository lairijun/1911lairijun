import React,{Component} from 'react'
import {HashRouter,Switch,Redirect,Route} from 'react-router-dom'
import App from './App'
import Admin from 'pages/admin'
class RootRouter extends Component{
    render(){
        return(
            <App>
            <HashRouter>
                <Switch>
                <Redirect exact from='/' to='/admin'></Redirect>
                <Route path='/admin' component={Admin}></Route>
              </Switch>    
            </HashRouter>
            </App>
        )
    }
}

export default RootRouter