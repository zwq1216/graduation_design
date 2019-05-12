import React, {Component} from 'react';
import {Layout} from 'antd';

import CommunityNav from './CommunityNav';
import Nav from '../home/Nav';
import {
    All, Pub, Manage, Edit, Monit, Create
} from './ManagerCommunity';
import Fetch from '../own/Fetch';
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
            <PersonContent app={<All/>}/>
        )
    }
}

// 申请社团
class ApplyCommunty extends Component {

    render(){
        return(
            <PersonContent app={<Pub/>}/>
        )
    }
}

// 社团管理
class ManageCommunty extends Component {

    render(){
        return(
            <PersonContent app={<Manage/>}/>
        )
    }
}

// 编辑社团
class EditCommunty extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: {}
        }
      }
    componentDidMount(){
        const id = this.props.match.match.params.id;
        Fetch.get(`/api/community/detail/${id}/`)
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
    };
    render(){
        const data = this.state.data;
        return(
            <PersonContent app={<Edit data={data}/>}/>
        )
    }
}

// 社团运营监控
class MonitCommunty extends Component {

    render(){
        return(
            <PersonContent app={<Monit/>}/>
        )
    }
}

// 消息推送
class PushMessage extends Component {

    render(){
        return(
            <PersonContent app={<Create/>}/>
        )
    }
}


export {AllCommunty, ApplyCommunty, ManageCommunty, MonitCommunty, PushMessage, EditCommunty};