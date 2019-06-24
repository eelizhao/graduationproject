import React, { Component } from 'react'
import './../css/login.css'

export default class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginname: '',
      password: '',
      tishi: '', //提示信息
      email: ''
    }

    this.login = this.login.bind(this)
  }
  //同步更新登录名
  handdchange(loginname) {
    this.setState({
      loginname
    })
  }
  login() {
    let url = `/users/login?username=${this.state.loginname}&&password=${
      this.state.password
    }`
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.length === '1' || res.length === 1) {
          this.props.logins(
            this.state.loginname,
            parseInt(res[0].isadmin),
            res[0].id
          )
        } else {
          this.setState({ tishi: '账号或密码错误' })
          return
        }
      })
      .catch(e => console.log('错误:', e))
  }
  regisn() {
    // 判断 用户名 密码 邮箱是否为‘’ 也就是为空 不为空执行
    if (
      this.state.loginname === '' ||
      this.state.password === '' ||
      this.state.email === ''
    ) {
      this.setState({ tishi: '用户名 密码 邮箱 都不能为空' })
    } else {
      //保存用户输入信息
      const username = this.state.loginname
      const password = this.state.password
      const email = this.state.email
      //从后台查找输入的用户名
      fetch(`/users/queryall?username=${username}`)
        .then(res => res.json())
        .then(res => {
          //如果查找到信息，说明该用户名已经注册。
          if (res.length === 1 || res.length === '1') {
            this.setState({ tishi: '用户名已经注册' })
            return
          } else {
            //如果用户名没有注册，正常执行以下
            let url = `/users/adduser?username=${username}&&password=${password}&&email=${email}`
            fetch(url)
              .then(res => res.json())
              .then(res => {
                fetch(`/users/login?username=${username}&&password=${password}`)
                  .then(res => res.json())
                  .then(res => {
                    if (res.length === '1' || res.length === 1) {
                      //执行父组件的logins方法
                      this.props.logins(this.state.loginname, 0, res[0].id)
                    } else {
                      // 不可能出现的错误
                      console.log('蜜汁错误')
                    }
                  })
                  .catch(e => console.log('出现错误:', e))
              })
              .catch(e => console.log('出现错误:', e))
          }
        })
        .catch(e => console.log('出现错误:', e))
    }
  }
  render() {
    return (
      <div className='loginnow'>
        <div className='loginname'>欢迎你:{this.state.loginname}</div>
        <div className='tishi'>{this.state.tishi}</div>
        <form className='loginform'>
          <label>
            用户名:
            <input
              value={this.state.loginname}
              // 当值改变时同时改变保存在state里的值。约束组件
              onChange={e => this.setState({ loginname: e.target.value })}
              type='text'
              id='name'
              name='name'
            />
          </label>
          <br />
          <label>
            密&nbsp;&nbsp;&nbsp;码：
            <input
              onChange={e => this.setState({ password: e.target.value })}
              value={this.state.password}
              type='password'
              id='password'
              name='password'
            />
          </label>
          <br />
          <label>
            email：
            <input
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
              type='text'
              name='password'
            />
          </label>
          <br />
          <input
            onClick={() => {
              this.login()
            }}
            type='button'
            value='登录'
          />
          <input
            className='resign'
            onClick={() => {
              this.regisn()
            }}
            id='submit'
            type='button'
            value='注册'
          />
        </form>
      </div>
    )
  }
}
