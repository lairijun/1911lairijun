import React,{Component,Fragment} from 'react'
import {Card} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import ActionCreator from 'store/actionCreator'
import './index.less'
class TokenModel extends Component{
    back=()=>{
        // this.props.test()
        this.props.changeModelState()
        this.props.history.push('/login')
    }
    render(){
        return(
            <Fragment>
                {!this.props.modelState||
                      <div className='tokenmodel'>
            <Card>
                <p>token丢失请重新登录</p>
                <button onClick={this.back}>返回登录</button>
            </Card>
            </div> }
          
           </Fragment>
        )
    }
}
// export default connect(state=>state,(dispatch)=>{
//     return{
//         test(){
//             dispatch(ActionCreator.changeModelState())
//         }
//     }
// })(TokenModel)

let NewComponent=withRouter(TokenModel)

export default connect(state=>state,(dispatch)=>{
    return bindActionCreators(ActionCreator,dispatch)
})(NewComponent)