const xss = require('xss')
const { exec } = require('../db/mysql')

const getBlogList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += 'ORDER BY createdtime;'
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = xss(blogData.author)
  const createTime = Date.now()

  const sql = `insert into blogs (title, content, createdtime, author) values ('${title}', '${content}', ${createTime}, '${author}');`

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const editBlog = (blogData) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const id = xss(blogData.id)

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`

  return exec(sql).then(updateData => {
    return updateData.affectedRows > 0;
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  return exec(sql).then(delData => {
    return delData.affectedRows > 0;
  })
}

module.exports = {
  getBlogList,
  getDetail,
  newBlog,
  editBlog,
  delBlog
}