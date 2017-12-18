import ApiError from "../helpers/ApiError";
import User from "../models/user.model";

export function isUserNotExist(userId) {
    return User.findById(userId).then(user => {
        if (user) return false;
        else return true;
    }, err => true)
}

