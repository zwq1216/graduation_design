import React, {Component} from 'react';
import { Menu, Icon, Avatar, Divider } from 'antd';
import history from '../own/history';
import Local from '../own/Local';

const role = Local.get('role');

class CommunityNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: true
    }
  }
  handleClick = (e) => {
    if(e.key == 2){
      history.push('/app/community/apply');
    }
    else if(e.key == 3){
      history.push('/app/community/pushmessage');
    }
    else if(e.key == 4){
      history.push('/app/community/manage');
    }
    else if(e.key == 5){
      history.push('/app/community/monit');
    }
    else{
      history.push('/app/community/all');
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
          <Menu.Item key="1"><Icon type="home" />全部社团</Menu.Item>
          <Divider style={{marginBottom:0, marginTop: 0}}/>
          <Menu.Item key="2"><Icon type="book" />申请社团</Menu.Item>
          <Menu.Item key="3" disabled={status}><Icon type="calendar" />创建社团</Menu.Item>
          <Menu.Item key="4" disabled={status}><Icon type="qrcode" />社团管理</Menu.Item>
          <Menu.Item key="5" disabled={status}><Icon type="calendar" />社团运营监控</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default CommunityNav;
