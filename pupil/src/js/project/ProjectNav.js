import React, {Component} from 'react';
import { Menu, Icon, Divider } from 'antd';
import history from '../global/history';

class ProjectNav extends Component {
  handleClick = (e) => {
    if(e.key == 2){
      history.push('/project/apply');
    }
    else if(e.key == 3){
      history.push('/project/pub');
    }
    else if(e.key == 4){
      history.push('/project/manager');
    }
    else{
      history.push('/project');
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
          <Menu.Item key="1"><Icon type="home" />全部项目</Menu.Item>
          <Divider style={{marginBottom:0, marginTop: 0}}/>
          <Menu.Item key="2"><Icon type="book" />申请项目</Menu.Item>
          <Menu.Item key="3"><Icon type="book" />发布项目</Menu.Item>
          <Menu.Item key="4"><Icon type="qrcode" />项目管理</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default  ProjectNav;
