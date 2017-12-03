import Barter from "../models/barter.model";
import User from "../models/user.model";
import Category from "../models/category.model";

import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import { writeBase64AndReturnUrl } from "../utils";

const validateBarter = req => {
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
    return req.getValidationResult();
}

export default {
    async findAll(req, res, next) {
        let { page, limit , category , type , finished } = req.query;
        let query = {};
        
        if(category)
            query.relatedCategory = category;
        if(type)
            query.type = type;
        if(finished)
            query.finished = finished;

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try { 
            const barters = await Barter.find(query).populate('relatedCategory relatedUser')
                                .sort({ creationDate: -1 })
                                .limit(limit)
                                .skip((page - 1) * limit);
                                
            const bartersCount = await Barter.count();
            
            const pageCount = Math.ceil(bartersCount / limit);
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
            let imgs = req.body.imgs;
            delete req.body.imgs;
         
            const createdBarter = await Barter.create(req.body);               
            // handle barter imgs
            if (imgs) {
                for (let i = 0; i < imgs.length; i++) {
                    createdBarter.imgs.push(writeBase64AndReturnUrl(imgs[i], createdBarter.id + i, req));
                }
            }
            createdBarter.save();
            
            console.log('IMGs : ', createdBarter.imgs);
                        
            const barter = await Barter.findById(createdBarter.id).populate('relatedCategory relatedUser');
            
            res.status(201).send(barter);
            
        } catch (err) {
            next(err);
        }
    },

    async findById(req, res, next) {
        const { id } = req.params;
        try{
            const barter = await Barter.findById(id).populate('relatedCategory relatedUser');
            if (!barter)
               return next(new ApiError.NotFound('Barter'))        
            res.send(barter);
        } catch(err) {
            next(err);
        }
    },

    async updateBarter(req, res, next) {
        const { id } = req.params;

        const validationErrors = await validateBarter(req);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));

        try {
            let imgs = req.body.imgs;
            delete req.body.imgs;
            
            const updatedBarter = await Barter.findByIdAndUpdate(id, req.body, { new: true }).populate('relatedCategory relatedUser');
            if (!updatedBarter)
                return next(new ApiError.NotFound('Barter'));

            // handle barter imgs
            if(imgs) {
                for (let i = 0; i < imgs.length; i++) {
                    updatedBarter.imgs.push(writeBase64AndReturnUrl(imgs[i], updatedBarter.id + i, req));
                }
            }
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