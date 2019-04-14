import React, {Component} from 'react'
import {
    Form, Input, Tooltip, Icon, Button
  } from 'antd';
import {Layout} from 'antd';
import {Link} from 'react-router-dom'; 

import '../../css/global/register_login.css';
import Logo from '../../images/logo.png';

  
class RegistrationForm extends React.Component {
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
                  原始密码&nbsp;
                  <Tooltip title="设置你的密码，必填">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入您的密码!',
              }],
            })(
              <Input type="init_password" />
            )}
          </Form.Item>
          <Form.Item
            label={(
                <span>
                  新密码&nbsp;
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
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">修改密码</Button>
            <Link to='/'>登录</Link>
          </Form.Item>
        </Form>
      );
    }
  }

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
const {Content} = Layout;

class ChangePassword extends Component {
    render(){
        return(
            <Layout className='con-l'>
                <Content>
                    <div className='con-avater'>
                        <img src={Logo} alt='高校社团管理系统'/>
                    </div> 
                    <div className='con-title'>
                        修改密码
                    </div>
                    <div className='con-login'>
                        <WrappedRegistrationForm/>
                    </div>
                </Content>
            </Layout>
        )
    }
}
  
  
export default ChangePassword;
