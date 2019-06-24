import React, { Component } from 'react'
import Homecont from './../js/Homecont.js'
import './../css/home.css'

export default class home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      headlist: [] //储存热度前10的耳机信息
    }
  }
  componentWillMount() {
    this.updateheadlist()
  }
  updateheadlist() {
    fetch('/users/headlist')
      .then(res => res.json())
      .then(res => {
        this.setState({ headlist: res })
      })
      .catch(e => console.log('错误:', e))
  }
  render() {
    return (
      <div className='homeinfo'>
        <div className='homeleft'>
          <div className='homebutton'>主页</div>
          <div className='xinxinliu'>
            <div>
              {/* 耳机评测信息流的模块 */}
              <Homecont
                onClicks={id => this.props.xiangxizhanshi(id)}
                updateheadlist={() => {
                  this.updateheadlist()
                }}
              />
            </div>
          </div>
        </div>
        <div className='homeright'>
          <div className='lastcont'>耳机热度排行(๑•̀ㅂ•́)و✧</div>
          <ul className='lastconts'>
            {this.state.headlist.map(lists => (
              //循环展示储存的耳机信息
              <li
                className='erjixinxili'
                onClick={() => this.props.listche(lists.id)}
                key={lists.id}
              >
                {lists.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
