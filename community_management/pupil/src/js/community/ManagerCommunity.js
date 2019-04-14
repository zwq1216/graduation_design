import React, {Component} from 'react';
import { Tabs, Divider, Button } from 'antd';

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
            "model": {
                nick: '小强',
                name: '真实姓名',
                sno: '1515925688',
                grade: '班级',
                college: '学院',
                role: '角色',
                phone: '手机号',
                status: '用户状态',
                add_time: '注册时间',
            }
        };
    }
    render(){
        const model = this.state.model;
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>用户信息</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div className='con-content-c'>昵称：{model.nick}</div>
                    <div className='con-content-c'>真实姓名：{model.name}</div>
                    <div className='con-content-c'>学号/工号：{model.sno}</div>
                    <div className='con-content-c'>班级：{model.grade}</div>
                    <div className='con-content-c'>学院：{model.college}</div>
                    <div className='con-content-c'>角色：{model.role}</div>
                    <div className='con-content-c'>手机号：{model.phone}</div>
                    <div className='con-content-c'>用户状态：{model.status}</div>
                    <div className='con-content-c'>注册时间：{model.add_time}</div>
                </div>
            </div>
        )
    }
}

export {Info};
