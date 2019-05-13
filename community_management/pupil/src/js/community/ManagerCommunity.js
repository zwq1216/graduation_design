import React, {Component} from 'react';
import { Tabs, Divider, Button, message} from 'antd';
import {CommunityCardB} from '../global/Card';
import Fetch from '../own/Fetch';
import history from  '../own/history';
import ApplyForm from '../global/Apply';
import Table from '../global/Table';
import {EditForm, MonitForm, CreateForm} from './CommunityList';


class All extends Component {
    constructor(props){
        super(props);
        this.state = {
          models: []
        }
      }
      
      componentDidMount(){
        this._isMounted = true;
        Fetch.get('/api/community/')
        .then((data) => {
            this.setState({
              models: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }
      componentWillUnMount = () => {
        this._isMounted = false;
    }
    render(){
        const model = this.state.models;
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>全部社团</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    {/* <div> */}
                    <div style={{height: 1300}}>
                {
                    model.map(function(val, index, array){
                        return <CommunityCardB
                        key={index}
                        id={val.id}
                        data={val.name}
                        img={val.image}
                        score={val.score}
                        />
                    })
                }
        </div>
                </div>
            </div>
        )
    }
}

class Pub extends Component {

    render(){
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>申请创建社团</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                   <div style={{height: 550, width:500}}>
                        <ApplyForm/>
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
      componentDidMount(){
        Fetch.get('/api/community/')
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }
      onClick = (id) => {
        Fetch.delete(`/api/community/del/${id}/`).then((data) => {
            Fetch.get('/api/community/')
            .then((data) => {
                this.setState({
                data: data
                })
            }).catch(err=>{
                console.log(err)
            })
            message.info('删除成功');
        }).catch(err=>{
            // Fetch.get('/api/community/')
            // .then((data) => {
            //     this.setState({
            //     data: data
            //     })
            // }).catch(err=>{
            //     console.log(err)
            // })
          message.info('无权删除');
        })
     };
     onEdit = (id) => {
        history.push(`/app/community/edit/${id}`);
     }
    render() {
        const columns = [{
            title: '社团编号',
            dataIndex: 'no',
            width: 70,
        },{
            title: '社团名称',
            dataIndex: 'name',
            width: 70,
        },{
            title: '宗旨',
            width:150,
            dataIndex: 'objective',
            render: (text) => (
            <div>{text.slice(0, 20)}</div>
            )
        },{
            title: '积分',
            dataIndex: 'score',
            width: 50,
        },{
            title: '所属学院',
            dataIndex: 'college',
            width: 70,
        },{
            title: '编辑',
            width:40,
            dataIndex: 'id',
            render: (id) => (
                <Button type="primary" onClick={this.onEdit.bind(this, id)}>编辑</Button>
            )
          },{
            title: '删除',
            width:40,
            dataIndex: 'id',
            render: (id) => (
                <Button type="primary" onClick={this.onClick.bind(this, id)}>删除</Button>
            )
          }];
            
    const data = this.state.data;
    return(
        <div className='con'>
            <div className='con-top'>
                <div className='con-top-title'>社团列表</div>
            </div>
            <Divider style={{ marginTop:0, marginBottom:0}}/>
            <div className='con-content'>
                <div style={{height: 550}}>
                    <Table rowKey='id' columns={columns} data={data}/>
                </div>
            </div>
        </div>
    )
    }
}

class Edit extends Component {
    
    render(){
        const data = this.props.data;
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>编辑{data.name}社团信息</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                   <div style={{height: 550, width:500}}>
                        <EditForm data={data}/>
                   </div>
                </div>
            </div>
        )
    }
}


class Monit extends Component {
    
    render(){
        const data = this.props.data;
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>积分记录</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                   <div style={{height: 550, width:500}}>
                        <MonitForm/>
                   </div>
                </div>
            </div>
        )
    }
}

class Create extends Component {
    
    render(){
        const data = this.props.data;
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>创建社团</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                   <div style={{height: 1100, width:500}}>
                        <CreateForm/>
                   </div>
                </div>
            </div>
        )
    }
}

export {All, Pub, Manage, Edit, Monit, Create};
