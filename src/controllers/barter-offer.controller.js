import Barter from "../models/barter.model";
import BarterOffer from "../models/barter-offer.model"; 
import User from "../models/user.model";
import mongoose from "mongoose" ;
import { handleImgs }  from "../utils";

import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import { sendNotificationToUser } from '../helpers/PushNotificationsHelper';

const validateBarterOffer = (req, isUpdate = false) => {
    if (isUpdate)
        req.checkBody("status").isIn(['PENDING','ACCEPTED','REJECTED','DONE']).withMessage('valid status is required');
    else {   
        req.checkBody("relatedUser").notEmpty().withMessage("relatedUser is Required").custom(async value => {
            const user = await User.findById(value);
            if(!user) throw new Error()
        }).withMessage('Enter a valid user id')
        req.checkBody("description").notEmpty().withMessage("description is required");    
        req.checkBody("offeredProduct").notEmpty().withMessage("offeredProduct is required");
        req.checkBody("imgs").notEmpty().withMessage("imgs is required").isArray().withMessage("Imgs Should be an array of imgs's base64");
        req.checkBody("status").optional().matches('PENDING').withMessage("you can't overwrite status it's PENDING by default");
    } 
    req.checkParams("barterId").custom(async value => {
        const barter = await Barter.findById(value);
        if(!barter) new new Error();
    }).withMessage('Barter Not Found');
    
    return req.getValidationResult();
};

const registerMyOfferInBarter = async (barterId, userId) => {
    await Barter.findByIdAndUpdate(barterId, { $addToSet: { offerUsers: userId } }, { new: true });    
};

export default {
    async findAll(req, res, next) {
        let { barterId } = req.params
        let { page, limit, status } = req.query;
        let query = {
            relatedBarter: barterId
        };

        if(status && ['PENDING','ACCEPTED','REJECTED','DONE'].includes(status))
            query.status = status;            
            
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try { 
            const barterOffers = await BarterOffer.find(query).populate('relatedBarter relatedUser')
                                .sort({ creationDate: -1 })
                                .limit(limit)
                                .skip((page - 1) * limit);
                                
            const barterOffersCount = await BarterOffer.count(query);
            
            const pageCount = Math.ceil(barterOffersCount / limit);
            let response = new ApiResponse(barterOffers, page, pageCount, limit, barterOffersCount);
            response.addSelfLink(req);

            if (page > 1) {
                response.addPrevLink(req);
            }
            if (page < pageCount) {
                response.addNextLink(req);
            }
            res.send(response);
        }catch(err){
            next(err);
        }        
    },


    async createBarterOffer(req, res, next) {   
        const validationErrors = await validateBarterOffer(req);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));
       
        try {
       
            const newBarterOfferId = mongoose.Types.ObjectId();
            if (req.body.imgs)
                req.body.imgs = handleImgs(req.body.imgs, "barter-offers", newBarterOfferId , req);
            req.body.relatedBarter = barterId;
            
            let createdBarterOffer = await BarterOffer.create({_id : newBarterOfferId, ...req.body});
            
            await Barter.findByIdAndUpdate(barterId, { $push: { offerUsers: req.user.id } });

            const barterOffer = await BarterOffer.findById(createdBarterOffer.id).populate('relatedBarter relatedUser');            
            res.status(201).send(barterOffer);   

            registerMyOfferInBarter(barterId, req.user.id);
            

            let barter = await Barter.findById(req.params.barterId);
            
            let barterOfferNotification = {
                user: barter.relatedUser,
                relatedBarter: barterId,
                offerUser: req.user.id                
            };
            barterOfferNotification = await BarterOfferNotification.create(barterOfferNotification) ;
            barterOfferNotification = await BarterOfferNotification.findById(barterOfferNotification.id).populate("offerUser relatedBarter") ;
          
            let io = req.app.get('io');
            let nsp = io.of("/notifications/" + barter.relatedUser + "/barter-offers") ;
            nsp.emit("newMessage", barterOfferNotification);

            sendNotificationToUser('مقايضة جديدة',barterOfferNotification, barter.relatedUser);
        }
        catch (err) {
            next(err);
        }
    },


    async findById(req, res, next) {
        const { barterId, offerId } = req.params;

        try{
            const barterOffer = await BarterOffer.findOne({_id: offerId, relatedBarter: barterId }).populate('relatedBarter relatedUser');
            if (!barterOffer)
                return next(new ApiError.NotFound('BarterOffer'));        
            
            res.send(barterOffer);
        } catch(err) {
            next(err);
        }
    },

    // Update Status of BarterOffer only
    async updateBarterOffer(req, res, next) {
        const validationErrors = await validateBarterOffer(req, true);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));
        
        const { barterId, offerId } = req.params;
        try {
            const barterOffer = await BarterOffer.findOne({ _id : offerId , relatedBarter: barterId } ).populate('relatedUser');
            if(!barterOffer)
                return next(new ApiError.NotFound('BarterOffer'));
    
            switch(barterOffer.status){
                case 'PENDING':
                    if (!(req.body.status === 'ACCEPTED' || req.body.status === 'REJECTED'))
                        return next(new ApiError(400, 'status should be ACCEPTED or REJECTED'));
                    break;
                case 'ACCEPTED':
                    if (!(req.body.status === 'DONE' || req.body.status === 'REJECTED'))
                        return next(new ApiError(400, 'status should be DONE or REJECTED'));
                    break;
                case 'REJECTED':
                case 'DONE':
                    return next(new ApiError(400, "you can't update DONE or REJECTED offer"));
                    break;
            }

            if (req.body.status === 'DONE'){
                await Barter.findByIdAndUpdate(barterId, {
                    barterOffer: barterOffer.id , finished: true 
                });
            }

            // if (req.body.status === 'REJECTED'){
            //     let barter = await Barter.findById(barterId);
            //     barter.offerUsers = barter.offerUsers.filter(user => { 
            //         user != barterOffer.relatedUser.id });
            //     console.log("Rejected offer in :" , barter);
            //     barter.save();
            // }

            const updatedBarterOffer = await BarterOffer.findByIdAndUpdate(offerId, { status: req.body.status} , { new: true });
            res.status(200).send(updatedBarterOffer);    
        }
        catch (err) {
            next(err);
        }
    }

}