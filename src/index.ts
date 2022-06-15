import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import './database/connect'
import config from './database/config'
import routes from './router'

const app = express()

const { host, corsOrigins } = config.server

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

/// End
app.use(routes)

let port = parseInt(process.env.NODE_PORT || '')
if (isNaN(port) || port === 0) {
  port = 3001
}

app.listen(port, '0.0.0.0', () => {
  console.log(
    `🚀 Server Started at PORT: ${port}, host: ${host}, environment ${config.server.environment}, dataBase : ${config.database.name}`
  )
})
