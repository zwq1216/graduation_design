import React, {Component} from 'react';
import { Menu, Icon, Divider } from 'antd';
import history from '../own/history';

class NewsNav extends Component {
  handleClick = (e) => {
    if(e.key == 2){
      history.push('/app/news/pub');
    }
    else if(e.key == 3){
      history.push('/app/news/manager');
    }
    else{
      history.push('/app/news/all');
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
          <Menu.Item key="1"><Icon type="home" />全部新闻活动</Menu.Item>
          <Divider style={{marginBottom:0, marginTop: 0}}/>
          <Menu.Item key="2"><Icon type="book" />发布新闻活动</Menu.Item>
          <Menu.Item key="3"><Icon type="qrcode" />新闻活动管理</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default NewsNav;
