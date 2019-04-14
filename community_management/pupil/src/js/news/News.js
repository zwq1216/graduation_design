import React, {Component} from 'react';
import {Layout} from 'antd';

import NewsNav from './NewsNav';
import Nav from '../home/Nav';
import {
    Info,
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
            <PersonContent app={<Info/>}/>
        )
    }
}

// 发布新闻活动
class PubNews extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}

// 资料管理
class ManagerNews extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}


export {AllNews, PubNews, ManagerNews};