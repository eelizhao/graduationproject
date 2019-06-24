import React, { Component } from 'react'
import headcss from './../css/head.module.css'

export default class head extends Component {
  constructor(props) {
    super(props)

    this.state = { islogin: true }//是否登录
  }

  render() {
    return (
      <header className={headcss.header} id='header'>
        <div onClick={this.props.home} className={headcss.headerleft}>
          首页
        </div>
        <div className={headcss.headeright}>
          {this.props.isadmin === 1 && (
            //如果是管理员，显示管理员后台 if(this.props.isadmin===1)
            <p onClick={this.props.guanli} className={headcss.login}>
              管理员后台
            </p>
          )}
          <p  className={headcss.login}>
            {/* 如果已登录显示退出，未登录显示登录 */}
            {this.props.islogin ? <span onClick={this.props.tuichu}>退出</span> : <span onClick={this.props.login}>登录/注册</span>}
          </p>
          <i className={headcss.personicon} />
          {!this.props.islogin?<p onClick={this.props.login} className={headcss.personinfo}>请登录</p>:<p className={headcss.personinfo}>{this.props.name}</p>}
          
        </div>
      </header>
    )
  }
}
