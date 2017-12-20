import User from "../models/user.model";
import OfferMessageNotification from "../models/offer-message-notification.model";
import { ApiResponse2 } from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import { isUserNotExist } from "../helpers/CheckMethods";
import { sendNotificationToUser } from '../helpers/PushNotificationsHelper';
import * as admin from "firebase-admin";

export default {
    async subscribe(req, res, next) {
        let { token } = req.body;
        if(!token)
            return next(new ApiError.NotFound('Token'));
        
        try {
            await admin.database().ref('fcmTokens').child(req.user.id).set(token);
            res.status(204).end();
        } catch(err) {
            next(err);
        }    
    },


    async unsubscribe(req, res, next) {
        try{
            await admin.database().ref('fcmTokens/' + req.user.id ).remove()
            req.status(204).end();
        } catch(err) {
            next(err);
        }
    }
}

