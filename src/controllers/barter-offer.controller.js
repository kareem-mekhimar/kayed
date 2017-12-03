import Barter from "../models/barter.model";
import BarterOffer from "../models/barter-offer.model"; 
import User from "../models/user.model";

import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";

const validateBarterOffer = (req, isUpdate = false) => {
    // req.checkBody("relatedBarter").notEmpty().withMessage("relatedBarter is Required").custom(async value => {
    //     const barter = await Barter.findById(value);
    //     if(!barter) throw new Error()
    // }).withMessage('Enter a valid barter id');
    
    req.checkBody("relatedUser").notEmpty().withMessage("relatedUser is Required").custom(async value => {
        const user = await User.findById(value);
        if(!user) throw new Error()
    }).withMessage('Enter a valid user id')

    req.checkBody("description").notEmpty().withMessage("description is required");    
    req.checkBody("offeredProduct").notEmpty().withMessage("offeredProduct is required");
    req.checkBody("imgs").notEmpty().withMessage("imgs is required").isArray().withMessage("Imgs Should be an array of imgs's urls");
    if (isUpdate)
        req.checkBody("status").isIn(['PENDING','ACCEPTED','REJECTED','DONE']).withMessage('valid status is required')
    else 
        req.checkBody("status").optional().equals('PENDING').withMessage("you can't overwrite status it's PENDING by default");
    return req.getValidationResult();
}

export default {
    
    async createBarterOffer(req, res, next) {   
        const validationErrors = await validateBarterOffer(req);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));
        const { barterId } = req.params;
            
        try {
            const barter = await Barter.findById(barterId);
            if(!barter) 
                return  next(new ApiError.NotFound('Barter'));
            else
                req.body.relatedBarter = barterId;
            const createdBarterOffer = await BarterOffer.create(req.body);
            createdBarterOffer.save();
            
            const barterOffer = await BarterOffer.findById(createdBarterOffer.id).populate('relatedBarter relatedUser');
            
            res.status(201).send(barterOffer);            
        }
        catch (err) {
            next(err);
        }
    },


    async findById(req, res, next) {
        const { offerId } = req.params;

        try{
            const barterOffer = await BarterOffer.findById(offerId).populate('relatedBarter relatedUser');
            if (!barterOffer)
                return next(new ApiError.NotFound('BarterOffer'));        
            
            res.send(barterOffer);
        } catch(err) {
            next(err);
        }
    },


    async updateBarterOffer(req, res, next) {
        const { offerId } = req.params;
        
        const validationErrors = await validateBarterOffer(req, true);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));

        try {
            const barterOffer = await BarterOffer.findById(offerId).populate('relatedBarter relatedUser');
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
                await Barter.findByIdAndUpdate(req.body.relatedBarter, { 
                    barterOffer: barterOffer.id , finished: true 
                });    
            }
            const updatedBarterOffer = await BarterOffer.findByIdAndUpdate(offerId, req.body, { new: true });
            res.status(200).send(updatedBarterOffer);    
        }
        catch (err) {
            next(err);
        }
    }

}