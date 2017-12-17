import User from "../models/user.model";
import BarterOfferNotifcation from "../models/barter-offer-notification.model";
import { ApiResponse2 } from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import { checkUserExist } from '../helpers/CheckMethods';


export default {
    async findAll(req, res, next) {
        
        await checkUserExist(req.params.id, next);
        

        let { page, limit } = req.query;

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try {
            let notifications = await BarterOfferNotifcation.find({ user: req.user.id }).populate("offerUser relatedBarter")
                .sort({ creationDate: -1 })
                .limit(limit)
                .skip((page - 1) * limit);

            const notificationsCount = await BarterOfferNotifcation.count({ user: req.user.id });

            const pageCount = Math.ceil(notificationsCount / limit);
            let response = new ApiResponse2(notifications, page, pageCount, limit, notificationsCount, req);

            res.send(response);
        } catch (err) {
            next(err);
        }
    },


    async findManyUnseen(req, res, next) {

        await checkUserExist(req.params.id, next);
        

        let notifications = await BarterOfferNotifcation.find({ user: req.user.id, seen: false }).populate("offerUser relatedBarter")
            .sort({ creationDate: -1 })
            .limit(10);

        res.send(notifications);
    },

    
    async resetAll(req, res, next) {
        
        await checkUserExist(req.params.id, next);

        await BarterOfferNotifcation.update({ user: req.user.id, seen: false }, { seen: true }, { multi: true });

        res.status(204).end();
    }
}

