/*
 * @Author: Eli
 * @Date: 2019-06-24 17:29:42
 * @Last Modified by: Eli
 * @Last Modified time: 2019-06-24 17:30:05
 */
import './app.css'
import React, { Component } from 'react'
import Head from './js/Head.js'
import Home from './js/Home.js'
import Login from './js/Login.js'
import Userinfo from './js/Userinfo.js'
import Listcont from './js/Listcont.js'
import Admins from './js/Admins.js'

export class App extends Component {
  constructor(props) {
    super(props)
    //如果state的值改变，则页面刷新
    this.state = {
      name         : '请登录',
      loginname    : '',
      islogin      : false,   //是否登录
      choosedisplay: {
        //选择展示。通过控制这些值的true或false选择展示页面
        homestyle      : true,    //比如homestyle默认为true，主页显示
        loginstyle     : false,
        Listcontstyle  : false,
        xiangxistyle   : false,
        guanliyuanstyle: false
      },
      listid : 1,   //详细内容id
      headid : 0,   //耳机id
      isadmin: 0,   //是否为管理员
      zuijin : []
    }
  }
  //选择展示方法，通过调用该方法选择展示某个界面
  choosestyle(choose) {
    this.setState(ele => {
      let chonseli = ele
      for (const key in chonseli.choosedisplay) {
        if (key === choose) {
          chonseli.choosedisplay[key] = true
        } else {
          chonseli.choosedisplay[key] = false
        }
      }
      return chonseli
    })
  }
  //显示评测详情的方法 通过传入的id
  xiangxi(id) {
    this.setState({ listid: id })
    this.choosestyle('xiangxistyle')
  }

  render() {
    return (
      <div>
        <div className='headers'>
          {/* head页，一直显示，用于控制很多页面的跳转 */}
          <Head
            tuichu={() => {
              this.choosestyle('loginstyle')
              this.setState({ islogin: false, name: '', userid: 0, isadmin: 0 })
            }}
            islogin={this.state.islogin}
            isadmin={this.state.isadmin}
            name={this.state.name}
            home={() => this.choosestyle('homestyle')} //显示主页
            guanli={() => this.choosestyle('guanliyuanstyle')}
            login={() => this.choosestyle('loginstyle')}
          />
        </div>
        <div className='bodys'>
          {/* 主页 */}
          {this.state.choosedisplay.homestyle && (
            //如果homestyle为true,则执行（）后边的语句
            <Home
              listche={id => {
                this.setState({ headid: id })
                this.choosestyle('Listcontstyle')
              }}
              xiangxizhanshi={id => this.xiangxi(id)}
            />
          )}
          {/* 登陆注册 */}
          {this.state.choosedisplay.loginstyle && (
            <Login
              logins={(name, isadmin, userid) => {
                this.setState({
                  name,
                  islogin: true,
                  isadmin,
                  userid
                })
                this.choosestyle('homestyle')
              }}
            />
          )}
          {/* 耳机详情页 */}
          {this.state.choosedisplay.Listcontstyle && (
            <Userinfo
              xiangxizhanshi={id => this.xiangxi(id)}
              userid={this.state.userid}
              id={this.state.headid}
              name={this.state.name}
              zuijin={this.state.zuijin}
              newhead={id => {
                console.log(id)
                this.setState({ headid: id })
                this.choosestyle('Listcontstyle')
              }}
            />
          )}
          {/* 评测详情页 */}
          {this.state.choosedisplay.xiangxistyle && (
            <Listcont
              xiangxis={id => {
                this.setState({
                  headid: id
                })
                this.choosestyle('Listcontstyle')
              }}
              id={this.state.listid}
              name={this.state.name}
            />
          )}
          {/* 管理员页 */}
          {this.state.choosedisplay.guanliyuanstyle && <Admins />}
        </div>
      </div>
    )
  }
}

export default App
