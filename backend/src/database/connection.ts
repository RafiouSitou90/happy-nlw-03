import { createConnection } from 'typeorm'

createConnection()
    .then(_ => console.log("Connected to the database successfully"))
    .catch(error => console.error(error))
