import React, {Component, useState} from 'react'
import Local from '../own/Local';
import Fetch from '../own/Fetch';
import PubSub from 'pubsub-js';
import Tran from '../own/Tran';
import history from '../own/history';
import {
    Form, Icon, Input, Button, Row, Col
  } from 'antd';
import {Link} from 'react-router-dom';
import {Layout} from 'antd';
  
import Logo from '../../images/logo.png';
import '../../css/global/register_login.css';
import { makeStore } from '../info/Store';
import {INIT_USER} from '../info/Store';

const store = makeStore();

class NormalLoginForm extends React.Component {

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let obj={
            username: values.username,
            password: values.password,
            code:values.code
        };
        Fetch.post("/api/users/login/",{
          body: JSON.stringify(obj)
        }).then(data=>{
            PubSub.publish("alert", {
                type: "success",
                name: "登录成功"
            });
            Local.set("username", data.username);
            Local.set("role", data.role)
            Local.set("userid", data.id);
            store.dispatch({
              type: INIT_USER,
                userinfo: {
                    username:data.username,
                    role: data.role,
                    userid: data.id
                }
            });
            history.push('/app');
        }).catch(err=>{
            // setCodeimg(`/api/users/get_valid_img.png?t=${moment().valueOf()}`)
            if(err.error){
                return PubSub.publish("alert", {
                    type: "error",
                    name: err.error[0]
                });
            }
            console.log(err)
            // let errors = Tran.clone(error);
            // if (err.username){
            //     Object.assign(errors, {
            //         "username": err.username[0]
            //     })    
            // }
            // if (err.code) {
            //     Object.assign(errors, {
            //         "code": err.code[0]
            //     })
            // }
            // setErrors(errors)
        })
  
        }
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名或密码错误' }],
            })(
              <Input prefix={<Icon type="user" 
              style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="学号/工号" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '用户名或密码错误' }],
            })(
              <Input prefix={<Icon type="lock" 
              style={{ color: 'rgba(0,0,0,.25)' }} />} 
              type="password" 
              placeholder="密码" />
            )}
          </Form.Item>

          <Form.Item>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('code', {
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