import React, {Component} from 'react';
import {Layout} from 'antd';

import CommunityCard from '../global/Card';
import IndexTable from '../global/Table';
import '../../css/home/content.css';
import image1 from '../../test/images/1.png';

const {Content} = Layout;

class Title extends Component {
    render(){
        return(
            <div className='title'>
                {this.props.title}
            </div>
        )
    }
}

class Bottom extends Component {
    render(){
        return(
            <div className='bottom'>
                <div className='bottom-con'>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

class End extends Component {
    render(){
        return (
            <div className='end'></div>
        )
    }
}

class CommunityBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "models": [
                {id: 6, name: "开拓者社团1"},
                {id: 5, name: "开拓者社团2"},
                {id: 4, name: "开拓者社团3"},
                {id: 3, name: "开拓者社团4"},
                {id: 2, name: "开拓者社团5"},
            ]
        }
    }
    render(){
        const model = this.state.models;
        return (
            <div className='body'>
                {
                    model.map(function(val, index, array){
                        return <CommunityCard
                        key={"key" + index}
                        data={val.name}
                        img={image1}
                        />
                    })
                }
            </div>
        )
    }
}

class Community extends Component {
    render(){
        return(
            <Layout className='con'>
                <Title title='社团TOP5'/>
                <CommunityBody/>
                <Bottom content='更多社团'/>
                <End/>
            </Layout>
        )
    }
}

class Project extends Component {
    render(){
        const columns = [{
            title: '项目名称',
            dataIndex: 'name',
            width: 100,
          }, {
            title: '项目描述',
            dataIndex: 'age',
            width: 250,
          }, {
            title: '发布时间',
            dataIndex: 'age',
            width: 100,
          },{
            title: '发布者',
            dataIndex: 'age',
            width: 70,
          },
          {
            title: '状态',
            dataIndex: 'address',
            width: 70,
          }];
          
          const data = [];
          for (let i = 0; i < 5; i++) {
            data.push({
              key: i,
              name: `Edward King ${i}`,
              age: 32,
              address: `London, Park Lane no. ${i}`,
            });
          }
        return(
            <Layout className='pro'>
                <Title title='最新项目'/>
                <IndexTable columns={columns} data={data}/>
                <Bottom content='更多项目'/>
                <End/>
            </Layout>
        )
    }
}

class Data extends Component {
    render(){
        const columns = [{
            title: '项目名称',
            dataIndex: 'name',
            width: 100,
          }, {
            title: '项目描述',
            dataIndex: 'age',
            width: 250,
          }, {
            title: '发布时间',
            dataIndex: 'age',
            width: 100,
          },{
            title: '发布者',
            dataIndex: 'age',
            width: 70,
          },
          {
            title: '状态',
            dataIndex: 'address',
            width: 70,
          }];
          
          const data = [];
          for (let i = 0; i < 5; i++) {
            data.push({
              key: i,
              name: `Edward King ${i}`,
              age: 32,
              address: `London, Park Lane no. ${i}`,
            });
          }
        return(
            <Layout className='data'>
                <Title title='最新资料'/>
                <IndexTable columns={columns} data={data}/>
                <Bottom content='更多资料'/>
                <End/>
            </Layout>
        )
    }
}

class Discuss extends Component {
    render(){
        const columns = [{
            title: '项目名称',
            dataIndex: 'name',
            width: 100,
          }, {
            title: '项目描述',
            dataIndex: 'age',
            width: 250,
          }, {
            title: '发布时间',
            dataIndex: 'age',
            width: 100,
          },{
            title: '发布者',
            dataIndex: 'age',
            width: 70,
          },
          {
            title: '状态',
            dataIndex: 'address',
            width: 70,
          }];
          
          const data = [];
          for (let i = 0; i < 5; i++) {
            data.push({
              key: i,
              name: `Edward King ${i}`,
              age: 32,
              address: `London, Park Lane no. ${i}`,
            });
          }
        return(
            <Layout className='discuss'>
                <Title title='最新讨论'/>
                <IndexTable columns={columns} data={data}/>
                <Bottom content='更多讨论'/>
                <End/>
            </Layout>
        )
    }
}

class News extends Component {
    render(){
        const columns = [{
            title: '项目名称',
            dataIndex: 'name',
            width: 100,
          }, {
            title: '项目描述',
            dataIndex: 'age',
            width: 250,
          }, {
            title: '发布时间',
            dataIndex: 'age',
            width: 100,
          },{
            title: '发布者',
            dataIndex: 'age',
            width: 70,
          },
          {
            title: '状态',
            dataIndex: 'address',
            width: 70,
          }];
          
          const data = [];
          for (let i = 0; i < 5; i++) {
            data.push({
              key: i,
              name: `Edward King ${i}`,
              age: 32,
              address: `London, Park Lane no. ${i}`,
            });
          }
        return(
            <Layout className='news'>
                <Title title='最新新闻活动'/>
                <IndexTable columns={columns} data={data}/>
                <Bottom content='更多新闻活动'/>
                <End/>
            </Layout>
        )
    }
}

class ContentTheme extends Component {
    render(){
        return(
            <Layout>
                <Content className='content'>
                    <Community/>
                    <Project/>
                    <Data/>
                    <Discuss/>
                    <News/>
                </Content>
            </Layout>
        )
    }
}

export default ContentTheme;