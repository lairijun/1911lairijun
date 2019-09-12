import React,{Component} from 'react'
import {HashRouter,NavLink,Switch,Redirect,Route} from 'react-router-dom'


import Hengyuan from './pages/hengyuan.js'
class RootRouter extends Component{
    render(){
        return(
            <HashRouter>
                <NavLink to='/hengyuan'>hengyuan</NavLink>

                <Redirect exact from='/' to='/hengyuan'></Redirect>
                <Route path='/hengyuan' component={Hengyuan}></Route>
            </HashRouter>
        )
    }
}

export default RootRouter