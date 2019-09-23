import State from './state'
export default (preState=State,action)=>{

    let newData=JSON.parse(JSON.stringify(preState))
   console.log('老佛爷数据修改',newData) 
   let {type,params}=action
    switch(type){
        case 'CHANGE_MODELSTATE':
            newData.modelState=!newData.modelState
            break;
        case 'CHANGE_TRIGGERSTATE':
            newData.collapsed=!newData.collapsed
            break;  
            default:
                break;
    }
    
    return newData
}