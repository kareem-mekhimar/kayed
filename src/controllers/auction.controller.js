import Auction from "../models/auction.model";
import User from "../models/user.model";
import Category from "../models/category.model";
import ApiError from "../helpers/ApiError";

import { writeBase64AndReturnUrl } from "../utils";


const validateAuctionBody = req => {

    req.checkBody("relatedUser").notEmpty().withMessage("relatedUser Required")
        .custom(value => {
            return User.findById(id).then(user => {
                if (!user)
                    throw new Error("Related user Is Not Found");
            })
        }).withMessage("relatedUser is Not Found in the system");

    req.checkBody("relatedCategory").notEmpty().withMessage("relatedCategory Required")
        .custom(value => {
            return Category.findById(id).then(category => {
                if (!category)
                    throw new Error("Related category Is Not Found");
            })
        }).withMessage("relatedCategory is Not Found in the system");

    req.checkBody("title").notEmpty().withMessage("title required");
    req.checkBody("description").notEmpty().withMessage("Description required");
    req.checkBody("endDate").notEmpty().withMessage("endDate required");
    req.checkBody("startPrice").notEmpty().withMessage("startPrice required").matches(/\d/).withMessage("Invalid Number");
    req.checkBody("imgs").notEmpty().withMessage("Provide at least one image") ;

    return req.getValidationResult();
}


export default {

    async findAll(req, res, next) {
        let page = req.query.page;
        let limit = req.query.limit;

        let query = Auction.find({}).populate('relatedUser', 'relatedCategory');

        page = page ? parseInt(page) : 1;
        limit = limit ? limit : 20;

        let results = await query.sort({ _id: -1 })
            .limit(parseInt(limit))
            .skip((page - 1) * limit);

        let count = await Auction.count();

        let pageCount = Math.ceil(count / limit);
        let response = new ApiResponse(results, page, pageCount, limit, count);

        response.addSelfLink(req);

        if (page > 1) {
            response.addPrevLink(req);
        }
        if (page < pageCount) {
            response.addNextLink(req);
        }

        res.send(response);

    },

    async findById(req, res, next) {

        let id = req.params.id;
        let auction = await Auction.findById(id).populate('relatedUser', 'relatedCategory');

        if (!auction) {
            next(new ApiError(404, "Auction with this id not found"));
        } else {
            res.send(auction)
        }
    },

    async create(req, res, next) {

        let result = await validateAuctionBody(req);

        if (!result.isEmpty())
            next(new ApiError(422, result.mapped()));
        else {
            let imgs = req.body.imgs ;
            delete req.body.imgs ;

            for(let img in imgs){
                
            }
        }

    },

    async delete(req, res, next) {
        let id = req.params.id;
    },

}