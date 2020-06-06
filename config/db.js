const env = process.env.NODE_ENV

let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'a670984224',
    port: '3306',
    database: 'blog'
  }
}

if (env === 'prod') {
  MYSQL_CONFIG = {

  }
}

module.exports = {
  MYSQL_CONFIG
}