import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


import userRouter from './routes/user.routes.js'
import vehicleRouter from './routes/vehicle.routes.js'

app.use("/api/v1/users",userRouter)
app.use("/api/v1/vehicles",vehicleRouter)


export {app}