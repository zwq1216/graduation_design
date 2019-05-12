import React, { Component } from 'react';

import { Layout, Input, Button} from 'antd';
import Nav from '../home/Nav';
import Wheel from '../home/Wheel';
import IndexTable from '../global/PTable';
import Bottom from '../home/Buttom';
import Fetch from '../own/Fetch';

const Search = Input.Search;


class ProjectsIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/projects/?all=1')
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }
     
  
      render(){
          const columns = [{
              title: '项目名称',
              dataIndex: 'name',
              width: 100,
            }, {
              title: '项目描述',
              dataIndex: 'desc',
              width: 200,
            },{
              title: '赏金',
              dataIndex: 'remuneration',
              width: 30,
            },{
              title: '状态',
              dataIndex: 'status',
              width: 40,
            },{
              title: '发布者',
              dataIndex: 'pub_user',
              width: 40,
            },{
              title: '需求文件下载',
              width:50,
              dataIndex: 'file',
              render: (text) => (
                <a href={text}>下载</a>
              )
            },{
              title: '发布时间',
              dataIndex: 'add_time',
              width: 100,
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
                    Fetch.get('/api/projects/?name='+value+'&all=1')
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
                <Button type="primary" href='#/app/project/all/'>我的项目</Button>
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


export default ProjectsIndex;