import React, {Component} from 'react';
import {Layout} from 'antd';

import DataNav from './DataNav';
import Nav from '../home/Nav';
import {
    Info,
} from './ManagerData';
import '../../css/person/person.css';

const {Sider, Content} = Layout;


class PersonContent extends Component {
    render(){
        return(
            <Layout>
                <Nav/>
                <Layout>
                    <Sider width={220} theme='light' style={{ border: '#d4d4d4 solid 1px'}}>
                        <DataNav/>
                    </Sider>
                    <Content style={{ border: '#d4d4d4 solid 1px', borderLeft: '#d4d4d4 solid 0px'}}>
                        {this.props.app}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

// 全部资料
class AllData extends Component {

    render(){
        return(
            <PersonContent app={<Info/>}/>
        )
    }
}

// 分享资料
class ShareData extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}

// 资料管理
class ManagerData extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}


export {AllData, ShareData, ManagerData};