import express from 'express'

import './database/connection'
import routes from "./routes"

const APP_PORT = 3333;
const APP_SERVER = '127.0.0.1';

const app = express()

app.use(express.json())
app.use(routes)

app.listen(APP_PORT, () => {
    console.log('App is running and listening on %s:%d',  APP_SERVER, APP_PORT)
})
