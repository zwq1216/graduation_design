import React, {Component} from 'react'
import {
    Form, Input, Tooltip, Icon, Row, Col, Button
  } from 'antd';
import {Layout} from 'antd';
import {Link} from 'react-router-dom'; 

import '../../css/global/register_login.css';
import Logo from '../../images/logo.png';
  
class RegistrationForm extends Component {
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
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
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
      const { autoCompleteResult } = this.state;
  
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
                学号/工号&nbsp;
                <Tooltip title="填写学生学号或教职工编号，必填！">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('sno', {
              rules: [{ required: true, message: '请输入您的学号或工号!', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label={(
              <span>
                昵称&nbsp;
                <Tooltip title="给自己起个别名，必填">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入您的昵称!', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label={(
                <span>
                  密码&nbsp;
                  <Tooltip title="设置你的密码，必填">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入您的密码!',
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
                  确认密码&nbsp;
                  <Tooltip title="重复输入的密码，必填">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请输入确认密码!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>
          <Form.Item
            label={(
                <span>
                  手机号&nbsp;
                  <Tooltip title="手机号，必填">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入您的手机号码!' }],
            })(
              <Input style={{ width: '100%' }} />
            )}
          </Form.Item>
          <Form.Item
            label={(
                <span>
                  验证码&nbsp;
                  <Tooltip title="确认你是一个人，必填">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入验证码!' }],
                })(
                  <Input />
                )}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">注册用户</Button>
            <Link to='/'>登录</Link>
          </Form.Item>
        </Form>
      );
    }
  }

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
const {Content} = Layout;

class Register extends Component {
    render(){
        return(
            <Layout className='con-r'>
                <Content>
                    <div className='con-avater'>
                        <img src={Logo} alt='高校社团管理系统'/>
                    </div> 
                    <div className='con-title'>
                        用户注册
                    </div>
                    <div className='con-login'>
                        <WrappedRegistrationForm/>
                    </div>
                </Content>
            </Layout>
        )
    }
}
  
  
export default Register;
