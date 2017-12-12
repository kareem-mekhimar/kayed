import mongoose from "mongoose";
import User from "../models/user.model" ;
import AuctionNotifcation from "../models/auction-notification.model";
import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";



export default {
    async findAll(req, res, next) {
        let { id } = req.params;
        const user = await User.findById(id);
        if (!user)
            return next(new ApiError.NotFound('User'));
        
         let { page, limit } = req.query;

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try {
            let notifications = await AuctionNotifcation.find({ user: req.user.id }).populate("bidder relatedAuction")
                .sort({ creationDate: -1 })
                .limit(limit)
                .skip((page - 1) * limit);

            const count = await AuctionNotifcation.count({ user: req.user.id });

            const pageCount = Math.ceil(count / limit);
            let response = new ApiResponse(notifications, page, pageCount, limit, count);
            response.addSelfLink(req);

            if (page > 1) {
                response.addPrevLink(req);
            }
            if (page < pageCount) {
                response.addNextLink(req);
            }
            res.send(response);

        } catch (err) {
            next(err);
        }
    },
    async findUnseen(req, res, next) {

        let { id } = req.params;
        const user = await User.findById(id);
        if (!user)
            return next(new ApiError.NotFound('User'));
            
            
        let notifications = await AuctionNotifcation.find({ user: req.user.id,seen:false }).populate("bidder relatedAuction")
            .sort({ creationDate: -1 })
            .limit(10);

        res.send(notifications) ;    
    },
    async reset(req, res, next) {
       
        let { id } = req.params;
        const user = await User.findById(id);
        if (!user)
            return next(new ApiError.NotFound('User'));
            
            
        await AuctionNotifcation.update({user: req.user.id,seen:false},{ seen:true }, { multi:true }) ;

        res.status(204).end() ;
    }
}

