module.exports = {
  port: process.env.PORT || 3001,
  db: process.env.MONGODB || 'mongodb://localhost:27017/covit19',
  SECRET_TOKEN: 'appcovit19token'
}

