const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  client: 'pg',
  connection: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@pg/${process.env.POSTGRES_DB}`,
  migrations: {
    directory: './migrations/'
  }
}
