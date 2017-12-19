import User from "../models/user.model";
import OfferMessageNotification from "../models/offer-message-notification.model";
import { ApiResponse2 } from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import { isUserNotExist } from "../helpers/CheckMethods";

export default {
    async findAll(req, res, next) {
        if(await isUserNotExist(req.params.id))
            return next(new ApiError.NotFound('User'));
        
        let { page, limit } = req.query;

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try {
            let notifications = await OfferMessageNotification.find({ user: req.user.id }).populate("fromUser")
                .sort({ creationDate: -1 })
                .limit(limit)
                .skip((page - 1) * limit);

            const notificationsCount = await OfferMessageNotification.count({ user: req.user.id });

            const pageCount = Math.ceil(notificationsCount / limit);
            let response = new ApiResponse2(notifications, page, pageCount, limit, notificationsCount, req);

            res.send(response);
        } catch (err) {
            next(err);
        }
    },


    async findManyUnseen(req, res, next) {

        if(await isUserNotExist(req.params.id))
            return next(new ApiError.NotFound('User'));        

        let notifications = await OfferMessageNotification.find({ user: req.user.id, seen: false }).populate("fromUser")
            .sort({ creationDate: -1 })
            .limit(10);

        res.send(notifications);
    },

    
    async resetAll(req, res, next) {
        
        if(await isUserNotExist(req.params.id))
            return next(new ApiError.NotFound('User'));    

        await OfferMessageNotification.update({ user: req.user.id, seen: false }, { seen: true }, { multi: true });

        res.status(204).end();
    }
}

