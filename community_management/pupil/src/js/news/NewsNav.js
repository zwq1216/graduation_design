import React, {Component} from 'react';
import { Menu, Icon, Divider } from 'antd';
import history from '../own/history';
import Local from '../own/Local';

const role = Local.get('role');

class NewsNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: true
    }
  }
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
  componentWillMount(){
    if(role == 3 || role == 4){
      this.setState({
        status: false
      })
    }
  }

  render() {
    const status = this.state.status;
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
          <Menu.Item key="2" disabled={status}><Icon type="book" />发布新闻活动</Menu.Item>
          <Menu.Item key="3" disabled={status}><Icon type="qrcode" />新闻活动管理</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default NewsNav;
