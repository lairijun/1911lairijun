import React,{Component} from 'react'
import {Card, Button ,message,Table, Divider, Tag} from 'antd'

class bannerList extends Component{
  constructor(){
      super()
      this.state={dataSource:[]}
  }
    initDate(){
        let url='/hehe/admin/banner/bannerlist';
    let data={}
        this.$axios.post(url,data).then((res)=>{
            console.log(res.data.data)
        })
    
    }
    componentDidMount(){
       this.initDate()
    }
   render(){
    //    console.log(this)
    const columns = [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          render: text => <a>{text}</a>,
        },
        {
            title: 'img',
            dataIndex: 'img',
            key: 'img',
            render: text => <a>{text}</a>,
          },

      ];
      
      const data = [
        {
          key: '1',
          id: 'John Brown',
          imgpath:'' 
        },
        {
            key: '2',
            img: 'xxxx',
            imgpath:'' 
          },
      ];
        return (
            <Card className='list_container'>
         <Table columns={columns} dataSource={data} />
        </Card>
        )
   }
}
export default bannerList
