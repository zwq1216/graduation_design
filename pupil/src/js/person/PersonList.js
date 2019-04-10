import React, {Component} from 'react'; 
import { List, Typography, Button,  Form, Input, Icon, Select, Card, Avatar,
    } from 'antd';


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
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
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
          <Form>
            <Form.Item
                label={(
                <span>
                    申请理由
                </span>
                )}
            >
                {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请填写申请理由', whitespace: true }],
                })(
                <TextArea rows={4} />
                )}
            </Form.Item>
            <Form.Item
                label="选择社团"
                >
                {getFieldDecorator('select-tags', {
                    rules: [
                    { required: true, message: '请选择申请社团', type: 'array' },
                    ],
                })(
                    <Select placeholder="选择社团" size='small'>
                        <Option value={1}>开拓者社团1</Option>
                        <Option value={2}>开拓者社团2</Option>
                        <Option value={3}>开拓者社团3</Option>
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
          console.log('Received values of form: ', values);
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
          <Form>
            <Form.Item
                label={(
                <span>
                    申请理由
                </span>
                )}
            >
                {getFieldDecorator('nickname', {
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
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={this.props.item.name}
            description={this.props.item.introduce}
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
        console.log('Received values of form: ', values);
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
              学号/工号 
            </span>
          )}
        >
          {getFieldDecorator('sno', {
            rules: [{ required: true, message: '', whitespace: true }],
          })(
            <Input disabled={true} defaultValue={this.props.obj.sno}/>
          )}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              真实姓名
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '', whitespace: true }],
          })(
            <Input disabled={true} defaultValue={this.props.obj.name} />
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
              required: true, message: '',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
            label="用户状态"
            >
            {getFieldDecorator('status', {
                rules: [
                { required: true, message: '', type: 'array' },
                ],
            })(
                <Select placeholder="选择状态" size='small'>
                    <Option value={0}>已激活</Option>
                    <Option value={1}>未激活</Option>
                </Select>
            )}
        </Form.Item>
        <Form.Item
            label="用户角色"
            >
            {getFieldDecorator('role', {
                rules: [
                { required: true, message: '', type: 'array' },
                ],
            })(
                <Select placeholder="选择角色" size='small'>
                    <Option value={0}>超级管理员</Option>
                    <Option value={1}>社长</Option>
                    <Option value={2}>社员</Option>
                    <Option value={4}>普通用户</Option>
                </Select>
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
            rules: [{ required: true, message: '请输入您的手机号码!' }],
          })(
            <Input style={{ width: '100%' }} defaultValue={this.props.obj.phone} />
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

export {MessageList, JoinClubForm, QuitClubForm, ManageUserCard, UserCard, EditUser};