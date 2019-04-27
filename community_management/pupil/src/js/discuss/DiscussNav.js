import React, {Component} from 'react';
import { Menu, Icon, Avatar, Divider } from 'antd';
import history from '../own/history';

class DiscussNav extends Component {
  handleClick = (e) => {
    if(e.key == 2){
      history.push('/app/discuss/my');
    }
    else if(e.key == 3){
      history.push('/app/discuss/pub');
    }
    // else if(e.key == 4){
    //   history.push('/app/discuss/community');
    // }
    else if(e.key == 5){
      history.push('/app/discuss/manager');
    }
    else{
      history.push('/app/discuss/all');
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
          <Menu.Item key="1"><Icon type="home" />公开讨论主题</Menu.Item>
          <Divider style={{marginBottom:0, marginTop: 0}}/>
          <Menu.Item key="2"><Icon type="book" />我的参与</Menu.Item>
          <Menu.Item key="3"><Icon type="calendar" />发布讨论主题</Menu.Item>
          {/* <Menu.Item key="4"><Icon type="calendar" />社团讨论主题</Menu.Item> */}
          <Menu.Item key="5"><Icon type="qrcode" />讨论主题管理</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default DiscussNav;
