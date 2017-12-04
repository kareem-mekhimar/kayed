import Auction from "../models/auction.model";
import AuctionOffer from "../models/auction-offer.model"
import User from "../models/user.model";
import Category from "../models/category.model";
import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";

import { writeBase64AndReturnUrl } from "../utils";


const validateAuctionBody = req => {

    req.checkBody("relatedUser").notEmpty().withMessage("relatedUser Required")
        .custom(value => {
            return User.findById(value).then(user => {
                if (!user)
                    throw new Error("Related user Is Not Found");
            })
        }).withMessage("relatedUser is Not Found in the system");

    req.checkBody("relatedCategory").notEmpty().withMessage("relatedCategory Required")
        .custom(value => {
            return Category.findById(value).then(category => {
                if (!category)
                    throw new Error("Related category Is Not Found");
            })
        }).withMessage("relatedCategory is Not Found in the system");

    req.checkBody("title").notEmpty().withMessage("title required");
    req.checkBody("description").notEmpty().withMessage("Description required");
    req.checkBody("endDate").notEmpty().withMessage("endDate required");
    req.checkBody("startPrice").notEmpty().withMessage("startPrice required").matches(/\d/).withMessage("Invalid Number");
    req.checkBody("imgs").notEmpty().withMessage("Provide at least one image");

    return req.getValidationResult();
}


export default {

    async findAll(req, res, next) {
        let page = req.query.page;
        let limit = req.query.limit;
        let category = req.query.category;
        let startPrice = req.query.startPrice;
        let endPrice = req.query.endPrice;
        let finished = req.query.finished;

        if (startPrice && endPrice) {
            if (endPrice < startPrice)
                return next(new ApiError(400, "startPrice Can't be more than endPrice"));
        }


        let findQuery = Auction.find({});
        let countQuery = Auction.count();

        if (category) {
            findQuery.where("relatedCategory").equals(category);
            countQuery.where("relatedCategory").equals(category);
        }

        if (startPrice) {
            findQuery.where("highestPrice").gte(startPrice);
            countQuery.where("highestPrice").gte(startPrice);
        }


        if (endPrice) {
            findQuery.where("highestPrice").lte(endPrice);
            countQuery.where("highestPrice").gte(endPrice);
        }


        if (typeof finished !== 'undefined') {
            findQuery.where("finished").equals(finished);
            countQuery.where("finished").equals(finished)
        }

        findQuery.populate('relatedUser relatedCategory');

        page = page ? parseInt(page) : 1;
        limit = limit ? limit : 20;

        let results = await findQuery.sort({ creationDate: -1 })
            .limit(parseInt(limit))
            .skip((page - 1) * limit);

        let count = await countQuery

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
        let auction = await Auction.findById(id).populate('relatedUser relatedCategory');

        if (!auction) {
            next(new ApiError(404, "Auction with this id not found"));
        } else {

            auction = { ...auction.toJSON() }
            let count  = await AuctionOffer.count({ relatedAuction: id }) ;
            auction.offersCount = count ;


            let topAuctionOffers = await AuctionOffer.find({ relatedAuction: id }).sort({ price: -1 }).limit(3).populate("bidder");
            let topBids = {}
            if (topAuctionOffers && topAuctionOffers.length > 0) {
                for (let i = 0 ; i < topAuctionOffers.length ; i++) {       
                    topBids[i+1] = { 
                        bidderName: topAuctionOffers[i].bidder.fullName,
                        bidderImg: topAuctionOffers[i].bidder.img ,
                        price: topAuctionOffers[i].price
                     }
                }

                auction.topBids = topBids ;
            }
            
            res.send(auction)
        }
    },

    async create(req, res, next) {

        let result = await validateAuctionBody(req);

        if (!result.isEmpty())
            next(new ApiError(422, result.mapped()));
        else {

            try {
                let imgs = req.body.imgs;
                delete req.body.imgs;

                req.body.highestPrice = req.body.startPrice;

                let auction = await Auction.create(req.body);

                for (let i = 0; i < imgs.length; i++) {
                    let url = writeBase64AndReturnUrl(imgs[i], "auctions/" + auction.id + new Date().getTime(), req);
                    auction.imgs.push(url);
                }

                await auction.save();

                res.status(201).send(auction);

            } catch (error) {
                next(error)
            }
        }

    },

    async delete(req, res, next) {
        let id = req.params.id;

        let auction = await Auction.findById(id);

        if (!auction)
            next(new ApiError(404, "Auction with this id not found"));
        else {
            auction.remove();
            res.status(204).end();
        }

    },

}