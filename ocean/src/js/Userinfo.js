import React, { Component } from 'react'
import './../css/userinfo.css'
import Homecont from './../js/Homecont.js'

export default class login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listid: this.props.id, //耳机id
      userid: this.props.userid, //用户id
      //储存耳机信息
      users: {
        name: '',
        type: '',
        fire: '',
        peidai: ''
      },
      dody: '',
      zuijin: []
    }
  }
  //根据id查找该耳机的信息
  componentWillMount() {
    fetch(`/users/lastby2?id=${this.state.listid}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ users: res[0] })
        let zuijina = this.props.zuijin
        let lis = { id: res[0].id, name: res[0].name }
        zuijina.unshift(lis)
        this.setState({ zuijin: zuijina })
      })
      .catch(e => console.log('错误:', e))
  }
  //发布评测信息
  release() {
    //判断是否已经登录和输入评测内容
    if (
      this.state.userid &&
      this.state.dody !== '' &&
      this.state.userid !== 0
    ) {
      fetch(
        `/users/insertblogs?dody=${this.state.dody}&&headid=${
          this.state.listid
        }&&userid=${this.state.userid}`
      )
        .then(res => res.json())
        .then(res => {
          console.log(res)
          this.setState({
            tishi: '发布成功'
          })
        })
        .catch(e => console.log('错误:', e))
    } else {
      this.setState({
        tishi: '请先登录和填写内容'
      })
    }
  }

  render() {
    return (
      <div className='continfo'>
        <div className='contleft'>
          <div className='contbutton'>
            <i />
            <p>
              <span className='username'> {this.state.users.name} </span>
            </p>
          </div>
          <div className='homecommit'>
            <input
              type='text'
              onChange={e => this.setState({ dody: e.target.value })}
              value={this.state.dody}
            />
            <span className='blogssubmit' onClick={() => this.release()}>
              发布
            </span>
            <span className='infotishi'>{this.state.tishi}</span>
          </div>
          <div className='contcommit'>
            <i />
            <br />
            <div>
              佩戴方式：{this.state.users.peidai}
              <br />
              连接类型：{this.state.users.types}
            </div>
            <div>
              热度：
              <span className='liqianqiandashagua'>
                {' '}
                {this.state.users.fire}
              </span>
            </div>
          </div>
          <div className='xinxiliu'>
            <Homecont
              onClicks={id => this.props.xiangxizhanshi(id)}
              listid={this.state.listid} //控制耳机id传入以获取该耳机评测
            />
          </div>
        </div>
        <div className='homeright'>
          <div className='lastcont'>最近关注</div>
          <ul className='lastconts'>
            {this.state.zuijin.map(zuijin => (
              <li
                key={zuijin.id}
                // onClick={() => {
                //   this.setState({ listid: zuijin.id })
                //   this.componentWillMount()
                // }}
                className='erjixinxili'>
                {zuijin.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
