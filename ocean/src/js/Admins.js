import './../css/admins.css'
import React, { Component } from 'react'
import Erji from './guanli/erjixinxi.js'
import Pingce from './guanli/pingce.js'
import Yonghu from './guanli/yonghu.js'

export default class Guanli extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yonghustyle: {
        display: 'none'
      },
      xinxistyle: {
        display: 'none'
      },
      pingcestyle: {
        display: 'none'
      }
    }
    this.delet = this.delet.bind(this)
  }

  delet() {
    this.setState({
      yonghustyle: {
        display: 'none'
      },
      xinxistyle: {
        display: 'none'
      },
      pingcestyle: {
        display: 'none'
      }
    })
  }
  yonghu() {
    this.delet()
    this.setState({
      yonghustyle: {
        display: 'block'
      }
    })
  }
  xinxi() {
    this.delet()
    this.setState({
      xinxistyle: {
        display: 'block'
      }
    })
  }
  pingce() {
    this.delet()
    this.setState({
      pingcestyle: {
        display: 'block'
      }
    })
  }
  render() {
    return (
      <div>
        <aside id='navigation'>
          <header>
            <h2>功能选择</h2>
          </header>
          <div className={'hiliqian'} id=''>
            <p onClick={() => this.xinxi()}>耳机信息管理</p>
          </div>
          <div onClick={() => this.yonghu()} className='hiliqian' id=''>
            <p>用户信息管理</p>
          </div>
          <div onClick={() => this.pingce()} className='hiliqian' id=''>
            <p>评测管理</p>
          </div>
        </aside>
        <div className='hello'>
          <div style={this.state.xinxistyle}>
            <Erji />
          </div>
          <div style={this.state.yonghustyle}>
            <Yonghu />
          </div>
          <div style={this.state.pingcestyle}>
            <Pingce />
          </div>
          {/* <div style={this.state.pinglunstyle} className="评论管理">
            <Yonghu />
          </div> */}
        </div>
      </div>
    )
  }
}
