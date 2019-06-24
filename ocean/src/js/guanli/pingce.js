import React, { Component } from 'react'

export default class login extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  newsa() {
    let pingceid = this.state.pingceid ? parseInt(this.state.pingceid) : '%'
    let userid = this.state.userid ? parseInt(this.state.userid) : '%'
    let headid = this.state.headid ? parseInt(this.state.headid) : '%'
    fetch(`/users/querylist?id=${pingceid}&&userid=${userid}&&headid=${headid}`)
      .then(res => res.json())
      .then(res => {
        if (res.length === '0' || res.length === 0) {
          this.setState({ tishi: '无信息' })
          this.setState({ lsit: null })
        } else {
          this.setState({ tishi: '' })
          this.setState({ lsit: res })
          console.log(res)
        }
      })
  }
  suss(id) {
    fetch(`/users/deletelist?id=${id}`)
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
    for (const les in this.state.lsit) {
      listss.push(
        <tr>
          <td>{this.state.lsit[les].id}</td>
          <td>{this.state.lsit[les].userid}</td>
          <td>{this.state.lsit[les].headid}</td>
          <td>{this.state.lsit[les].dody.substring(0, 10)}</td>
          <td>
            <input
              onClick={() => this.suss(this.state.lsit[les].id)}
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
          <h2>评测内容管理</h2>
        </div>
        <div>
          <form>
            <p>
              <label htmlFor='评测id'>评测id</label>
              <input
                onChange={e => {
                  this.setState({ pingceid: e.target.value })
                }}
                type='text'
                name='评测id'
              />
              <label htmlFor='用户id'>用户id</label>
              <input
                onChange={e => {
                  this.setState({ userid: e.target.value })
                }}
                type='text'
                name='用户id'
              />
              <label htmlFor='耳机id'>耳机id</label>
              <input
                onChange={e => {
                  this.setState({ headid: e.target.value })
                }}
                type='text'
                name='耳机id'
              />
              <input onClick={() => this.newsa()} type='button' value='查询' />
            </p>
          </form>
        </div>
        <div className='nihaoa'>{this.state.tishi}</div>
        <div>
          <table className='yonghumi'>
            <tbody>
              <tr>
                <th>评测id</th>
                <th>用户id</th>
                <th>耳机id</th>
                <th>评测内容</th>
              </tr>
              {listss}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
