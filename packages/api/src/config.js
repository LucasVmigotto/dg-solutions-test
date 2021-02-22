module.exports = {
  PORT: process.env.PORT || 4000,
  HOST: process.env.HOST || '0.0.0.0',
  ENDPOINT: process.env.ENDPOINT || '/api/graphql',
  PG_CONNECTION_STRING: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@pg/${process.env.POSTGRES_DB}` ||
    'postgres://user:rootroot@pg/dg_solutions',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  NODE_ENV: process.env.NODE_ENV || 'dev',
  APOLLO_SERVER_DEBUG: process.env.APOLLO_SERVER_DEBUG === undefined ||
    process.env.APOLLO_SERVER_DEBUG === 'true'
}
