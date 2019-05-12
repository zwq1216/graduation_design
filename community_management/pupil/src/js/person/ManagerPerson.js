import React, {Component} from 'react';
import { Tabs, Divider, Button, message } from 'antd';

import {
    MessageList, JoinClubForm, QuitClubForm, ManageUserCard, EditUser, Data, Project, Community, Join, Exit
} from './PersonList';
import '../../css/person/person.css';
import Local from '../own/Local';
import Fetch from '../own/Fetch';

const userid = Local.get('userid');

const TabPane = Tabs.TabPane;

// 用户信息
class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
            "model": {}
        };
    }
    componentDidMount(){
        Fetch.get(`/api/users/ret_del/${userid}/`)
        .then((data) => {
            this.setState({
              model: data
            })
        }).catch(err=>{
          console.log(err);
        })
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
                    <div style={{height:550}}>
                        <div className='con-content-c'>昵称：{model.username}</div>
                        <div className='con-content-c'>真实姓名：{model.realname}</div>
                        <div className='con-content-c'>学号/工号：{model.sno}</div>
                        <div className='con-content-c'>班级：{model.grade}</div>
                        <div className='con-content-c'>学院：{model.college}</div>
                        <div className='con-content-c'>角色：{model.role}</div>
                        <div className='con-content-c'>手机号：{model.phone}</div>
                        {/* <div className='con-content-c'>用户状态：{model.status}</div> */}
                        <div className='con-content-c'>注册时间：{model.date_joined}</div>
                    </div>
                </div>
            </div>
        )
    }
}


// 消息
function callback_message(key) {
  console.log(key);
}

class Message extends Component {
    render(){
        const data = [
            {type: '未读', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '未读', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '未读', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '未读', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '未读', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '通知', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '通知', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '通知', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '通知', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '通知', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '通知', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '通知', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '通知', content: '食管裂孔从的女科技发布女包更好的'},
            {type: '通知', content: '食管裂孔从的女科技发布女包更好的'},
        ];
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>消息</div>
                    <div className='con-top-button'>
                        <Button>标记全部为已读</Button>&nbsp;
                        <Button>清空全部已读</Button>
                    </div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <Tabs onChange={callback_message} type="card" size='small'>
                        <TabPane tab="全部消息" key="1"><MessageList data={data}/></TabPane>
                        <TabPane tab="未读消息" key="2"><MessageList data={data}/></TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
} 

// 待审核
class Audit extends Component {
    state = {
        data: []
    }
    onTabClick = (key) => {
        console.log(key)
    }
    render(){
        const data = this.state.data;
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>待审核选项</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <Tabs onTabClick={this.onTabClick} type="card" size='small'>
                        <TabPane tab="资料" key="1"><Data/></TabPane>
                        <TabPane tab="项目" key="2"><Project/></TabPane>
                        <TabPane tab="创建社团" key="3"><Community/></TabPane>
                        <TabPane tab="加入社团" key="4"><Join/></TabPane>
                        <TabPane tab="退出社团" key="5"><Exit/></TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
} 

// 申请加入社团
class JoinClub extends Component {
    render(){
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>申请加入社团</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div style={{height:550, width:400}}>
                        <JoinClubForm/>
                    </div>
                    {/* <Tabs onChange={callback_message} type="card" size='small'>
                        <div className='con-content-form'><JoinClubForm/></div>
                        <TabPane tab="申请加入" key="1">
                            <div className='con-content-form'><JoinClubForm/></div>
                        </TabPane> 
                        <TabPane tab="申请记录" key="2"><MessageList data={data}/></TabPane>
                    </Tabs>  */}
                </div>
            </div>
        )
    }
} 

// 申请退出社团
class QuitClub extends Component {
    render(){
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>申请退出社团</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div style={{height:550, width: 400}}><QuitClubForm/></div>
                </div>
            </div>
        )
    }
}

class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            model: []
        }
    }
    componentDidMount(){
        Fetch.get('/api/users/')
        .then((data) => {
            this.setState({
              model: data
            })
        }).catch(err=>{
          console.log(err)
        })
    }
    render(){
        const model = this.state.model;

        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>社团成员</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content-1'>
                    {
                        model.map(function(val, i, array){
                            return <ManageUserCard key={i} item={val}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

class Edit extends Component {
    render(){
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>修改用户信息</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div style={{width: 300, marginLeft: 10, height:550}}> 
                        <EditUser/>
                    </div>
                </div>
            </div>
        )
    }
} 

export {Message, Info, Audit, JoinClub, QuitClub, UserInfo, Edit};
