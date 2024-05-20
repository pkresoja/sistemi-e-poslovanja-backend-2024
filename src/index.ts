import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import { AppDataSource } from './db'
import { TypeRoute } from './routes/type.route'
import { StateRoute } from './routes/state.route'
import { ServiceRoute } from './routes/service.route'
import { ModelRoute } from './routes/model.route'
import { ManufacturerRoute } from './routes/manufacturer.route'
import { DeviceRoute } from './routes/device.route'
import { CustomerRoute } from './routes/customer.route'
import { UserRoute } from './routes/user.route'
import { authenticateToken } from './utils'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

configDotenv()
AppDataSource.initialize().then(() => {
    console.log('Connected to database')
    const port = process.env.SERVER_PORT || 4000
    app.listen(port, () => {
        console.log("Listening on port " + port)
    })
}).catch((e) => console.log(e))

app.use(authenticateToken)
app.use('/api/user', UserRoute)
app.use('/api/customer', CustomerRoute)
app.use('/api/device', DeviceRoute)
app.use('/api/manufacturer', ManufacturerRoute)
app.use('/api/model', ModelRoute)
app.use('/api/service', ServiceRoute)
app.use('/api/state', StateRoute)
app.use('/api/type', TypeRoute)

app.get("*", (req, res) => {
    res.status(404).json({
        message: "NOT_FOUND",
        timestamp: new Date()
    })
})

app.post("*", (req, res) => {
    res.status(501).json({
        message: "NOT_IMPLEMENTED",
        timestamp: new Date()
    })
})

app.put("*", (req, res) => {
    res.status(501).json({
        message: "NOT_IMPLEMENTED",
        timestamp: new Date()
    })
})

app.delete("*", (req, res) => {
    res.status(501).json({
        message: "NOT_IMPLEMENTED",
        timestamp: new Date()
    })
})
