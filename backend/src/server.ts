import express from 'express'
import path from 'path'
import 'express-async-errors'
import cors from 'cors'

import './database/connection'
import routes from './routes'
import errorHandler from './errors/handler'

const APP_PORT = 3333;
const APP_SERVER = '127.0.0.1';

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(APP_PORT, () => {
    console.log('App is running and listening on %s:%d',  APP_SERVER, APP_PORT)
})
