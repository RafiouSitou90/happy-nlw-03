import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
    console.error(error)

    return response.status(500).json({ message: 'Internal server error' })
}

export default errorHandler
