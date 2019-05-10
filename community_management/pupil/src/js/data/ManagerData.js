import React, { Component } from 'react';
import {message, Button, Divider} from 'antd';
import IndexTable from '../global/PTable';
import Fetch from '../own/Fetch';
import {EditForm} from './DataList';


class All extends Component {
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
        <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>全部资料</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div style={{height:800}}>
                        <IndexTable rowKey='id' columns={columns} data={data}/> 
                    </div>
                </div>
        </div>  
    );
  }
}

class Pub extends Component {

    render(){
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>分享资料</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                   <div style={{height: 550, width:500}}>
                        <EditForm/>
                   </div>
                </div>
            </div>
        )
    }
}

class Manage extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      onClick = (id) => {
        Fetch.delete(`/api/data/ret_del/${id}/`).then((data) => {
            Fetch.get('/api/data/')
            .then((data) => {
                this.setState({
                data: data
                })
            }).catch(err=>{
                console.log(err)
            })
            message.info('删除成功');
        }).catch(err=>{
            Fetch.get('/api/data/')
            .then((data) => {
                this.setState({
                data: data
                })
            }).catch(err=>{
                console.log(err)
            })
          console.log(err);
          message.info('删除成功');
        })
     };
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
              width: 50,
            },{
              title: '下载',
              width:50,
              dataIndex: 'data',
              render: (text) => (
                <a href={text}>下载</a>
              )
            },{
              title: '发布时间',
              dataIndex: 'add_time',
              width: 70,
            },{
                title: '删除',
                width:50,
                dataIndex: 'id',
                render: (id) => (
                    <Button type="primary" onClick={this.onClick.bind(this, id)}>删除</Button>
                )
              }];
            
    const data = this.state.data;
    return (
        <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>资料管理</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div style={{height:800}}>
                        <IndexTable rowKey='id' columns={columns} data={data}/> 
                    </div>
                </div>
        </div>  
    );
  }
}

export {All, Pub, Manage};
