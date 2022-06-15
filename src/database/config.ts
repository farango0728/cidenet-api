import { Environments } from './types'
import dotenv from 'dotenv'

dotenv.config()

export default {
  server: {
    environment: process.env.NODE_ENV || Environments.DEV,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.NODE_PORT || 3000,
    corsOrigins: process.env.corsOrigins || 'http://localhost:3000',
  },
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PWD || '',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false || true,
    logging: process.env.DB_ENABLE_LOGGING === 'true' ? true : false || false,
    entitiesPath:
      process.env.NODE_ENV === Environments.DEV
        ? 'src/database/migrations/*.ts'
        : 'dist/database/migrations/*.js',
    migrationsPath:
      process.env.NODE_ENV === Environments.DEV
        ? 'src/database/migrations/*.ts'
        : 'dist/database/migrations/*.js',
  },
  project: {
    name: process.env.PROJECT_NAME || 'Cidenet',
    tokenSecret: process.env.TOKEN_SECRET,
  },
}
