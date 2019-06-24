import React, { Component } from 'react'
import './../css/listcont.css'

export default class listcont extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id, //该详细评测的id
      list: {} //报讯详细内容
    }
  }
  componentDidMount() {
    fetch(`/users/queryblogbyid?id=${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ list: res[0] })
      })
      .catch(e => console.log('错误:', e))
  }
  render() {
    return (
      <div className='continfo'>
        <div className='contleft'>
          <div className='contbuttons'>
            <i />
            <p>
              <span className='usernames'>{this.state.list.username} </span>
              {this.state.list.email}
            </p>
          </div>
          <div className='xinxiliu'>{this.state.list.dody}</div>
        </div>
        <div className='homeright'>
          <div className='lastcont'>相关信息</div>
          <ul className='lastconts'>
            {/* 储存耳机名字 */}
            <li className='erjixinxili'>{this.state.list.username}</li>
            {/* 储存该评测的耳机名，点击跳转到相应耳机信息 */}
            <li
              className='erjixinxili'
              onClick={() => {
                this.props.xiangxis(this.state.list.headid)
              }}
            >
              {this.state.list.headname}
            </li>
            <i />
          </ul>
        </div>
      </div>
    )
  }
}
