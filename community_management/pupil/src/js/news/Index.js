import React, { Component } from 'react';

import { Layout, Input, Button} from 'antd';
import Nav from '../home/Nav';
import Wheel from '../home/Wheel';
import IndexTable from '../global/PTable';
import Bottom from '../home/Buttom';
import Fetch from '../own/Fetch';

const Search = Input.Search;



class NewsIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    Fetch.get('/api/news/')
    .then((data) => {
        this.setState({
          data: data
        })
    }).catch(err=>{
      console.log(err)
    })
  }
    render() {
        const columns = [{
          title: '新闻活动名称',
          dataIndex: 'name',
          width: 100,
        }, {
          title: '新闻活动描述',
          width:250,
          dataIndex: 'desc',
          render: (text) => (
            <div>{text.slice(0, 20)}</div>
          )
        },{
          title: '浏览量',
          dataIndex: 'count',
          width: 100,
        },{
          title: '发布者',
          dataIndex: 'user',
          width: 70,
        },
        {
          title: '发布时间',
          dataIndex: 'add_time',
          width: 70,
        }];
        
      const data = this.state.data;
    return (
      <Layout className="App">
        <Nav/>
        <Wheel/>
        <div>
        <div style={{width:300, marginTop:10, marginLeft:20, float: "left"}}>
        <Search
          placeholder="输入关键字"
          onSearch={value => {
            Fetch.get('/api/news/?name='+value)
            .then((data) => {
                this.setState({
                  data: data
                })
            }).catch(err=>{
              console.log(err)
            })
          }}
          enterButton
        />
        </div>
        <div style={{marginTop:10, marginRight:10, float:"right"}}>
          <Button type="primary" href='#/app/news/all/'>我的新闻管理中心</Button>
        </div>
        </div>
        <div>
         <IndexTable rowKey='id' columns={columns} data={data} herf='/app/news/detail/'/>
        </div>

        <Bottom/>
      </Layout>
    );
  }
}


export default NewsIndex;