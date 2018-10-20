module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/blog'
  },
  test: {},
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
