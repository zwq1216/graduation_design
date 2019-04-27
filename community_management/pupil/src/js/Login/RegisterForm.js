import React from 'react'
import { Form, Input, message } from 'antd'
import { calculateWidth } from '../utils/utils'
import PromptBox from '../PromptBox'
import Fetch from '../own/Fetch'
import history from '../own/history'
import '../assets/font/iconfont.css'


class NormalRegisterForm extends React.Component {
  state = {
    focusItem: -1
  }
  registerSubmit = (e) => {
    e.preventDefault()
    this.setState({
      focusItem: -1
    })

    
    this.props.form.validateFields((err, values) => {
      if (!err) {
          let objs = {
              sno: values.sno,
              username: values.username,
              password: values.registerPassword
          }
          Fetch.post("/api/users/create/",{
              body: JSON.stringify(objs)
          }).then(data=>{
              console.log(data)
              history.push('/login');
          }).catch(err=>{
            console.log(err)
            if ('sno' in err){
              this.props.form.setFields({
                    sno: {
                      value: values.sno,
                      errors: [new Error(err.sno[0])]
                    }
                  })
            }
            if ('username' in err){
              this.props.form.setFields({
                    username: {
                      value: values.username,
                      errors: [new Error(err.username[0])]
                    }
                  })
            }
            if ('password' in err){
              this.props.form.setFields({
                registerPassword: {
                      value: values.registerPassword,
                      errors: [new Error(err.password[0])]
                    }
                  })
            }
          })
      }
    })
  }
  gobackLogin = () => {
    this.props.switchShowBox('login')
    setTimeout(() => this.props.form.resetFields(), 500)
  }

  render () {
    const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form
    const {focusItem} = this.state
    return (
      <div className={this.props.className}>
        <h3 className='title'>用户注册</h3>
        <Form onSubmit={this.registerSubmit}>
          <Form.Item help={getFieldError('sno') && <PromptBox info={getFieldError('sno')}
                                                                           width={calculateWidth(getFieldError('sno'))}/>}>
            {getFieldDecorator('sno', {
              validateFirst: true,
              rules: [
                {required: true, message: '学号或工号不能为空'},
                {pattern: '^[^ ]+$', message: '不能输入空格'},
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 0})}
                onBlur={() => this.setState({focusItem: -1})}
                maxLength={16}
                placeholder='学号/工号'
                addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('username') && <PromptBox info={getFieldError('username')}
                                                                           width={calculateWidth(getFieldError('username'))}/>}>
            {getFieldDecorator('username', {
              validateFirst: true,
              rules: [
                {required: true, message: '用户名不能为空'},
                {pattern: '^[^ ]+$', message: '不能输入空格'},
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 0})}
                onBlur={() => this.setState({focusItem: -1})}
                maxLength={16}
                placeholder='用户名'
                addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('registerPassword') && <PromptBox info={getFieldError('registerPassword')}
                                                                           width={calculateWidth(getFieldError('registerPassword'))}/>}>
            {getFieldDecorator('registerPassword', {
              validateFirst: true,
              rules: [
                {required: true, message: '密码不能为空'},
                {pattern: '^[^ ]+$', message: '密码不能有空格'}
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 1})}
                onBlur={() => this.setState({focusItem: -1})}
                type='password'
                maxLength={16}
                placeholder='密码'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('confirmPassword') && <PromptBox info={getFieldError('confirmPassword')}
                                                                          width={calculateWidth(getFieldError('confirmPassword'))}/>}>
            {getFieldDecorator('confirmPassword', {
              validateFirst: true,
              rules: [
                {required: true, message: '请确认密码'},
                {
                  validator: (rule, value, callback) => {
                    if (value && value !== getFieldValue('registerPassword')) {
                      callback('两次输入不一致！')
                    }
                    callback()
                  }
                },
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 2})}
                onBlur={() => this.setState({focusItem: -1})}
                type='password'
                maxLength={16}
                placeholder='确认密码'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 2 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <div className='bottom'>
            <input className='loginBtn' type="submit" value='注册'/>
            <span className='registerBtn' onClick={this.gobackLogin}>返回登录</span>
          </div>
        </Form>
        <div className='footer'>
          <div>欢迎注册高校社团管理系统</div>
        </div>
      </div>
    )
  }
}

const RegisterForm = Form.create({ name: 'normal_register' })(NormalRegisterForm);

const styles = {
  focus: {
    width: '20px',
    opacity: 1
  },
}

export default RegisterForm