import React, { Component } from 'react';

import { Layout, Input, Button} from 'antd';
import Nav from '../home/Nav';
import Wheel from '../home/Wheel';
import IndexTable from '../global/PTable';
import Bottom from '../home/Buttom';
import Fetch from '../own/Fetch';

const Search = Input.Search;



class DataIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/data/')
        .then((data) => {
          console.log(data);
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }
      render(){
          const columns = [{
              title: '资料名称',
              dataIndex: 'name',
              width: 100,
            }, {
              title: '资料描述',
              dataIndex: 'desc',
              width: 250,
            }, {
              title: '所属分类',
              dataIndex: 'type',
              width: 100,
            },{
              title: '下载',
              width:70,
              dataIndex: 'data',
              render: (text) => (
                <a href={text}>下载</a>
              )
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
          // onSearch={value => console.log(value)}
          onSearch={value => {
            Fetch.get('/api/data/?name='+value)
            .then((data) => {
              console.log(data);
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
          <Button type="primary" href='#/data/all/'>我的资料</Button>
        </div>
        </div>
        <div>
        <IndexTable rowKey='id' columns={columns} data={data}/>
        </div>

        <Bottom/>
      </Layout>
    );
  }
}


export default DataIndex;