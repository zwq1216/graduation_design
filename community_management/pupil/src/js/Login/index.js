import React from 'react'
// import { notification } from 'antd'
import BGParticle from '../utils/BGParticle'
import './style.css'
import 'animate.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import bg1 from './images/bg1.jpg';


class Login extends React.Component {
  state = {
    showBox: 'login',   //展示当前表单
  }

  componentDidMount () {
    this.initPage()
  }

  componentWillUnmount () {
    this.particle && this.particle.destory()
    // notification.destroy()
  }
  //载入页面时的一些处理
  initPage = () => {
      this.particle = new BGParticle('backgroundBox')
      this.particle.init()
    //   notification.open({
    //     // message:<ul><li>初始账号：admin</li><li>初始密码：admin</li></ul>,
    //     duration:0,
    //     className:'login-notification'
    // })
  }
  //切换showbox
  switchShowBox = (box) => {
    this.setState({
      showBox: box
    })
  }

  render () {
    const {showBox} = this.state
    return (
      <div id='login-page'>
        {
            <div>
              <div id='backgroundBox' style={styles.backgroundBox}/>
              <div className={showBox === 'login' ? 'container' : 'container_r'}>
                <LoginForm
                  className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'}
                  switchShowBox={this.switchShowBox}/>
                <RegisterForm
                  className={showBox === 'register' ? 'box showBox' : 'box hiddenBox'}
                  switchShowBox={this.switchShowBox}/>
              </div>
            </div>
        }
      </div>
    )
  }
}

const styles = {
  backgroundBox: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${bg1})`,
    backgroundSize: '100% 100%',
    transition:'all .5s'
  },
  focus: {
    width: '20px',
    opacity: 1
  },
  loadingBox:{
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)'
  },
  loadingTitle:{
    position:'fixed',
    top:'50%',
    left:'50%',
    marginLeft: -45,
    marginTop: -18,
    color:'#000',
    fontWeight:500,
    fontSize:24
  },
}

export default Login
