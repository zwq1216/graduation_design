import React, {Component} from 'react';
import { Menu, Icon, Avatar, Divider } from 'antd';
import AvastarUpload from './Upload';
import history from '../own/history';
import Local from '../own/Local';

const image = Local.get('image');

class PersonNav extends Component {
  handleClick = (e) => {
    if(e.key == 1){
      history.push('/app/person/message');
    }
    else if(e.key == 2){
      history.push('/app/person/audit');
    }
    else if(e.key == 3){
      history.push('/app/person/edit');
    }
    else if(e.key == 4){
      history.push('/app/person/join_club');
    }
    else if(e.key == 5){
      history.push('/app/person/quit_club');
    }
    else if(e.key == 6){
      history.push('/app/person/manage');
    }
    else{
      history.push('/app/person');
    }
    
  }

  render() {
    return (
      <div>
        <div>
          <div style={{ marginLeft:60, marginTop:5}} onClick={this.handleClick}>
            <Avatar shape="square" size={100} icon="user" src={image} />
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
