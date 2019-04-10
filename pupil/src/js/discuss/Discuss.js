import React, {Component} from 'react';
import {Layout} from 'antd';

import DiscussNav from './DiscussNav';
import Nav from '../home/Nav';
import {
    Info,
} from './ManagerDiscuss';
import '../../css/person/person.css';

const {Sider, Content} = Layout;


class PersonContent extends Component {
    render(){
        return(
            <Layout>
                <Nav/>
                <Layout>
                    <Sider width={220} theme='light' style={{ border: '#d4d4d4 solid 1px'}}>
                        <DiscussNav/>
                    </Sider>
                    <Content style={{ border: '#d4d4d4 solid 1px', borderLeft: '#d4d4d4 solid 0px'}}>
                        {this.props.app}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

// 公开讨论主题
class PublicDiscuss extends Component {

    render(){
        return(
            <PersonContent app={<Info/>}/>
        )
    }
}

// 我的参与
class MyDiscuss extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}

// 发布讨论主题
class PubDiscuss extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}

// 社团讨论主题
class CommuntyDiscuss extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}

// 讨论主题管理
class ManagerDiscuss extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}


export {PublicDiscuss, MyDiscuss, PubDiscuss, CommuntyDiscuss, ManagerDiscuss};