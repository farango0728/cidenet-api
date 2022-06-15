import { createConnection } from 'typeorm'

createConnection().then(({}) =>
  console.log('🌴 Database connection was successful!')
)
