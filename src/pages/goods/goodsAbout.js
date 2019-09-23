import React,{Component} from 'react'
import {Card,Table,Button,Pagination,Spin,Popconfirm, message} from 'antd'
import GoodsRevise from  './goodsRevise'

class GoodsAbout extends Component{
  constructor(){
    super()
    this.state={
      dataSource:[],
      page:1,
      pageSize:4,
      goodstype:'男装',
      total:0,
      loading:true,
      reviseGoods:false, //切换页面显示
      record:{},
    }
  } 
  columns = [
    {
      title: '品名',
      dataIndex: 'name',    //下标，不能重复
      key: 'name',          //对应表头每一条数据里的key值
      width:200,
      fixed:'left'
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width:200,
      fixed:'left'
    },
    {
      title: '图片',
      dataIndex: 'imgpath',
      key: 'imgpath',
      width:200,
      fixed:'left',
      render:(data)=>{
        console.log(data)
        return(
          <img width = '80' height='60'src={`http://localhost:8080${data}`} alt=''/>
        )
      }
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      width:150,
      fixed:'left',
    },
    {
      title: '类别',
      dataIndex: 'goodstype',
      key: 'goodstype',
      width:150,
      fixed:'left',
    },
    {
      title: '操作',
      dataIndex: 'tool',
      key: 'tool',
      width:150,
      fixed:'left',
      render:(txt,record)=>{ //record里面是当前商品所有信息
        return(
          <div>
            <Button type='primary' size='small' 
                    onClick={this.revise.bind(this,record)}
                    
            >修改</Button>
            <Popconfirm title='茫茫人海，再也不见 ?'
              onConfirm={this.goodsDel.bind(this,record._id)}
            >
              <Button type='danger' size='small'>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  refreshG=()=>{ //列表的刷新方法 1.关掉模态框 2.刷新页面
    this.setState({reviseGoods:false})
    // console.log('999999',this.state,this.state.pageSize)
    this.initData('',this.state.page,this.state.pageSize)

  }
  revise(record){ //修改数据
    console.log('修改的数据',record)
    this.setState({reviseGoods:!this.state.reviseGoods,record}) //模态框显隐 按钮后更新数据 
  }
  goodsDel=(id)=>{
    // console.log(id)
    let {page,pageSize} =this.state
    this.$axios.post('/hehe/admin/about/del',{id})
    .then((data)=>{
      // console.log(data.data.total)
      if(data.data.err===0){
        message.success('已删除')
        this.initData('',page,pageSize) //数据库删除后，数据刷新
      }else{
        message.error('删除失败请重试')
      }
    })
  }
  pageChange=(page,pageSize)=>{
    // console.log('页面改变',page,pageSize)
    this.initData('',page,this.state.pageSize) //数据刷新
    this.setState({page:page}) //删除后，页数还是删除前页数
  }
  initData=(goodstype,page,pageSize)=>{
    let data ={goodstype,page,pageSize}
    this.setState({loading:true})
    this.$axios.post('/hehe/admin/about/findByTypePage',data)
    .then((data)=>{
      console.log(data.data.total)
      if(data.data.err === 0){
        this.setState({dataSource:data.data.list,total:data.data.total,loading:false})
      }
    })
  }
  componentDidMount(){
    let {goodstype,page,pageSize} = this.state
    this.initData(goodstype,page,pageSize)
  }
  render(){
    let {total,pageSize,reviseGoods,loading,record}= this.state
    return(
      <Card className='about_cotainer'>
        <Spin tip='稍等一下，马上就来...' spinning={loading}> 
        {/* 小菊花 页面 */}
          {!reviseGoods||<GoodsRevise record={record} refreshG={this.refreshG}></GoodsRevise>} 
          {/* 传入要更新的数据，父组件刷新的方法 */}
          <Table dataSource={this.state.dataSource} 
                columns={this.columns}
                scroll={{x:1100 ,y:500}}
                pagination={false}
          />
          <Pagination simple defaultCurrent={1} total={total} pageSize={pageSize} onChange={this.pageChange} />
        </Spin>
      </Card>
    )
  }
}
export default  GoodsAbout 