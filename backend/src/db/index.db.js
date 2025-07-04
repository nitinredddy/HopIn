import mongoose from 'mongoose'

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("Mongo DB connected. Host",connectionInstance.connection.host)
    } catch (error) {
        console.log("Error connecting to mongodb",error)
        process.exit(1)
    }
}

export {connectDB}