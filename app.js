const { getPostData } = require('./util/getPostData')
const { SuccessModel } = require('./Model/responseModel')
const http = require('http')
const queryString = require('querystring')
const { handleBlogRouter } = require('./api/v1/blog')
const { handleUserRouter } = require('./api/v1/user')

const server = http.createServer((req, res) => {
  req.path = req.url.split('?')[0]
  req.query = queryString.parse(req.url.split('?')[1])

  req.cookie = {}
  const cookieString = req.headers.cookie || ''
  cookieString.split(';').forEach(query => {
    const arr = query.split('=')
    req.cookie[arr[0]] = arr[1]
  })

  getPostData(req).then(postData => {
    req.body = postData
    // console.log(req.body)
    const blogResult = handleBlogRouter(req,res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(new SuccessModel(blogData)))
      })
      return
    }

    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(new SuccessModel(userData)))
      })
      return
    }

    res.end('404 NOT FOUND\n')
  })
})

server.listen(3000)