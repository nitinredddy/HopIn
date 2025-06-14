import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    typeOfFile: { 
        type: String, 
        enum: ['driver_license', 'rc_book', 'college_id'], 
        required: true 
    },
    fileUrl: { 
        type: String, 
        required: true 
    }, 
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    }
},{timestamps:true})

export const Document = mongoose.model("Document",documentSchema)