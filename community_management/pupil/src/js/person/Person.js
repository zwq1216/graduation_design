import React, {Component} from 'react';
import {Layout} from 'antd';

import PersonNav from './PersonNav';
import Nav from '../home/Nav';
// import {Message} from './ManagerPerson';
import {
    Message, Info, Audit, JoinClub, QuitClub, UserInfo, Edit
} from './ManagerPerson';
import '../../css/person/person.css';

const {Sider, Content} = Layout;


class PersonContent extends Component {
    render(){
        return(
            <Layout>
                <Nav/>
                <Layout>
                    <Sider width={220} theme='light' style={{ border: '#d4d4d4 solid 1px'}}>
                        <PersonNav/>
                    </Sider>
                    <Content style={{ border: '#d4d4d4 solid 1px', borderLeft: '#d4d4d4 solid 0px'}}>
                        {this.props.app}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

// 用户信息
class PersonInfo extends Component {

    render(){
        return(
            <PersonContent  app={<Info/>}/>
        )
    }
}

// 消息
class PersonMessage extends Component {
    render(){
        return(
            <PersonContent app={<Message/>}/>
        )
    }
}

// 待审核
class PersonAudit extends Component {
    render(){
        return(
            <PersonContent app={<Audit/>}/>
        )
    }
}

// 修改个人信息
class PersonEdit extends Component {
    render(){
        return(
            <PersonContent app={<Edit/>}/>
        )
    }
}

// 申请加入社团
class PersonJoinClub extends Component {
    render(){
        return(
            <PersonContent app={<JoinClub/>}/>
        )
    }
}

// 申请退出社团
class PersonQuitClub extends Component {
    render(){
        return(
            <PersonContent app={<QuitClub/>}/>
        )
    }
}

// 社团成员管理
class PersonManage extends Component {
    render(){
        return(
            <PersonContent app={<UserInfo/>}/>
        )
    }
}

export {PersonInfo, PersonMessage, PersonAudit, PersonEdit, PersonJoinClub, PersonQuitClub, PersonManage};