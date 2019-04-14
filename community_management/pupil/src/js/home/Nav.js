import React, {Component}from 'react';
import {Layout, Affix} from 'antd';
import UserMenu from '../home/UserMenu';
import '../../css/home/Nav.css';
import logo from '../../images/nav.png';
import message from '../../images/message.png';
import history from '../own/history';


const { Header } = Layout

class Scroll extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        history.push(this.props.obj.router);
    }
    render(){
        return (
        <div className={`top ${this.props.addClass === this.props.data ?"active": null}`} 
        onClick={this.handleClick}>
            {this.props.data}
        </div>)
    }
}


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "models": [
                {id: 6, name: "下载中心", router: '/data'},
                {id: 5, name: "新闻活动", router: '/news'},
                {id: 4, name: "讨论区", router: '/discuss'},
                {id: 3, name: "项目", router: '/project'},
                {id: 2, name: "社团", router: '/community'},
                {id: 1, name: "主页", router: '/app'},
            ]
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }
    handleItemClick(addClass){
        this.setState({
            "classes": addClass
        });
    }

    messageClick(event){
        history.push('/person/message');
    }

    render(){
        const model = this.state.models;
        const classes = this.state.classes;
        return(
            <Affix offsetTop={0}>
                <Layout>
                    <Header className="nav">
                        <div className="logo">
                            <img src={logo} className='logo-img' alt='高校社团管理系统' />
                        </div>
                        <div className='nav-lan'>
                            {
                             model.map(function(val, index, array){
                                    return <Scroll
                                    key={"key" + index}
                                    data={val.name}
                                    addClass={classes}
                                    obj={val}
                                    onClick={this.handleItemClick}
                                    />
                                }.bind(this))
                            }
                        </div>
                        <div className='nav-icon'>
                            <div className='top1'>
                                {/* <img src={user} className='user'/> */}
                                <UserMenu/>
                            </div>
                            <div className='top1' onClick={this.messageClick}>
                                <img src={message} className='message'/>
                            </div>
                        </div>
                    </Header>
                </Layout>
            </Affix>
        )
    }
}

export default Nav;

