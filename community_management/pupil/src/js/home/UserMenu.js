import React, {Component}from 'react';
import {Link} from 'react-router-dom';
import {
  Menu, Dropdown, Icon, message,
} from 'antd';

import '../../css/home/Nav.css';
import user from '../../images/user.png';
import history from '../own/history';

const onClick = ({ key }) => {
  if(key == 1){
    history.push('/person');
  }
  else if(key == 2){
    history.push('/changepassword');
  }
  else{
    message.info("退出登录");
  }
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">个人中心</Menu.Item>
    <Menu.Item key="2">修改密码</Menu.Item>
    <Menu.Item key="3">退出登录</Menu.Item>
  </Menu>
);


class UserMenu extends Component {
  render(){
    return(
      <Dropdown overlay={menu}>
        <Link className="ant-dropdown-link" to="/person">
        <img src={user} className='user'/>
        </Link>
    </Dropdown>
    )
  }
}

export default UserMenu;