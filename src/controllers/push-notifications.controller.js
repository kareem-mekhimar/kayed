import User from "../models/user.model";
import OfferMessageNotification from "../models/offer-message-notification.model";
import { ApiResponse2 } from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import { isUserNotExist } from "../helpers/CheckMethods";
import PushNotification from '../models/push.model';
import { sendNotificationToUser } from '../helpers/PushNotificationsHelper';

const validateSubcribtion = req => {
    req.checkBody("endpoint").notEmpty().withMessage("endpoint required").custom(async value => { 
        let userSub = PushNotification.findOne({endpoint: value, relatedUser: req.user.id})
        if (userSub) 
            throw new Error("User is already subscribed");
    }).withMessage('User is already subscribed');
    req.checkBody("keys.p256dh").notEmpty().withMessage("keys.p256dh required");
    req.checkBody("keys.auth").notEmpty().withMessage("Keys.auth required");
    return req.getValidationResult();
}

export default {
    async subscribe(req, res, next) {
        console.log('BODY Of push notification: ', req.body);
        
        // const validationErrors = await validateSubcribtion(req);
        // if (!validationErrors.isEmpty())
        //     return next(new ApiError(422, validationErrors.mapped()));
        req.body.relatedUser = req.user.id;
        try {
            let pushNotification = await PushNotification.create(req.body);
            if (pushNotification) {
                console.log('Notification Saved TO DB')
                sendNotificationToUser('Welcome..' , { } , req.user.id);
            }
            else {
                console.log('Notification couldnt be saved to db.. ')
                sendNotificationToUser('HIIIIIII' , { } , req.user.id);
            }

            res.status(204).end();
        } catch(err) {
            next(err);
        }    
    },

    async unsubscribe(req, res, next) {
        await PushNotification.find({ relatedUser: req.user.id}).remove();
        req.status(204).end();
    }
}

