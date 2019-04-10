import React, {Component} from 'react';
import { Menu, Icon, Avatar, Divider } from 'antd';
import AvastarUpload from './Upload';
import history from '../global/history';

import logo from '../../test/images/2.png';

class PersonNav extends Component {
  handleClick = (e) => {
    if(e.key == 1){
      history.push('/person/message');
    }
    else if(e.key == 2){
      history.push('/person/audit');
    }
    else if(e.key == 3){
      history.push('/person/edit');
    }
    else if(e.key == 4){
      history.push('/person/join_club');
    }
    else if(e.key == 5){
      history.push('/person/quit_club');
    }
    else if(e.key == 6){
      history.push('/person/manage');
    }
    else{
      history.push('/person');
    }
    
  }

  render() {
    return (
      <div>
        <div>
          <div style={{ marginLeft:60, marginTop:5}} onClick={this.handleClick}>
            <Avatar shape="square" size={100} icon="user" src={logo} />
          </div>
          <div style={{ textAlign: 'center', marginTop:5}}>
              用户名
          </div>
          <div style={{ marginLeft:55, marginTop:5}}>
            <AvastarUpload/>
          </div>
        </div>
        <Divider style={{marginBottom:0}}/>
        <Menu
          onClick={this.handleClick}
          style={{ width: 220 }}
          // defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="1"><Icon type="mail" />消息</Menu.Item>
          <Menu.Item key="2"><Icon type="book" />待审核</Menu.Item>
          <Menu.Item key="3"><Icon type="calendar" />修改个人信息</Menu.Item>
          <Menu.Item key="4"><Icon type="calendar" />申请加入社团</Menu.Item>
          <Menu.Item key="5"><Icon type="calendar" />申请退出社团</Menu.Item>
          <Menu.Item key="6"><Icon type="qrcode" />社团成员管理</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default PersonNav;
