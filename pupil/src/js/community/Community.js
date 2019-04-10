import React, {Component} from 'react';
import {Layout} from 'antd';

import CommunityNav from './CommunityNav';
import Nav from '../home/Nav';
import {
    Info,
} from './ManagerCommunity';
import '../../css/person/person.css';

const {Sider, Content} = Layout;


class PersonContent extends Component {
    render(){
        return(
            <Layout>
                <Nav/>
                <Layout>
                    <Sider width={220} theme='light' style={{ border: '#d4d4d4 solid 1px'}}>
                        <CommunityNav/>
                    </Sider>
                    <Content style={{ border: '#d4d4d4 solid 1px', borderLeft: '#d4d4d4 solid 0px'}}>
                        {this.props.app}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

// 全部社团
class AllCommunty extends Component {

    render(){
        return(
            <PersonContent app={<Info/>}/>
        )
    }
}

// 申请社团
class ApplyCommunty extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}

// 社团管理
class ManageCommunty extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}

// 社团运营监控
class MonitCommunty extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}

// 消息推送
class PushMessage extends Component {

    render(){
        return(
            <PersonContent />
        )
    }
}


export {AllCommunty, ApplyCommunty, ManageCommunty, MonitCommunty, PushMessage};