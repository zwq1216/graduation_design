import React, {Component} from 'react'
import {
    Form, Icon, Input, Button, Row, Col
  } from 'antd';
import {Link} from 'react-router-dom';
import {Layout} from 'antd';
  
import Logo from '../../images/logo.png';
import '../../css/global/register_login.css';

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('sno', {
              rules: [{ required: true, message: '用户名或密码错误' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号/工号" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '用户名或密码错误' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>

          <Form.Item>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入验证码!' }],
                })(
                  <Input placeholder='验证码'/>
                )}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                登&nbsp;&nbsp;&nbsp;&nbsp;录
            </Button>
            <br/><Link to='/register'>注册</Link> <Link to='/forget' className="login-form-forgot">忘记密码</Link>
          </Form.Item>
        </Form>
      );
    }
  }
  
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const {Content} = Layout;
  
class Login extends Component {
    render(){
        return(
            <Layout className='con-l'>
                <Content>
                    <div className='con-avater'>
                        <img src={Logo} alt='高校社团管理系统'/>
                    </div> 
                    <div className='con-title'>
                        用户登录
                    </div>
                    <div className='con-login'>
                        <WrappedNormalLoginForm/>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Login;