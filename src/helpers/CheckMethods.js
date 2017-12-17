import ApiError from "../helpers/ApiError";
import User from "../models/user.model";
import mongoose from "mongoose" ;


export async function checkUserExist(id, next) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        const user = await User.findById(id);
        if (user) return;       
    }
    
    next(new ApiError.NotFound('User'));
}

