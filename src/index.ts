import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import { AppDataSource } from './db'
import { ServiceService } from './services/service.service'

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

app.get('/', async (req, res) => {
    res.json(await ServiceService.getServiceByCode('Q123'))
})

app.get("*", (req, res) => {
    res.status(404).json({
        message: "Not found!"
    })
})
