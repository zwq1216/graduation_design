import React, {Component}from 'react';
import {
  Menu, Dropdown, Icon, message,
} from 'antd';

import '../../css/home/Nav.css';
import user from '../../images/user.png';

const onClick = ({ key }) => {
  if(key === 1){
    message.info("个人中心");
  }
  else if(key === 2){
    message.info("修改密码");
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
        <a className="ant-dropdown-link" href="#">
        <img src={user} className='user'/>
        </a>
    </Dropdown>
    )
  }
}

export default UserMenu;