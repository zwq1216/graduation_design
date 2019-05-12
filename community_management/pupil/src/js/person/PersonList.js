import React, {Component} from 'react'; 
import { 
  List, Typography, Button,  Form, Input, Icon, Select, Card, Avatar, message
} from 'antd';
import Local from '../own/Local';
import Fetch from '../own/Fetch';
import IndexTable from '../global/PTable';

const userid = Local.get('userid');

// 消息列表
class MessageList extends Component {
    render(){
        return(
            <div>
                <List
                bordered
                dataSource={this.props.data}
                pagination={true}
                renderItem={
                        item => (
                            <List.Item>
                                <Typography.Text mark>[{item.type}]</Typography.Text> {item.content}
                            </List.Item>
                        )
                    }
                />
            </div>
        )
    }
}

// 申请加入社团
const { TextArea } = Input;
const { Option } = Select;
class JoinClubForm1 extends Component {
    state = {
      data: []
    };
    
    componentDidMount(){
      Fetch.get('/api/community/')
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
        if (!err) {
          const formData = new FormData();
          formData.append('content', values.content);
          formData.append('type', 0);
          formData.append('community', values.community)

          Fetch.post("/api/users/record/create/",{
              body: formData
          }).then(data=>{
              message.info('申请成功!')
          }).catch(err=>{
            message.info('申请失败!')
            if ('content' in err){
              this.props.form.setFields({
                content: {
                      errors: [new Error(err.content[0])]
                    }
                  })
            }
            if ('community' in err){
              this.props.form.setFields({
                community: {
                      errors: [new Error(err.community[0])]
                    }
                  })
            }
      
          })
        }
      });
    }
  
    render() {
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
      const data = this.state.data;
      return (
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
                label={(
                <span>
                    申请理由
                </span>
                )}
            >
                {getFieldDecorator('content', {
                rules: [{ required: true, message: '请填写申请理由', whitespace: true }],
                })(
                <TextArea rows={4} />
                )}
            </Form.Item>
            <Form.Item
                label="选择社团"
                >
                {getFieldDecorator('community', {
                    rules: [
                    { required: true, message: '请选择申请社团'},
                    ],
                })(
                    <Select placeholder="选择社团" size='small'>
                      {
                        data.map(function(val, index, array){
                          return <Option value={val.id}>{val.name}</Option>
                        })
                      }
                    </Select>
                )}
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">申请加入</Button>
            </Form.Item>
        </Form>
      );
    }
  }
  
const JoinClubForm = Form.create({ name: 'joinclub' })(JoinClubForm1);

// 申请退出社团
class QuitClubForm1 extends Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const formData = new FormData();
          formData.append('content', values.content);
          formData.append('type', 2);

          Fetch.post("/api/users/record/create/",{
              body: formData
          }).then(data=>{
              message.info('申请成功!')
          }).catch(err=>{
            message.info('申请失败!')
            if ('content' in err){
              this.props.form.setFields({
                content: {
                      errors: [new Error(err.content[0])]
                    }
                  })
            }
          })
        }
      });
    }
  
  
    render() {
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
            <Form.Item
                label={(
                <span>
                    申请理由
                </span>
                )}
            >
                {getFieldDecorator('content', {
                rules: [{ required: true, message: '请填写申请理由', whitespace: true }],
                })(
                <TextArea rows={4} />
                )}
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">申请退出</Button>
            </Form.Item>
        </Form>
      );
    }
  }
  
const QuitClubForm = Form.create({ name: 'joinclub' })(QuitClubForm1);


// 用户名片
const { Meta } = Card;
  
class ManageUserCard extends Component {
 
    render() {
      return (
        
          <Card
            style={{ width: 300, marginTop: 16, float: 'left', marginLeft:20}}
            actions={[<Icon type="edit" />, <Icon type="delete" />]}
            hoverable={true}
            bodyStyle={{width: 300, height: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace:'nowrap'}}
            size='small'
          >
            <Meta
            avatar={<Avatar src={this.props.item.image} />}
            title={this.props.item.realname}
            // description={this.props.item.introduce}
            />
          </Card>
  
      );
    }
}

