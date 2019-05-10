import React, { Component } from 'react';

import { Divider, Button, message} from 'antd';
import IndexTable from '../global/PTable';
import Fetch from '../own/Fetch';
import {EditForm} from './ProjectList';


class All extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/projects/')
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
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>全部项目</div>
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
      componentDidMount(){
        Fetch.get('/api/projects/')
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }
     
      render(){
         
        return (
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>发布项目</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div style={{height:550, width:400}}>
                        <EditForm/>
                    </div>
            
                </div>
            </div>
           
        );
    }
}


class Manage extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/projects/')
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }
      onClick = (id) => {
        Fetch.delete(`/api/projects/ret_del/${id}/`).then((data) => {
            Fetch.get('/api/projects/')
            .then((data) => {
                this.setState({
                data: data
                })
            }).catch(err=>{
                console.log(err)
            })
            message.info('删除成功');
        }).catch(err=>{
            Fetch.get('/api/projects/')
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
  
      render(){
          const columns = [{
              title: '项目名称',
              dataIndex: 'name',
              width: 70,
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
                title: '删除',
                width:70,
                dataIndex: 'id',
                render: (id) => (
                    <Button type="primary" onClick={this.onClick.bind(this, id)}>删除</Button>
                )
              }];
            
        const data = this.state.data;
        return (
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>项目管理</div>
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
