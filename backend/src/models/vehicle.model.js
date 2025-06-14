import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    model:{
        type:String,
        required:true
    },
    pilot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    numberPlate:{
        type:String,
        required:true
    },
    typeOfVehicle:{
        type:String,
        enum:["car","bike"],
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    color:String,
    isVerified:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

export const Vehicle = mongoose.model("Vehicle",vehicleSchema)