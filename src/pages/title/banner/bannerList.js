import React,{Component} from 'react'
import {Card,Table,Button,Popconfirm,Spin,Pagination} from 'antd'
import BannerUpdate from './bannerupdate'
class bannerList extends Component{
  constructor(){
      super()
      this.state={
        dataSource:[],
        record:{},
        page:1,
        pageSize:4,
        total:0,
        loading:true,
        updateShow:false,
        search:''
      }
  }
  componentDidMount(){
    let {page,pageSize} = this.state
    this.initData(page,pageSize)
    }
    columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width:300,
        height:80,
        fixed:'left',
        render: text => <a>{text}</a>,
      },

      {
          title: 'imgpath',
          dataIndex: 'imgpath',
          key: 'imgpath',
          width:300,
          height:80,
          fixed:'left',
          render:(data)=>{
            // console.log(data)
              return(
                <img height='40'  src={`http://localhost:8080${data}`} alt=''/>
              )
          }
        },


        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',  
          width:300,
          height:80,
          fixed:'right',  
          render:(txt,record)=>{
              // console.log(record)
              return(
                  <div>
                      <Button type='primary' size='small' onClick={this.update.bind(this,record)}>修改</Button>
                      
                      <Popconfirm title='你确定要删除吗' onConfirm={this.confirmDel.bind(this,record._id)}>
                          <Button type='danger' size='small'>删除</Button>
                      </Popconfirm>



                  </div>

              ) 
          }
      },
    ];

    refresh=()=>{
      this.setState({updateShow:false})
      this.initData(this.state.page,this.state.pageSize,this.state.search)
  }
  update=(record)=>{
    console.log('update',record)
    this.setState({updateShow:!this.state.updateShow,record:record})
    
    
}
confirmDel=(_id)=>{
  let url='/hehe/admin/banner/bannerdel'
  let data={_id:_id}
  this.$axios.post(url,data).then((res)=>{
      console.log(res)
      let {page,pageSize,search}=this.state
      this.initData(page,pageSize,search)
  })

}

    initData(page,pageSize){
      let url='/hehe/admin/banner/bannerlist';
     let data={page:page,pageSize:pageSize}
      this.$axios.post(url,data).then((res)=>{
         this.setState({dataSource:res.data.data,total:res.data.total,loading:false})
    
      })
  
  }

  pageChange=(page,pageSize)=>{
    console.log('页码改变',page,pageSize)
    this.setState({page:page})
    this.initData(page,this.state.pageSize,this.state.search)
}


render(){
  let {total,pageSize,loading,updateShow,record} = this.state
  return(
      <Card className='userInfo'>
         
         
          <Spin tip='数据加载中' spinning={loading}>
               {!updateShow||<BannerUpdate record={record} refreshfun={this.refresh} ></BannerUpdate>}
              <Table dataSource={this.state.dataSource} columns={this.columns} scroll={{x:900,y:300}}
                  className='tab' pagination={false}
              />
          </Spin>
          <Pagination simple defaultCurrent={1} total={total} pageSize={pageSize} onChange={this.pageChange}/>
      </Card> 
  )
}
}
export default bannerList
   