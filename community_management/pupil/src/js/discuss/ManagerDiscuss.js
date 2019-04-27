import React, {Component} from 'react';
import {Divider, Input, Button, message, Select, Form} from 'antd';
import IndexTable from '../global/PTable';
import Table from '../global/Table';
import Fetch from '../own/Fetch';

const Search = Input.Search;

class All extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/discuss/')
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
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>全部帖子列表</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div>
                        <IndexTable rowKey='id' columns={columns} data={data} herf='/app/discuss/detail/'/>
                    </div>
                </div>
            </div>
        )
    }
}

class My extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/discuss/my/')
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
            width: 80,
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
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>我参与的帖子列表</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div>
                        <IndexTable rowKey='id' columns={columns} data={data} herf='/app/discuss/detail/'/>
                    </div>
                </div>
            </div>
        )
    }
}

class Manage extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount(){
        Fetch.get('/api/discuss/my/')
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }

    onClick = (id) => {
        Fetch.delete(`/api/discuss/ret_del/${id}/`).then((data) => {
            Fetch.get('/api/discuss/my/')
            .then((data) => {
                this.setState({
                data: data
                })
            }).catch(err=>{
                console.log(err)
            })
            message.info('删除成功');
        }).catch(err=>{
            Fetch.get('/api/discuss/my/')
            .then((data) => {
                this.setState({
                data: data
                })
            }).catch(err=>{
                console.log(err)
            })
          console.log(err);
          message.info('删除成功');
        })
    };
    render(){
        const columns = [{
            title: '主贴标题',
            dataIndex: 'title',
            width: 100,
            }, {
            title: '所属分类',
            dataIndex: 'catagory',
            width: 50,
            }, {
            title: '发布者',
            dataIndex: 'user.username',
            width: 60,
            },
            {
            title: '发布时间',
            dataIndex: 'add_time',
            width: 70,
            },{
                title: '删除',
                width:70,
                dataIndex: 'id',
                render: (id) => (
                    <Button type="primary" onClick={this.onClick.bind(this, id)}>删除</Button>
                )
              }];
            
        const data = this.state.data;
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>我的帖子管理</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div>
                        <Table rowKey='id' columns={columns} data={data} herf='/app/discuss/detail/'/>
                    </div>
                </div>
            </div>
        )
    }
}

const { TextArea } = Input;
const { Option } = Select;
class NormalThemeForm extends Component {
    state = {
      data: [],
      confirmDirty: false,
      autoCompleteResult: [],
    };

    componentDidMount(){
        Fetch.get('/api/discuss/catagroy/')
        .then((data) => {
            this.setState({
              data: data
            })
        }).catch(err=>{
          console.log(err)
        })
      }    
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log(values);
        if (!err) {
            let objs = {
                title: values.title,
                catagory: values.catagory,
                content: values.content
            }
            Fetch.post("/api/discuss/create/",{
                body: JSON.stringify(objs)
            }).then(data=>{
                message.info("成功发布");
            }).catch(err=>{
              message.info("发布失败")
            })
        }
      });
    }
  
  
    render() {
      const data = this.state.data;
      const { getFieldDecorator } = this.props.form;
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Item label="帖子标题">
                {getFieldDecorator('title', {
                validateFirst: true,
                rules: [
                    {required: true, message: '标题不能为空'},
                    {pattern: '^[^ ]+$', message: '不能输入空格'},
                ]
                })(
                    <Input/>
                )}
                     
            </Form.Item>
            <Form.Item
                label={(
                <span>
                    帖子内容
                </span>
                )}
            >
                {getFieldDecorator('content', {
                rules: [{ required: true, message: '帖子内容', whitespace: true }],
                })(
                <TextArea rows={4} />
                )}
            </Form.Item>
            <Form.Item label="选择分类">
                {getFieldDecorator('catagory', {
                    rules: [
                    { required: true, message: '选择分类' },
                    ],
                })(
                    <Select placeholder="选择社团" size='small'>
                    {
                        data.map((item) => {
                            return(
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            )
                        })
                    }
                    </Select>
                )}
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">发布</Button>
            </Form.Item>
        </Form>
      );
    }
  }
  
const ThemeForm = Form.create({ name: 'normaltheme' })(NormalThemeForm);

class Pub extends Component {
    
    render(){
        return(
            <div className='con'>
                <div className='con-top'>
                    <div className='con-top-title'>发布帖子</div>
                </div>
                <Divider style={{ marginTop:0, marginBottom:0}}/>
                <div className='con-content'>
                    <div style={{width: 400}}>
                        <ThemeForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export {All, My, Manage, Pub};
