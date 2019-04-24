import React, { useState,useEffect,useRef } from 'react'
import { randomNum, calculateWidth } from '../utils/utils'
import { Form, Input, Row, Col, message} from 'antd'
import Fetch from '../own/Fetch'
import Local from '../own/Local'
import history from '../own/history'
import PromptBox from '../PromptBox'
import '../assets/font/iconfont.css'


function NormalLoginForm(props){

  const [code,setCode]=useState("");

  const [focusItem,setfocusItem]=useState(-1);
  let canvas=useRef(null)
  useEffect(()=>{
    createCode()
  },[])

  /**
   * 生成验证码
   */
  let createCode = () => {
    const ctx =canvas.current.getContext('2d')
    Fetch.get('/api/captcha/')
          .then((data) => {
          let chars = data['code'];
          let code = '';
          ctx.clearRect(0, 0, 80, 39);
          for (let i = 0; i < 4; i++) {
            const char = chars[i]
            code += char
            ctx.font = randomNum(20, 25) + 'px SimHei'  //设置字体随机大小
            ctx.fillStyle = '#D3D7F7'
            ctx.textBaseline = 'middle'
            ctx.shadowOffsetX = randomNum(-3, 3)
            ctx.shadowOffsetY = randomNum(-3, 3)
            ctx.shadowBlur = randomNum(-3, 3)
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
            let x = 80 / 5 * (i + 1)
            let y = 39 / 2
            let deg = randomNum(-25, 25)
            /**设置旋转角度和坐标原点**/
            ctx.translate(x, y)
            ctx.rotate(deg * Math.PI / 180)
            ctx.fillText(char, 0, 0)
            /**恢复旋转角度和坐标原点**/
            ctx.rotate(-deg * Math.PI / 180)
            ctx.translate(-x, -y)
            }
            setCode(code)
      })
      .catch(error => {
          message.info('验证码获取失败')
    })
  }

  let loginSubmit = (e) => {
    e.preventDefault()
    setfocusItem(-1)
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.verification.length !== 4) {
          props.form.setFields({
            verification: {
              value: values.verification,
              errors: [new Error('验证码错误')]
            }
          })
          return
        }

        let data = {
              username: values.username,
              password: values.password,
              code: values.verification
        }
        
        Fetch.post("/api/users/login/",{
          body: JSON.stringify(data)
        }).then(data=>{
            Local.set("username", data.username);
            Local.set("role", data.role);
            Local.set("userid", data.id);
            Local.set("image", data.image);
            
            history.push('/app');
        }).catch(err=>{
          if ('code' in err){
            props.form.setFields({
                  username: {
                    value: values.code,
                    errors: [new Error(err.code[0])]
                  }
                })
          }
          if ('username' in err){
            props.form.setFields({
                  username: {
                    value: values.username,
                    errors: [new Error(err.username[0])]
                  }
                })
          }
        })

      }
    })
  }
  let register = () => {
    props.switchShowBox('register')
    setTimeout(() => props.form.resetFields(), 500)
  }
  const {getFieldDecorator, getFieldError} = props.form
  return (
    <div className={props.className}>
      <h3 className='title'>高校社团管理系统登录</h3>
      <Form onSubmit={(e)=>loginSubmit(e)}>
        <Form.Item help={getFieldError('username') &&
        <PromptBox info={getFieldError('username')} width={calculateWidth(getFieldError('username'))}/>}>
          {getFieldDecorator('username', {
            rules: [{required: true, message: '请输入用户名/工号/学号'}]
          })(
            <Input
              onFocus={() => setfocusItem(0)}
              onBlur={() => setfocusItem(-1)}
              maxLength={20}
              placeholder='用户名/工号/学号'
              addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}/>
          )}
        </Form.Item>
        <Form.Item help={getFieldError('password') &&
        <PromptBox info={getFieldError('password')} width={calculateWidth(getFieldError('password'))}/>}>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请输入密码'}]
          })(
            <Input
              onFocus={() => setfocusItem(1)}
              onBlur={() => setfocusItem(-1)}
              type='password'
              // maxLength={16}
              placeholder='密码'
              addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}/>
          )}
        </Form.Item>
        <Form.Item help={getFieldError('verification') &&
        <PromptBox info={getFieldError('verification')} width={calculateWidth(getFieldError('verification'))}/>}>
          {getFieldDecorator('verification', {
            validateFirst: true,
            rules: [
              {required: true, message: '请输入验证码'},
              {
                validator: (rule, value, callback) => {
                  if (value.length !== 4) {
                    callback('验证码错误')
                  }
                  callback()
                }
              }
            ]
          })(
            <Row>
              <Col span={15}>
                <Input
                  onFocus={() => setfocusItem(2)}
                  onBlur={() => setfocusItem(-1)}
                  maxLength={4}
                  placeholder='验证码'
                  addonBefore={<span className='iconfont icon-securityCode-b'
                                     style={focusItem === 2 ? styles.focus : {}}/>}/>
              </Col>
              <Col span={9}>
                <canvas onClick={()=>createCode()} width="80" height='39' ref={canvas}/>
              </Col>
            </Row>
          )}
        </Form.Item>
        <div className='bottom'>
          <input className='loginBtn' type="submit" value='登录'/>
          <span className='registerBtn' onClick={()=>register()}>注册</span>
        </div>
      </Form>
      <div className='footer'>
        <div>欢迎登陆高校社团管理系统</div>
      </div>
    </div>
  )
}

const styles = {
  focus: {
    width: '20px',
    opacity: 1
  },
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default LoginForm