import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Vehicle } from "../models/vehicle.model.js";
import { User } from "../models/user.model.js";

const requestToAddVehicle = asyncHandler(async(req,res)=>{
    const {typeOfVehicle,model,numberPlate,color,seats} = req.body

    const user = await User.findById(req.user._id)

    if(user.role==="backpacker"){
        throw new ApiError(400,"Only pilots can add their vehicles")
    }

    if([typeOfVehicle,model,numberPlate,color,seats].some((field)=>field.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }

    if(!["bike","car"].includes(typeOfVehicle)){
        throw new ApiError(400,"Not a valid role")
    }

    const existingVehicle = await Vehicle.findOne({numberPlate:numberPlate})

    if(existingVehicle){
        throw new ApiError(400,"This vehicle had already been registered with the company")
    }

    const vehicle = await Vehicle.create({
        pilot:user._id,
        typeOfVehicle:typeOfVehicle,
        model:model,
        color:color,
        seats:Number(seats),
        numberPlate:numberPlate
    })

    return res
    .status(200)
    .json(new ApiResponse(200,vehicle,"Vehicle request submitted successfully"))
})

const getAllVehicleRequests = asyncHandler(async(req,res)=>{
    const vehicleRequests = await Vehicle.find({isVerified:false}).populate("pilot","name email")

    return res 
    .status(200)
    .json(new ApiResponse(200,vehicleRequests,"All vehicle requests fetched successfully"))
})

const approveOrRejectVehicleRequest = asyncHandler(async(req,res)=>{
    const {vehicleId} = req.query
    const {action} = req.body

    const vehicleRequest = await Vehicle.findById(vehicleId)

    if(!vehicleRequest){
        throw new ApiError(400,"There exists no approval request for this vehicle")
    }

    if(action==="approve"){
        vehicleRequest.isVerified = true
    }
    else if(action==="reject"){
        await vehicleRequest.deleteOne()
        return res 
        .status(200)
        .json(new ApiResponse(200,null,"Vehicle request approved successfully"))
    }

    await vehicleRequest.save()

    return res
    .status(200)
    .json(new ApiResponse(200,vehicleRequest,"Vehicle request approved successfully"))
})



export {requestToAddVehicle,getAllVehicleRequests,approveOrRejectVehicleRequest}