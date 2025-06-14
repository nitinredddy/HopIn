import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'


export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ","")

        if(!token){
            throw new ApiError(400,"Unauthorised access")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(400,"Invalid accessToken")
        }

        req.user=user
        next()
    } catch (error) {
        throw new ApiError(400,error?.message||"Invalid access token")
    }
})