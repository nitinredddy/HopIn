import { connectDB } from "./db/index.db.js";
import { app } from "./app.js";
import dotenv from 'dotenv'

dotenv.config({
    path:"./.env"
})

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("Server error",err)
    })
    app.listen(process.env.PORT,()=>{
        console.log("Server listening on port",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("Failed to connect to mongodb",error)
})