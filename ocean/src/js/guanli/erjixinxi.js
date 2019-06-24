import React, { Component } from 'react'

export default class login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pingpai: null,
      lianjie: null,
      peidai: null,
      li: null
    }
  }
  insert() {
    fetch(`/users/lastbyid=%&&name=${this.state.pingpai}`)
      .then(res => res.json())
      .then(res => {
        if (res.length === 1 || res.length === '1') {
          this.setState({ li: '该条耳机信息已经存在' })
          return
        } else {
          fetch(
            `/users/insertheadlist?name=${this.state.pingpai}&&types=${
              this.state.lianjie
            }&&peidai=${this.state.peidai}`
          )
            .then(res => res.json())
            .then(res => {
              this.setState({
                li: res.msg
              })
            })
            this.setState({ li: '添加成功' })
        }
      })
  }
  render() {
    return (
      <div>
        <div>
          <h2>耳机信息</h2>
        </div>
        <form>
          <div>
            <label htmlFor='品牌'>品牌</label>
            <input
              onChange={e => {
                this.setState({ pingpai: e.target.value })
              }}
              type='text'
              name='品牌'
            />
          </div>
          <div>
            <label htmlFor='连接类型'>连接类型</label>
            <input
              onChange={e => {
                this.setState({ lianjie: e.target.value })
              }}
              type='text'
              name='连接类型'
            />
          </div>
          <div>
            <label htmlFor='佩戴方式'>佩戴方式</label>
            <input
              onChange={e => {
                this.setState({ peidai: e.target.value })
              }}
              type='text'
              name='佩戴方式'
            />
          </div>
          <div>
            <input onClick={() => this.insert()} type='button' value='添加' />
            <p>{this.state.li}</p>
          </div>
        </form>
      </div>
    )
  }
}
