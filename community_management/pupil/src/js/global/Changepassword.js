import React, {Component} from 'react'
import {
    Form, Input, Tooltip, Icon, Button, message
  } from 'antd';
import {Layout} from 'antd';
import Fetch from '../own/Fetch'
import history from '../own/history'

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
         let objs = {
          original_password: values.original_password,
          new_password: values.new_password,
          repeat_password: values.repeat_password
         }

          Fetch.post(`/api/users/changepassword/`,{
              body: JSON.stringify(objs)
          }).then(data=>{
              message.info('修改成功!')
              history.push('/app')

          }).catch(err=>{
            message.info('修改失败!')
            if ('repeat_password' in err){
              this.props.form.setFields({
                repeat_password: {
                      errors: [new Error(err.repeat_password[0])]
                    }
                  })
            }
            if ('new_password' in err){
              this.props.form.setFields({
                new_password: {
                      errors: [new Error(err.new_password[0])]
                    }
                  })
            }
            if ('original_password' in err){
              this.props.form.setFields({
                original_password: {
                      errors: [new Error(err.original_password[0])]
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
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('new_password')) {
        callback('两次密码不一致');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['repeat_password'], { force: true });
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
            {getFieldDecorator('original_password', {
              rules: [{
                required: true, message: '请输入您的密码!',
              }],
            })(
              <Input type="password" />
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
            {getFieldDecorator('new_password', {
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
            {getFieldDecorator('repeat_password', {
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
