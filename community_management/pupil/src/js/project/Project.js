import React, {Component} from 'react';
import {Layout} from 'antd';

import ProjectNav from './ProjectNav';
import Nav from '../home/Nav';
import {
    All, Pub, Manage
} from './ManagerProject';
import '../../css/person/person.css';

const {Sider, Content} = Layout;


class PersonContent extends Component {
    render(){
        return(
            <Layout>
                <Nav/>
                <Layout>
                    <Sider width={220} theme='light' style={{ border: '#d4d4d4 solid 1px'}}>
                        <ProjectNav/>
                    </Sider>
                    <Content style={{ border: '#d4d4d4 solid 1px', borderLeft: '#d4d4d4 solid 0px'}}>
                        {this.props.app}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

// 全部项目
class AllProject extends Component {

    render(){
        return(
            <PersonContent app={<All/>}/>
        )
    }
}

// 申请项目
class ApplyProject extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}

// 发布项目
class PubProject extends Component {

    render(){
        return(
            <PersonContent app={<Pub/>}/>
        )
    }
}

// 项目管理
class ManagerProject extends Component {

    render(){
        return(
            <PersonContent app={<Manage/>}/>
        )
    }
}


export {AllProject, ApplyProject, PubProject, ManagerProject};