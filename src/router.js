import React,{Component} from 'react'
import {HashRouter,NavLink,Switch,Redirect,Route} from 'react-router-dom'

import Yifeng from './pages/zyf'
import Hengyuan from './pages/hengyuan.js'
class RootRouter extends Component{
    render(){
        return(
            <HashRouter>
                <NavLink to='/hengyuan'>hengyuan</NavLink>
                <NavLink to='/yifeng'>张益峰</NavLink>   
                <Redirect exact from='/' to='/hengyuan'></Redirect>
                <Route path='/hengyuan' component={Hengyuan}></Route>
                <Route path='/yifeng' component={Yifeng}></Route>
            </HashRouter>
        )
    }
}

export default RootRouter