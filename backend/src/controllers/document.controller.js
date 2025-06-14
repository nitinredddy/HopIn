import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Document } from "../models/document.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js"

const verifyDriver = asyncHandler(async(req,res)=>{
    const {fileType} = req.body
    const fileLocalPath = req.file.path

    if(!fileType){
        throw new ApiError(400,"Please select a file type")
    }
    if(!fileLocalPath){
        throw new ApiError(400,"Document not found")
    }

    const file = await uploadCloudinary(fileLocalPath)

    if(!file){
        throw new ApiError(500,"There was some error while uploading your ")
    }

    const existingDoc = await Document.findOne({
        user:req.user._id,
        typeOfFile:fileType
    })

    if(existingDoc){
        throw new ApiError(400,"You have already uploaded this doc")
    }

    const fileUrl = file.url

    const document = await Document.create({
        user:req.user._id,
        fileUrl:fileUrl,
        typeOfFile:fileType
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,document,"Document uploaded successfully"))
})

const getUserDocuments = asyncHandler(async(req,res)=>{
    const documents = await Document.find({user:req.user._id}).sort({createdAt:-1})
    return res
    .status(200)
    .json(new ApiResponse(200,documents,"User documents fetched successfully"))
})

//admin routes

const getAllDocuments = asyncHandler(async(req,res)=>{
    const {status} = req.query
    const filter = status ? {status} : {}
    const allDocuments = await Document.find(filter).populate("user","name email role").sort({createdAt:-1})

    return res
    .status(200)
    .json(new ApiResponse(200,allDocuments,"All documents based on given status fetched successfully"))
})

const updateDocumentVerificationStatus = asyncHandler(async(req,res)=>{
    const {docId} = req.query
    const {status} = req.body

    if (!["approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const document = await Document.findById(docId)

    if(!document){
        throw new ApiError(400,"document not found")
    }

    document.status = status

    await document.save()

    return res
    .status(200)
    .json(new ApiResponse(200,document,"Document status updated successfully"))
})

export {verifyDriver,getUserDocuments,getAllDocuments,updateDocumentVerificationStatus}