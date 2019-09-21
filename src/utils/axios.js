import axios from 'axios'
import Store from '../store/store'
import ActionCreator from '../store/actionCreator'
axios.interceptors.request.use(function (config) {
  console.log('请求拦截器',config)
  if(config.url!=="/hehe/admin/user/login"){
    let {method}=config;
  console.log(localStorage)
 console.log(localStorage.getItem('token'))
  if(method==='post'){
   config.data.token=localStorage.getItem('token')
  }
  }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // response.config.data=JSON.parse(response.config.data)
  if(response.status===200){
    if(response.data.err===-998||response.config.data.token===null){
      Store.dispatch(ActionCreator.changeModelState())
    }
      return response;
  }else{
    return Promise.reject('请求出错');
  }
  
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  export default axios