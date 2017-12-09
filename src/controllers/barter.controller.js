import Barter from "../models/barter.model";
import User from "../models/user.model";
import Category from "../models/category.model";
import mongoose from "mongoose" ;

import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import { handleImgs } from "../utils";
import { checkAllMyOfferAndFavouriteIn, checkMyOfferAndFavouriteIn } from "../helpers/Barter&AuctionHelper";

const validateBarter = (req, isUpdate = false) => {
    req.checkBody("title").notEmpty().withMessage("titles is Required")
    req.checkBody("description").notEmpty().withMessage("description is required");
    req.checkBody("neededProduct").notEmpty().withMessage("neededProduct is required");
    req.checkBody("relatedUser").notEmpty().withMessage("relatedUser is required").custom(async value => {
        const user = await User.findById(value);
        if(!user) throw new Error("User doesn't exist") 
    }).withMessage('User doesnt exist');
    req.checkBody("relatedCategory").notEmpty().withMessage("relatedCategory is required").custom(async value => {
        const category = await Category.findById(value);
        if (!category) throw new Error("Category doesn't exist")
    }).withMessage("Category doesn't exist");

    req.checkBody('type').optional().isIn(['TEMP', 'PERM']).withMessage("type of barter should be 'TEMP' OR 'PERM'")
    req.checkBody('finished').optional().isIn(['true','false']).withMessage("finished should be true or false");
    req.checkBody('imgs').optional().isArray().withMessage("Imgs should be an array of strings 'images 64base'");
    
    if (isUpdate)
        req.checkParams('id').custom(async value => {
            let barter = await Barter.findById(value);
            if (!barter)
                throw new Error('Barter Not Found');
        }).withMessage('Barter Not Found');

    return req.getValidationResult();
}
const checkIfValidIds = (categories, next) => { 
    for(let category of categories) {
        if(!mongoose.Types.ObjectId.isValid(category))
            return next(new ApiError.BadRequest(400, 'you have sent an invalid category id: ', category))
    }
}

export default {
    async findAll(req, res, next) {
        let { page, limit , categories , type , finished } = req.query;
        let query = {};
        
        if (categories){
            categories = categories.split(',');
            checkIfValidIds(categories, next);
            if (categories.length > 1) {
                query.relatedCategory = { $in: categories }
            }
            else query.relatedCategory = categories[0];
        }
        if (type)
            query.type = type;
        if (finished)
            query.finished = finished;

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try { 
            let barters = await Barter.find(query).populate('relatedCategory relatedUser')
                                .sort({ creationDate: -1 })
                                .limit(limit)
                                .skip((page - 1) * limit);

            const bartersCount = await Barter.count(query);
            
            const pageCount = Math.ceil(bartersCount / limit);
  
            barters = await checkAllMyOfferAndFavouriteIn(barters, req);

            let response = new ApiResponse(barters, page, pageCount, limit, bartersCount);
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

    async createBarter(req, res, next) {
        
        const validationErrors = await validateBarter(req);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));

        try {         
            const newBarterId = mongoose.Types.ObjectId();
            if (req.body.imgs)
                req.body.imgs = handleImgs(req.body.imgs, "barters", newBarterId , req);

            const createdBarter = await Barter.create({_id: newBarterId , ...req.body});               

            const barter = await Barter.findById(createdBarter.id).populate('relatedCategory relatedUser');
            
            res.status(201).send(barter);
            
        } catch (err) {
            next(err);
        }
    },

    async findById(req, res, next) {
        const { id } = req.params;
        try{
            let barter = await Barter.findById(id).populate('relatedCategory relatedUser barterOffer');
            if (!barter)
               return next(new ApiError.NotFound('Barter'));
           
            barter = await checkMyOfferAndFavouriteIn(barter, req);
            res.send(barter);
        } catch(err) {
            next(err);
        }
    },

    async updateBarter(req, res, next) {

        const validationErrors = await validateBarter(req, true);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));
        
        const { id } = req.params;
            
        try {

            if (req.body.imgs)
                req.body.imgs = handleImgs(req.body.imgs, "barters", id , req);
            
            let updatedBarter = await Barter.findByIdAndUpdate(id, req.body, { new: true }).populate('relatedCategory relatedUser barterOffer');
            updatedBarter = await checkMyOfferAndFavouriteIn(updatedBarter, req);
            res.status(200).send(updatedBarter);
        } 
        catch (err) {
            next(err)
        }
    },


    async deleteBarter(req, res, next) {
        const { id } = req.params;
        try {
            const deletedBarter = await Barter.findByIdAndRemove(id);
            if (!deletedBarter)
                return next(new ApiError.NotFound('Barter'));
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}