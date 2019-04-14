import React, {Component} from 'react';
import { Menu, Icon, Avatar, Divider } from 'antd';
import history from '../own/history';

class CommunityNav extends Component {
  handleClick = (e) => {
    if(e.key == 2){
      history.push('/community/apply');
    }
    else if(e.key == 3){
      history.push('/community/pushmessage');
    }
    else if(e.key == 4){
      history.push('/community/manage');
    }
    else if(e.key == 5){
      history.push('/community/monit');
    }
    else{
      history.push('/community');
    }
    
  }

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          style={{ width: 220 }}
        //   defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="1"><Icon type="home" />全部社团</Menu.Item>
          <Divider style={{marginBottom:0, marginTop: 0}}/>
          <Menu.Item key="2"><Icon type="book" />申请社团</Menu.Item>
          <Menu.Item key="3"><Icon type="calendar" />消息推送</Menu.Item>
          <Menu.Item key="4"><Icon type="qrcode" />社团管理</Menu.Item>
          <Menu.Item key="5"><Icon type="calendar" />社团运营监控</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default CommunityNav;
