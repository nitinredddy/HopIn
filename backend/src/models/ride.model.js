import mongoose from "mongoose"

const rideSchema = new mongoose.Schema({
    driver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    vehicle: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehicle', 
        required: true 
    },
    from: { 
        type: String, 
        required: true 
    },
    to: { 
        type: String, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    seatsAvailable: { 
        type: Number, 
        required: true 
    },
    pricePerSeat: { 
        type: Number, 
        required: true 
    },
    bookedRiders: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ]
},{timestamps:true})

export const Ride = mongoose.model("Ride",rideSchema)