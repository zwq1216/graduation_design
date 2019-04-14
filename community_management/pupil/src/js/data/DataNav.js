import React, {Component} from 'react';
import { Menu, Icon, Divider } from 'antd';
import history from '../own/history';

class DataNav extends Component {
  handleClick = (e) => {
    if(e.key == 2){
      history.push('/data/share');
    }
    else if(e.key == 3){
      history.push('/data/manager');
    }
    else{
      history.push('/data');
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
          <Menu.Item key="1"><Icon type="home" />全部资料</Menu.Item>
          <Divider style={{marginBottom:0, marginTop: 0}}/>
          <Menu.Item key="2"><Icon type="book" />分享资料</Menu.Item>
          <Menu.Item key="3"><Icon type="qrcode" />资料管理</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default DataNav;
