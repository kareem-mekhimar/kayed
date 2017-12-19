import User from "../models/user.model";
import OfferMessageNotification from "../models/offer-message-notification.model";
import { ApiResponse2 } from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import { isUserNotExist } from "../helpers/CheckMethods";
import { sendNotificationToUser } from '../helpers/PushNotificationsHelper';
import * as admin from "firebase-admin";

// const validateSubcribtion = req => {
//     req.checkBody("endpoint").notEmpty().withMessage("endpoint required").custom(async value => { 
//         let userSub = PushNotification.findOne({endpoint: value, relatedUser: req.user.id})
//         if (userSub) 
//             throw new Error("User is already subscribed");
//     }).withMessage('User is already subscribed');
//     req.checkBody("keys.p256dh").notEmpty().withMessage("keys.p256dh required");
//     req.checkBody("keys.auth").notEmpty().withMessage("Keys.auth required");
//     return req.getValidationResult();
// }

export default {
    async subscribe(req, res, next) {
        console.log('BODY Of push notification: ', req.body);
        
        try {
            await admin.database().ref('fcmTokens/').set({ [req.user.id]: req.body.token });
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

