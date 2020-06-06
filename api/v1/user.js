const { exec, escape } = require('../../db/mysql')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const path = req.url.split('?')[0]

  if (req.method === 'POST' && path === '/user/login') {
    let { username, password } = req.body
    username = escape(username)
    password = escape(password)

    const sql = `select username, realname from users where username=${username} and password=${password}`
    return exec(sql).then(rows => {
      //  通过cookie携带有用户名则已登录
      if (rows[0].username) {
        res.setHeader('Set-Cookie', `username=${rows[0].username}; path=/; httpOnly; expires=${getCookieExpires()}`)
      }
      return rows[0] || {}
    })
  }

}

module.exports = {
  handleUserRouter
}