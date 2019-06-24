import React, { Component } from 'react'
import './../css/homecont.css'

export default class Homecont extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [] //评测信息存储的位置
    }
  }
  componentDidMount() {
    // 如果是耳机详情页，则需要查找关于该耳机的所有评测，因为公用homecont模块，所以通过传入的listid判断为那个耳机的详情页。如果传入listid，则查找该耳机id的
    // 评测，如果没有传入listid，则查找最新的5条（执行else）。
    if (this.props.listid) {
      fetch(`/users/homequerys?id=${this.props.listid}`)
        .then(res => res.json())
        .then(res => {
          if (res.length === '0' || res.length === 0) {
            this.setState({ list: [] })
          } else {
            this.setState({ list: res })
          }
        })
    } else {
      fetch('/users/homequery')
        .then(res => res.json())
        .then(res => {
          this.setState({ list: res })
        })
        .catch(e => console.log('错误:', e))
    }
  }
  //点赞功能设计
  changezan(id, infoid, headid) {
    //转id为int值
    id = parseInt(id) + 1
    //点赞上传到数据库
    fetch(`/users/updatelist?zan=${id}&&id=${infoid}`)
      .then(res => {
        //更新耳机热度
        fetch(`/users/updatefire?id=${headid}`).catch(e => console.log(e))
        this.props.updateheadlist();
      })
      .catch(e => console.log('错误:', e))
  }

  render() {
    const userinfo = []
    if (this.state.list === []) {
      console.log('无信息')
    } else {
      for (let user of this.state.list) {
        userinfo.push(
          <div className='box-show' key={user.id}>
            <div className='homecont'>
              <span className='homego'>
                <div className='contimg' />
                <div className='contname'>
                  <p>
                    {user.username}
                    <span className='emails'>{user.email}</span>
                    <em className='heph'> {user.headname}</em>
                  </p>
                </div>
                {/* 点击会跳转到详细评测 */}
                <div
                  onClick={() => {
                    this.props.onClicks(user.id)
                  }}
                  className='contbody'
                >
                  {/* 截取从数据库查询的内容，显示太多影响阅读 */}
                  {`${user.dody.substring(0, 120)}···`}
                </div>
              </span>
              <div className='info'>
                <ul>
                  <li
                    onClick={() => {
                      user.zan=user.zan+1
                      this.changezan(user.zan, user.id, user.headid)
                    }}
                    className='zan'
                  >
                    赞<em>({user.zan})</em>
                  </li>
                </ul>
              </div>
            </div>
            <div />
          </div>
        )
      }
    }

    return <div className='root'>{userinfo}</div>
  }
}
