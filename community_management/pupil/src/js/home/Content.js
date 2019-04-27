import React, {Component} from 'react';
import {Layout} from 'antd';
import {Link} from 'react-router-dom';
import Fetch from '../own/Fetch';
import {CommunityCardA} from '../global/Card';
import IndexTable from '../global/Table';
import {HTable, NTable} from '../global/NHTable';
import '../../css/home/content.css';

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
              <Link to={this.props.href}>
                <div className='bottom-con'>
                    {this.props.content}
                </div>
              </Link>
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
    constructor(props){
      super(props);
      this.state = {
        models: []
      }
    }
    componentDidMount(){
      Fetch.get('/api/community/?top5=1')
      .then((data) => {
          this.setState({
            models: data
          })
      }).catch(err=>{
        console.log(err)
      })
    }
    
    render(){
        const model = this.state.models;
        return (
            <div className='body'>
                {
                    model.map(function(val, index, array){
                        return <CommunityCardA
                        key={val.id}
                        id={val.id}
                        data={val.name}
                        img={val.image}
                        score={val.score}
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
                <Bottom content='更多社团' href='/app/community'/>
                <End/>
            </Layout>
        )
    }
}

class Project extends Component {
    constructor(props){
      super(props);
      this.state = {
        data: []
      }
    }
    componentDidMount(){
      Fetch.get('/api/projects/?top5=1')
      .then((data) => {
          this.setState({
            data: data
          })
      }).catch(err=>{
        console.log(err)
      })
    }
   

    render(){
        const columns = [{
            title: '项目名称',
            dataIndex: 'name',
            width: 100,
          }, {
            title: '项目描述',
            dataIndex: 'desc',
            width: 250,
          },{
            title: '发布者',
            dataIndex: 'pub_user',
            width: 70,
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: 70,
          },{
            title: '发布时间',
            dataIndex: 'add_time',
            width: 100,
          }];
          
          const data = this.state.data;
        return(
            <Layout className='pro'>
                <Title title='最新项目'/>
                <NTable rowKey='id' columns={columns} data={data}/>
                <Bottom content='更多项目' href='/app/project'/>
                <End/>
            </Layout>
        )
    }
}

class Data extends Component {
    constructor(props){
      super(props);
      this.state = {
        data: []
      }
    }
    componentDidMount(){
      Fetch.get('/api/data/?top5=1')
      .then((data) => {
        console.log(data);
          this.setState({
            data: data
          })
      }).catch(err=>{
        console.log(err)
      })
    }
    render(){
        const columns = [{
            title: '资料名称',
            dataIndex: 'name',
            width: 100,
          }, {
            title: '资料描述',
            dataIndex: 'desc',
            width: 250,
          }, {
            title: '所属分类',
            dataIndex: 'type',
            width: 100,
          },{
            title: '下载',
            width:70,
            dataIndex: 'data',
            render: (text) => (
              <a href={text}>下载</a>
            )
          },
          {
            title: '发布时间',
            dataIndex: 'add_time',
            width: 70,
          }];
          
          const data = this.state.data;
         
        return(
            <Layout className='data'>
                <Title title='最新资料'/>
                <NTable rowKey='id' columns={columns} data={data}/>
                <Bottom content='更多资料' href='/app/data'/>
                <End/>
            </Layout>
        )
    }
}

class Discuss extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    Fetch.get('/api/discuss/?top5=1')
    .then((data) => {
        this.setState({
          data: data
        })
    }).catch(err=>{
      console.log(err)
    })
  }
  
    render(){
        const columns = [{
            title: '主贴标题',
            dataIndex: 'title',
            width: 100,
          }, {
            title: '所属分类',
            dataIndex: 'catagory',
            width: 100,
          }, {
            title: '发布者',
            dataIndex: 'user.username',
            width: 70,
          },
          {
            title: '发布时间',
            dataIndex: 'add_time',
            width: 70,
          }];
          
          const data = this.state.data;
        return(
            <Layout className='discuss'>
                <Title title='最新讨论'/>
                <HTable rowKey='id' columns={columns} data={data} herf='/app/discuss/detail/'/>
                <Bottom content='更多讨论' href='/app/discuss'/>
                <End/>
            </Layout>
        )
    }
}

class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    Fetch.get('/api/news/?top5=1')
    .then((data) => {
      console.log(data);
        this.setState({
          data: data
        })
    }).catch(err=>{
      console.log(err)
    })
  }
    render(){
        const columns = [{
            title: '新闻活动名称',
            dataIndex: 'name',
            width: 100,
          }, {
            title: '新闻活动描述',
            width:250,
            dataIndex: 'desc',
            render: (text) => (
              <div>{text.slice(0, 20)}</div>
            )
          }, {
            title: '浏览量',
            dataIndex: 'count',
            width: 100,
          },{
            title: '发布者',
            dataIndex: 'user',
            width: 70,
          },
          {
            title: '发布时间',
            dataIndex: 'add_time',
            width: 70,
          }];
          
        const data = this.state.data;
        return(
            <Layout className='news'>
                <Title title='最新新闻活动'/>
                <HTable rowKey='id' columns={columns} data={data}/>
                <Bottom content='更多新闻活动' href='/app/news'/>
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