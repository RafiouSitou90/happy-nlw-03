import express from 'express'
import { getRepository } from 'typeorm'

import './database/connection'
import Orphanage from './models/Orphanage';

const APP_PORT = 3333;
const APP_SERVER = '127.0.0.1';

const app = express()

app.use(express.json())

app.post('/orphanages', async (request, response) => {
    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    } = request.body

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    })
    await orphanagesRepository.save(orphanage).then(_ => true)

    return response.status(201).json(orphanage)
})

app.listen(APP_PORT, () => {
    console.log('App is running and listening on %s:%d',  APP_SERVER, APP_PORT)
})
