import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    ride: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ride', 
        required: true 
    },
    rider: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    seatsBooked: { 
        type: Number, 
        required: true 
    },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    },
},{timestamps:true})

export const Booking = mongoose.model("Booking",bookingSchema)