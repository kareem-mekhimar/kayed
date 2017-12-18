import User from "../models/user.model";
import Barter from "../models/barter.model";
import Auction from "../models/auction.model";
import FavBarter from "../models/fav-barter.model";
import FavAuction from "../models/fav-auction.model";
import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import jwt from "jsonwebtoken";
import config from "../config";
import { writeBase64AndReturnUrl, isValidImgUrl } from "../utils";
import { checkAllMyOfferAndFavouriteIn, checkMyOfferAndFavouriteIn } from "../helpers/Barter&AuctionHelper";

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
    if (isUpdate) {
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


const checkIfUserExist = async (id, next) => {
    const user = await User.findById(id);
    if (!user)
        return next(new ApiError.NotFound('User'));
}

const registerAsMyFavourite = async (itemId, userId, isBarter=true) => {
    if (isBarter)
        await Barter.findByIdAndUpdate(itemId, { $addToSet: { favUsers: userId } });    
    else
        await Auction.findByIdAndUpdate(itemId, { $addToSet: { favUsers: userId } });    
};

const UnRegisterAsMyFavourite = async (itemId, userId, isBarter=true) => {
    if (isBarter)
        await Barter.findByIdAndUpdate(itemId, { '$pull': { favUsers: userId } });
    else
        await Auction.findByIdAndUpdate(itemId, { '$pull': { favUsers: userId } });
};

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
                    user.img = writeBase64AndReturnUrl(img, "users/" + id, req);
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


    async findById(req, res, next) {
        const { id } = req.params;

        let user = await User.findById(id);
        if (!user)
            return next(new ApiError.NotFound("User"));

        res.send(user);
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
                if(!isValidImgUrl(img))
                {
                    updatedUser.img = writeBase64AndReturnUrl(img, "users/" + id, req);
                    updatedUser.save();
                }
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
            let userBarters = await Barter.find({ relatedUser: id }).populate('relatedCategory relatedUser barterOffer')
                                .sort({ creationDate: -1 })
                                .limit(limit)
                                .skip((page - 1) * limit);
            
            const userBartersCount = await Barter.count({ relatedUser : id});
            
            userBarters = await checkAllMyOfferAndFavouriteIn(userBarters, req);

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
        } catch (err) {
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
            let userAuctions = await Auction.find({ relatedUser: id }).populate('relatedCategory relatedUser auctionOffer')
                                .sort({ creationDate: -1 })
                                .limit(limit)
                                .skip((page - 1) * limit);
                                
            const userAuctionsCount = await Auction.count({ relatedUser : id});
            
            userAuctions = await checkAllMyOfferAndFavouriteIn(userAuctions, req, false);

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
        } catch (err) {
            next(err);
        }
    },


    async getUserFavoriteBarters(req, res, next) {
        let { id } = req.params;
        checkIfUserExist(id, next);

        let { page, limit } = req.query;

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try { 
            const userFavBarters = await FavBarter.find({ user: req.user.id }).select('barter').populate({
                path: 'barter',
                model: 'barter',
                populate: {
                    path: 'relatedUser relatedCategory barterOffer'
                }
            })
            .sort({ creationDate: -1 })
            .limit(limit)
            .skip((page - 1) * limit);
            
            const userFavBartersCount = await FavBarter.count({ user : id });
                        
            const pageCount = Math.ceil(userFavBartersCount / limit);
            let response = new ApiResponse(userFavBarters, page, pageCount, limit, userFavBartersCount);
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


    async getUserFavoriteAuctions(req, res, next) {
        let { id } = req.params;
        checkIfUserExist(id, next);

        let { page, limit } = req.query;

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try { 
            let userFavAuctions = await FavAuction.find({ user: req.user.id }).select('auction').populate({
                path: 'auction',
                model: 'auction',
                populate: {
                  path: 'relatedUser relatedCategory auctionOffer'
                }
            })
                .sort({ creationDate: -1 })
                .limit(limit)
                .skip((page - 1) * limit);

            const userFavAuctionsCount = await FavAuction.count({ user: id });

            const pageCount = Math.ceil(userFavAuctionsCount / limit);
            let response = new ApiResponse(userFavAuctions, page, pageCount, limit, userFavAuctionsCount);
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

    async updateFavBarter(req, res, next) {
        const { id } = req.params;
        checkIfUserExist(id, next);

        if (!req.body.barter) {
            return next(new ApiError(422, 'barter is required'))
        };

        try {
            const barter = await Barter.findById(req.body.barter);
            if (!barter)
                return next(new ApiError.NotFound('Barter'))
            
            const userFavBarter = await FavBarter.findOne({ user: req.user.id , barter: barter.id });
            if (!userFavBarter) {
                registerAsMyFavourite(barter.id, req.user.id);
    
                const createdUserFavBarter = await FavBarter.create({ user: req.user.id , barter: req.body.barter });
                res.status(200).send(createdUserFavBarter);
            }
            
            // Already Exist Nothing to do..
            res.send();
        }
        catch (err) {
            next(err);
        }
    },


    async updateFavAuction(req, res, next) {
        const { id } = req.params;
        checkIfUserExist(id, next);

        if (!req.body.auction) {
            return next(new ApiError(422, 'auction is required'))
        };

        try {
            const auction = await Auction.findById(req.body.auction);
            if (!auction)
                return next(new ApiError.NotFound('Auction'))

            const userFavAuction = await FavAuction.findOne({ user: req.user.id , auction: auction.id });
            if (!userFavAuction) {
                registerAsMyFavourite(auction.id, req.user.id, false);
                
                const createdUserFavAuction= await FavAuction.create({ user: req.user.id , auction: req.body.auction });
                res.status(200).send(createdUserFavAuction);
            }
            
            // Already Exist Nothing to do..
            res.send();
        }
        catch (err) {
            next(err);
        }
    },

    async deleteFavBarter(req, res, next) {
        const { id, barterId } = req.params;
        try {
            const deletedFavBarter = await FavBarter.findOne({ user: id, barter: barterId }).remove();
            if (!deletedFavBarter)
                return next(new ApiError.NotFound('User FavouriteBarter'));
           
            UnRegisterAsMyFavourite(barterId, req.user.id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    },


    async deleteFavAuction(req, res, next) {
        const { id, auctionId } = req.params;
        try {
            const deletedFavAuction = await FavAuction.findOne({ user: id, auction: auctionId }).remove();
            if (!deletedFavAuction)
                return next(new ApiError.NotFound('User FavouriteAuction'));
            
            UnRegisterAsMyFavourite(auctionId, req.user.id, false);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}
