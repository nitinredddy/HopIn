import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async(userId)=>{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken=refreshToken
    await user.save()

    return {accessToken,refreshToken}
}

const signup = asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        throw new ApiError(400,"Both fields are required")
    }

    const existingUser = await User.findOne({email:email})

    if(existingUser){
        throw new ApiError(400,"User with this email already exists")
    }

    const user = await User.create({
        email:email,
        password:password
    })

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly:true,
        sameSite:"strict",
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,user,"User created successfully"))
})

const selectRole = asyncHandler(async(req,res)=>{
    const {role} = req.body

    const user = await User.findById(req.user._id)

    if(role==="pilot"){
        user.role="pilot"
    }
    else{
        user.role='backpacker'
    }

    await user.save()

    return res 
    .status(200)
    .json(new ApiResponse(200,user,"User role updated successfully"))
})

const updateProfile = asyncHandler(async(req,res)=>{
    const {name,contact} = req.body

    const user = await User.findById(req.user._id)

    if(!contact){
        throw new ApiError(400,"Please provide a phone number")
    }

    if(name){
        user.name=name
    }
    user.contact=contact

    await user.save()

    return res
    .status(200)
    .json(new ApiResponse(200,user,"user details updated"))
})

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        throw new ApiError(400,"Both fields are required")
    }

    const existingUser = await User.findOne({email:email})

    if(!existingUser){
        throw new ApiError(400,"No user found with this email.Please signup")
    }

    const validPasswordCheck = await existingUser.checkPassword(password)

    if(!validPasswordCheck){
        throw new ApiError(400,"Incorrect password")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(existingUser._id)

    const options = {
        httpOnly:true,
        sameSite:"strict",
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,existingUser,"User logged in successfully"))
})

const logout = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $unset:{refreshToken:1}
    },
    {
        new:true
    }
    )

    const options = {
        httpOnly:true,
        secure:true,
        sameSite:"strict"
    }

    res.clearCookie("accessToken",options)
    res.clearCookie("refreshToken",options)

    return res
    .status(200)
    .json(new ApiResponse(200,null,"User logged out successfully"))
})

export {signup,selectRole,updateProfile,login,logout}