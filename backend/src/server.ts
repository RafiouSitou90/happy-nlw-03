import express from "express"

const APP_PORT = 3333;
const APP_SERVER = '127.0.0.1';

const app = express()

app.listen(APP_PORT, () => {
    console.log('App is running and listening on %s:%d',  APP_SERVER, APP_PORT)
})