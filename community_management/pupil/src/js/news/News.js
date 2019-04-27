import React, {Component} from 'react';
import {Layout} from 'antd';

import NewsNav from './NewsNav';
import Nav from '../home/Nav';
import {
    All, Manage, Pub
} from './ManagerNews';
import '../../css/person/person.css';

const {Sider, Content} = Layout;


class PersonContent extends Component {
    render(){
        return(
            <Layout>
                <Nav/>
                <Layout>
                    <Sider width={220} theme='light' style={{ border: '#d4d4d4 solid 1px'}}>
                        <NewsNav/>
                    </Sider>
                    <Content style={{ border: '#d4d4d4 solid 1px', borderLeft: '#d4d4d4 solid 0px'}}>
                        {this.props.app}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

// 全部新闻活动
class AllNews extends Component {

    render(){
        return(
            <PersonContent app={<All/>}/>
        )
    }
}

// 发布新闻活动
class PubNews extends Component {

    render(){
        return(
            <PersonContent app={<Pub/>}/>
        )
    }
}

// 新闻活动管理
class ManagerNews extends Component {

    render(){
        return(
            <PersonContent app={<Manage/>}/>
        )
    }
}


export {AllNews, PubNews, ManagerNews};