import User from "../models/user.model";
import Barter from "../models/barter.model";
import Auction from "../models/auction.model";

import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import jwt from "jsonwebtoken";
import config from "../config";
import { writeBase64AndReturnUrl } from "../utils";

const { jwtSecret } = config;


const generateToken = id => {

    return jwt.sign({
        sub: id,
        iss: 'App',
        iat: new Date().getTime(),
        expiresIn: 604800000
    }, jwtSecret)
}


const validateUserBody = (req, isUpdate = false) => {
    if(isUpdate) {
        req.checkBody("email").notEmpty().withMessage("Email Required")
        .custom(async value => {
            if (req.user.email !== value) {
                const user = await User.findOne({ email: value, _id: { $ne: req.user._id } })
                if (user)
                    throw new Error("email already taken");
            }
        }).withMessage("email already taken");
    } else {
        req.checkBody("email").notEmpty().withMessage("Email Required")
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user)
                    throw new Error("email already exists");
            })
        }).withMessage("email already exists");
    }
    req.checkBody("password").notEmpty().withMessage("Password required");
    req.checkBody("phone").notEmpty().withMessage("Phone required");
    req.checkBody("fullName").notEmpty().withMessage("FullName required");
    req.checkBody("country").notEmpty().withMessage("Country required");

    return req.getValidationResult();
}

const checkIfUserExist = async (id, next)  => {
    const user = await User.findById(id);
    if(!user)
        return next(new ApiError.NotFound('User'));
}

export default {

    async signUp(req, res, next) {
        const validationErrors = await validateUserBody(req);
        
        if (!validationErrors.isEmpty())
            next(new ApiError(422, validationErrors.mapped()));
        else {

            let img = req.body.img;
            delete req.body.img;

            User.create(req.body).then(user => {

                let id = user.id;
                if (img) {
                    user.img = writeBase64AndReturnUrl(img, "users/"+id, req);
                    user.save();
                }
                res.status(201).send({ user, token: generateToken(id) });
            });
        }

    },


    async signIn(req, res, next) {
        let user = req.user;
        res.status(200).send({ user, token: generateToken(user.id) });
    },


    async updateUser(req, res, next) {

        const validationErrors = await validateUserBody(req, true);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));
        
        const { id } = req.params;
        checkIfUserExist(id, next);

        try {
            let img = req.body.img;
            delete req.body.img;

            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedUser)
                return next(new ApiError.NotFound('User'));

            if (img) {
                updatedUser.img = writeBase64AndReturnUrl(img, id, req);
                updatedUser.save();
            }

            res.status(200).send({ user: updatedUser });
           
        } catch (err) {
            next(err)
        }
    },


    async getUserBarters(req, res, next) {
        let { id } = req.params;
        checkIfUserExist(id, next);
        
        let { page, limit } = req.query;
        
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try { 
            const userBarters = await Barter.find({ relatedUser: id}).populate('relatedCategory relatedUser')
                                .sort({ creationDate: -1 })
                                .limit(limit)
                                .skip((page - 1) * limit);
            
            const userBartersCount = await Barter.count({ relatedUser : id});
            
            const pageCount = Math.ceil(userBartersCount / limit);
            let response = new ApiResponse(userBarters, page, pageCount, limit, userBartersCount);
            response.addSelfLink(req);

            if (page > 1) {
                response.addPrevLink(req);
            }
            if (page < pageCount) {
                response.addNextLink(req);
            }
            res.send(response);
        } catch(err){
            next(err);
        }
    },


    async getUserAuctions(req, res, next) {
        let { id } = req.params;
        checkIfUserExist(id, next);
        
        let { page, limit } = req.query;
        
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try { 
            const userAuctions = await Auction.find({ relatedUser: id }).populate('relatedCategory relatedUser')
                                .sort({ creationDate: -1 })
                                .limit(limit)
                                .skip((page - 1) * limit);
                                
            const userAuctionsCount = await Auction.count({ relatedUser : id});
            
            const pageCount = Math.ceil(userAuctionsCount / limit);
            let response = new ApiResponse(userAuctions, page, pageCount, limit, userAuctionsCount);
            response.addSelfLink(req);

            if (page > 1) {
                response.addPrevLink(req);
            }
            if (page < pageCount) {
                response.addNextLink(req);
            }
            res.send(response);
        } catch(err){
            next(err);
        }
    }
}
