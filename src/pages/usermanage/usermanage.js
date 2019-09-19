import React,{Component} from 'react'
import {Card,Table,Button,Pagination,Spin,Popconfirm,Select,Input} from 'antd'
import './usermanage.less'
import UserUpdate from '../userupdate/userupdate'
const { Option } = Select
const { Search } = Input;

class UserManage extends Component{
    constructor(){
        super()
        this.state={
            dataSource:[],
            page:1,
            pageSize:4,
            total:0,
            loading:true,
            updateShow:false,
            record:{},
            search:''
        }
    }
    columns=[
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
          width:100,
          fixed:'left'
        },
        {
          title: '密码',
          dataIndex: 'password',
          key: 'password',
          width:100,
          fixed:'left'
        },
        {
            title: '用户头像',
            dataIndex: 'profile',
            key: 'profile',
            width:100,
            render:(data)=>{
                console.log(777,data)
                return(
                    <img width='60' src={`http://10.9.22.244:8080${data}`} alt=''/>
                )
            }
        },
        {
          title: '联系方式',
          dataIndex: 'phone',
          key: 'phone',
          width:100,
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            width:300,
        },
        {
            title: '客户级别',
            dataIndex: 'clienttype',
            key: 'clienttype',
            width:100,
        },
        // {
        //     title: '订单信息',
        //     dataIndex: 'order',
        //     key: 'order',
        // },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',  
            width:300,
            fixed:'right',  
            render:(txt,record)=>{
                console.log(record)
                return(
                    <div>
                        <Button type='primary' size='small'>订单</Button>
                        <Button type='danger' size='small' onClick={this.update.bind(this,record)}>修改</Button>
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
        this.initdata(this.state.page,this.state.pageSize,this.state.search)
    }
    
    update=(record)=>{
        console.log('update',record)
        this.setState({updateShow:!this.state.updateShow,record:record})
        
        
    }

    confirmDel=(_id)=>{
        let url='/hehe/admin/usermanage/del'
        let data={_id:_id}
        this.$axios.post(url,data).then((res)=>{
            console.log(res)
            let {page,pageSize,search}=this.state
            this.initdata(page,pageSize,search)
        })

    }

    initdata=(page,pageSize,clienttype)=>{
        let url='hehe/admin/usermanage/info'
        let data={clienttype:clienttype,page:page,pageSize:pageSize}
        this.$axios.post(url,data)
        .then((res)=>{
            // console.log(123,res.data.list)
            if(res.data.err === 0){
                this.setState({dataSource:res.data.list,total:res.data.total,loading:false})
            }
        })
    }
    pageChange=(page,pageSize)=>{
        console.log('页码改变',page,pageSize)
        this.setState({page:page})
        this.initdata(page,this.state.pageSize,this.state.search)
    }

    findbytype=(value)=>{
        console.log(value)
        value=value!=='all'?value:''
        this.setState({search:value})
        this.initdata(this.state.page,this.state.pageSize,value)
    }
    usersearch=(value)=>{
        let {pageSize}=this.state
        let url='hehe/admin/usermanage/kw'
        let data={kw:value,page:1,pageSize:pageSize}
        this.$axios.post(url,data).then((res)=>{
            console.log(res)
            if(res.data.err===0){
                this.setState({dataSource:res.data.list,total:res.data.total,loading:false})
            }
        })
    }
    render(){
        let {total,pageSize,loading,updateShow,record} = this.state
        return(
            <Card className='userInfo'>
                <div>
                用户等级：
                <Select defaultValue={this.state.clienttype} onChange={this.findbytype}>
                    <Option value='0'>0</Option>
                    <Option value='1'>1</Option>
                    <Option value='all'>all</Option>
                </Select>
                </div>
                <Search
                    placeholder="input search text"
                    onSearch={this.usersearch}
                    style={{ width: 200 }}
                />
                <Spin tip='数据加载中' spinning={loading}>
                    {!updateShow||<UserUpdate record={record} refreshfun={this.refresh} ></UserUpdate>}
                    <Table dataSource={this.state.dataSource} columns={this.columns} scroll={{x:1200,y:300}}
                        className='tab' pagination={false}
                    />
                </Spin>
                <Pagination simple defaultCurrent={1} total={total} pageSize={pageSize} onChange={this.pageChange}/>
            </Card> 
        )
    }
    componentDidMount(){
        let {page,pageSize} = this.state
        this.initdata(page,pageSize)
    }
}

export default UserManage