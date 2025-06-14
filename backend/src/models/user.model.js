import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["pilot","backpacker"],
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    isVerifiedDriver:{
        type:Boolean,
        default:false
    },
    refreshToken:String
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        next()
    }
    else{
        return next()
    }
})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            role:this.role  
        },
        process.env.ACCESS_SECRET,
        {
            expiresIn:process.env.ACCESS_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            role:this.role
        },
        process.env.REFRESH_SECRET,
        {
            expiresIn:process.env.REFRESH_EXPIRY
        }
    )
}

userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema)