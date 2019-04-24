import React, { Component } from 'react';

import { Layout, Input, Button} from 'antd';
import Nav from '../home/Nav';
import Wheel from '../home/Wheel';
import IndexTable from '../global/PTable';
import Bottom from '../home/Buttom';
import Fetch from '../own/Fetch';

const Search = Input.Search;



class DiscussIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    Fetch.get('/api/discuss/')
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
            title: '主贴标题',
            dataIndex: 'title',
            width: 100,
          }, {
            title: '所属分类',
            dataIndex: 'catagory',
            width: 100,
          }, {
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
          // onSearch={value => console.log(value)}
          onSearch={value => {
            Fetch.get('/api/discuss/?title='+value)
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
          <Button type="primary" href='#/discuss/all/'>我的帖子</Button>
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


export default DiscussIndex;