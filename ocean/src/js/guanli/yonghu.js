import React, { Component } from 'react'

export default class login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tishi: null,
      id: null
    }
  }
  lists() {
    fetch(`/users/query?id=${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        if (res.length === '1' || res.length === 1) {
          this.setState({ tishi: '' })
          this.setState({ lsit: res })
        } else {
          this.setState({ tishi: '无信息' })
          this.setState({ lsit: null })
        }
      })
  }
  suss(id) {
    fetch(`/users/deleteUser?id=${id}`)
      // .then(res => res.json())
      .then(res => {
        this.setState({ tishi: '删除成功' })
        this.setState({ lsit: null })
        // if (res.length==='1'||res.length===1) {
        //   this.setState({tishi:''})
        //   this.setState({ lsit: res });
        // }else{
        //   this.setState({tishi:'无信息'});
        // }
      })
  }
  render() {
    const listss = []
    if (this.state.lsit) {
      let les = this.state.lsit[0]
      listss.push(
        <tr>
          <td>{les.id}</td>
          <td>{les.username}</td>
          <td>{les.password}</td>
          <td>{les.email}</td>
          <td>{les.isadmin}</td>
          <td>
            <input
              onClick={() => this.suss(les.id)}
              type='submit'
              value='删除'
            />
          </td>
        </tr>
      )
    }
    return (
      <div>
        <div>
          <h2>用户管理</h2>
        </div>
        <div>
          <form>
            <div>
              <label htmlFor='用户id'>用户id</label>
              <input
                onChange={e => {
                  this.setState({ id: e.target.value })
                }}
                type='text'
                name='用户id'
              />
              <input
                onClick={() => {
                  this.lists()
                }}
                type='button'
                value='查询'
              />
              <p className='nihaoa'>{this.state.tishi}</p>
            </div>
          </form>
        </div>
        <div>
          <table className='yonghumi'>
            <tbody>
              <tr>
                <th>用户id</th>
                <th>用户名</th>
                <th>密码</th>
                <th>邮箱</th>
                <th>身份</th>
              </tr>
              {listss}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
