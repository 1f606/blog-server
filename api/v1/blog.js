const { getBlogList, newBlog, editBlog, getDetail, delBlog } = require('../../controller/blog')

const handleBlogRouter = (req, res) => {
  const path = req.url.split('?')[0]

  if (req.method === 'GET' && path === '/blog/list') {
    return getBlogList(req.query.author, req.query.keyword)
  }

  if (req.method === 'POST' && path === '/blog/new') {
    return newBlog(req.body)
  }

  if (req.method === 'GET' && path === '/blog/detail') {
    return getDetail(req.query.id)
  }

  if (req.method === 'POST' && path === '/blog/edit') {
    return editBlog(req.body)
  }

  if (req.method === 'GET' && path === '/blog/del') {
    return delBlog(req.body.id, req.body.author)
  }
}

module.exports = {
  handleBlogRouter
}