class UserCard extends Component {
 
    render() {
      return (
        <div>
          <Card style={{ width: 300, marginTop: 16, float: 'left', marginLeft:20 }}
          hoverable={true}
          bodyStyle={{width: 300, height: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace:'nowrap'}}
          size='small'
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
      );
    }
}

// 修改个人信息
class EditUserForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let objs = {
          username: values.username,
          password: values.password,
          phone: values.phone
        }
        Fetch.patch(`/api/users/update/${userid}/`,{
          body: JSON.stringify(objs)
      }).then(data=>{
          Local.set('username',data.username)
          message.info('更新成功!')
      }).catch(err=>{
        message.info('更新失败!')
        if ('username' in err){
          this.props.form.setFields({
            username: {
                  errors: [new Error(err.username[0])]
                }
              })
        }
        if ('password' in err){
          this.props.form.setFields({
            password: {
                  errors: [new Error(err.password[0])]
                }
              })
        }
        if ('phone' in err){
          this.props.form.setFields({
            phone: {
                  errors: [new Error(err.phone[0])]
                }
              })
        }
  
      })
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label={(
            <span>
            昵称
            </span>
          )}
        >
          {getFieldDecorator('username', {
            rules: [{ required: false, message: '', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label={(
              <span>
                密码
              </span>
            )}
        >
          {getFieldDecorator('password', {
            rules: [{
              required: false, message: '最少8个字符',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          label={(
              <span>
                手机号
              </span>
            )}
        >
          {getFieldDecorator('phone', {
            rules: [{ required: false, message: '请输入您的手机号码!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">修改</Button>
        </Form.Item>
      </Form>
    );
  }
}

const EditUser = Form.create({ 
  name: 'edituser', 
})(EditUserForm);

class Data extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    Fetch.get('/api/data/?disclosure=0&status=0')
    .then((data) => {
        this.setState({
          data: data
        })
    }).catch(err=>{
      console.log(err)
    })
}
  onClick = (id) => {
    Fetch.patch(`/api/data/update/${id}/`, {
      body: JSON.stringify({'status': 3})
    }).then((data) => {
        Fetch.get('/api/data/?status=0')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
        message.info('审核通过');
    }).catch(err=>{
        Fetch.get('/api/data/?status=0')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
      console.log(err);
      message.info('审核通过');
    })
 };
 onClickN = (id) => {
  Fetch.patch(`/api/data/update/${id}/`, {
    body: JSON.stringify({'status': 2})
  }).then((data) => {
      Fetch.get('/api/data/?status=0')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
      message.info('审核不通过');
  }).catch(err=>{
      Fetch.get('/api/data/?status=0')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
    console.log(err);
    message.info('审核不通过');
  })
};
    render(){
        const columns = [{
            title: '资料名称',
            dataIndex: 'name',
            width: 100,
          },{
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
          },{
            title: '通过',
            width:50,
            dataIndex: 'id',
            render: (id) => (
                <Button type="primary" onClick={this.onClick.bind(this, id)}>审核通过</Button>
            )
          },{
            title: '不通过',
            width:50,
            dataIndex: 'id',
            render: (id) => (
                <Button type="primary" onClick={this.onClickN.bind(this, id)}>审核不通过</Button>
            )
          }];
          
  const data = this.state.data;
  return (
    <div style={{height:800}}>
        <IndexTable rowKey='id' columns={columns} data={data}/> 
    </div>
  );
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
    Fetch.get('/api/projects/?status=3')
    .then((data) => {
        this.setState({
          data: data
        })
    }).catch(err=>{
      console.log(err)
    })
}
  onClick = (id) => {
    Fetch.patch(`/api/projects/update/${id}/`, {
      body: JSON.stringify({'status': 0})
    }).then((data) => {
        Fetch.get('/api/projects/?status=3')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
        message.info('审核通过');
    }).catch(err=>{
        Fetch.get('/api/projects/?status=3')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
      console.log(err);
      message.info('审核通过');
    })
 };
 onClickN = (id) => {
  Fetch.patch(`/api/projects/update/${id}/`, {
    body: JSON.stringify({'status': 4})
  }).then((data) => {
      Fetch.get('/api/projects/?status=3')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
      message.info('审核不通过');
  }).catch(err=>{
      Fetch.get('/api/projects/?status=3')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
    console.log(err);
    message.info('审核不通过');
  })
};
    render(){
      const columns = [{
        title: '项目名称',
        dataIndex: 'name',
        width: 100,
      },{
        title: '赏金',
        dataIndex: 'remuneration',
        width: 30,
      },{
        title: '状态',
        dataIndex: 'status',
        width: 40,
      },{
        title: '发布者',
        dataIndex: 'pub_user',
        width: 40,
      },{
        title: '需求文件下载',
        width:50,
        dataIndex: 'file',
        render: (text) => (
          <a href={text}>下载</a>
        )
      },{
        title: '通过',
        width:50,
        dataIndex: 'id',
        render: (id) => (
            <Button type="primary" onClick={this.onClick.bind(this, id)}>审核通过</Button>
        )
      },{
        title: '不通过',
        width:50,
        dataIndex: 'id',
        render: (id) => (
            <Button type="primary" onClick={this.onClickN.bind(this, id)}>审核不通过</Button>
        )
      }];
          
  const data = this.state.data;
  return (
    <div style={{height:800}}>
        <IndexTable rowKey='id' columns={columns} data={data}/> 
    </div>
  );
}
}

class Community extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    Fetch.get('/api/users/records/?type=1&status=0')
    .then((data) => {
        this.setState({
          data: data
        })
    }).catch(err=>{
      console.log(err)
    })
}
  onClick = (id) => {
    Fetch.patch(`/api/users/record/update/${id}/`, {
      body: JSON.stringify({'status': 3})
    }).then((data) => {
        Fetch.get('/api/users/records/?type=1&status=0')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
        message.info('审核通过');
    }).catch(err=>{
        Fetch.get('/api/users/records/?type=1&status=0')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
      console.log(err);
      message.info('审核通过');
    })
 };
 onClickN = (id) => {
  Fetch.patch(`/api/users/record/update/${id}/`, {
    body: JSON.stringify({'status': 2})
  }).then((data) => {
      Fetch.get('/api/users/records/?type=1&status=0')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
      message.info('审核不通过');
  }).catch(err=>{
      Fetch.get('/api/users/records/?type=1&status=0')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
    console.log(err);
    message.info('审核不通过');
  })
};
    render(){
      const columns = [{
        title: '申请理由',
        dataIndex: 'content',
        width: 200,
      },{
        title: '申请材料下载',
        width:50,
        dataIndex: 'apply_data',
        render: (text) => (
          <a href={text}>下载</a>
        )
      },{
        title: '申请人',
        dataIndex: 'apply_user',
        width: 40,
      },{
        title: '申请时间',
        dataIndex: 'add_time',
        width: 40,
      },{
        title: '通过',
        width:50,
        dataIndex: 'id',
        render: (id) => (
            <Button type="primary" onClick={this.onClick.bind(this, id)}>审核通过</Button>
        )
      },{
        title: '不通过',
        width:50,
        dataIndex: 'id',
        render: (id) => (
            <Button type="primary" onClick={this.onClickN.bind(this, id)}>审核不通过</Button>
        )
      }];
          
  const data = this.state.data;
  return (
    <div style={{height:800}}>
        <IndexTable rowKey='id' columns={columns} data={data}/> 
    </div>
  );
}
}

class Join extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    Fetch.get('/api/users/records/?type=0&status=0')
    .then((data) => {
        this.setState({
          data: data
        })
    }).catch(err=>{
      console.log(err)
    })
}
  onClick = (id) => {
    Fetch.patch(`/api/users/record/update/${id}/`, {
      body: JSON.stringify({'status': 3})
    }).then((data) => {
        Fetch.get('/api/users/records/?type=0&status=0')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
        message.info('审核通过');
    }).catch(err=>{
        Fetch.get('/api/users/records/?type=0&status=0')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
      console.log(err);
      message.info('审核通过');
    })
 };
 onClickN = (id) => {
  Fetch.patch(`/api/users/record/update/${id}/`, {
    body: JSON.stringify({'status': 2})
  }).then((data) => {
      Fetch.get('/api/users/records/?type=0&status=0')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
      message.info('审核不通过');
  }).catch(err=>{
      Fetch.get('/api/users/records/?type=0&status=0')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
    console.log(err);
    message.info('审核不通过');
  })
};
    render(){
      const columns = [{
        title: '申请理由',
        dataIndex: 'content',
        width: 200,
      },{
        title: '申请社团',
        width:70,
        dataIndex: 'community',
      },{
        title: '申请人',
        dataIndex: 'apply_user',
        width: 40,
      },{
        title: '申请时间',
        dataIndex: 'add_time',
        width: 40,
      },{
        title: '通过',
        width:50,
        dataIndex: 'id',
        render: (id) => (
            <Button type="primary" onClick={this.onClick.bind(this, id)}>审核通过</Button>
        )
      },{
        title: '不通过',
        width:50,
        dataIndex: 'id',
        render: (id) => (
            <Button type="primary" onClick={this.onClickN.bind(this, id)}>审核不通过</Button>
        )
      }];
          
  const data = this.state.data;
  return (
    <div style={{height:800}}>
        <IndexTable rowKey='id' columns={columns} data={data}/> 
    </div>
  );
}
}

class Exit extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    Fetch.get('/api/users/records/?type=2&status=0')
    .then((data) => {
        this.setState({
          data: data
        })
    }).catch(err=>{
      console.log(err)
    })
}
  onClick = (id) => {
    Fetch.patch(`/api/users/record/update/${id}/`, {
      body: JSON.stringify({'status': 3})
    }).then((data) => {
        Fetch.get('/api/users/records/?type=2&status=0')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
        message.info('审核通过');
    }).catch(err=>{
        Fetch.get('/api/users/records/?type=2&status=0')
        .then((data) => {
            this.setState({
            data: data
            })
        }).catch(err=>{
            console.log(err)
        })
      console.log(err);
      message.info('审核通过');
    })
 };
 onClickN = (id) => {
  Fetch.patch(`/api/users/record/update/${id}/`, {
    body: JSON.stringify({'status': 2})
  }).then((data) => {
      Fetch.get('/api/users/records/?type=2&status=0')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
      message.info('审核不通过');
  }).catch(err=>{
      Fetch.get('/api/users/records/?type=2&status=0')
      .then((data) => {
          this.setState({
          data: data
          })
      }).catch(err=>{
          console.log(err)
      })
    console.log(err);
    message.info('审核不通过');
  })
};
    render(){
      const columns = [{
        title: '申请理由',
        dataIndex: 'content',
        width: 200,
      },{
        title: '申请社团',
        width:70,
        dataIndex: 'community',
      },{
        title: '申请人',
        dataIndex: 'apply_user',
        width: 40,
      },{
        title: '申请时间',
        dataIndex: 'add_time',
        width: 40,
      },{
        title: '通过',
        width:50,
        dataIndex: 'id',
        render: (id) => (
            <Button type="primary" onClick={this.onClick.bind(this, id)}>审核通过</Button>
        )
      },{
        title: '不通过',
        width:50,
        dataIndex: 'id',
        render: (id) => (
            <Button type="primary" onClick={this.onClickN.bind(this, id)}>审核不通过</Button>
        )
      }];
          
  const data = this.state.data;
  return (
    <div style={{height:800}}>
        <IndexTable rowKey='id' columns={columns} data={data}/> 
    </div>
  );
}
}

export {
  MessageList, JoinClubForm, QuitClubForm, ManageUserCard, UserCard, EditUser, Data, 
  Project, Community, Join, Exit
};