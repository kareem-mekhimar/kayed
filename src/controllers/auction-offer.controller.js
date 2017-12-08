import AuctionOffer from "../models/auction-offer.model";
import User from "../models/user.model";
import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import Auction from "../models/auction.model";

const validateAuctionOfferBody = (req, highestPrice) => {
    req.checkBody("bidder").notEmpty().withMessage("bidder Required")
        .custom(value => {
            return User.findById(value).then(user => {
                if (!user)
                    throw new Error("bidder user Is Not Found");
            })
        }).withMessage("bidder is Not Found in the system");

    req.checkBody("price")
        .notEmpty().withMessage("price required")
        .matches(/\d/).withMessage("Invalid Number")
        .custom(value => highestPrice < value).withMessage("price must be more than highest price");

    return req.getValidationResult();

};

const registerMyOfferInAuction = async (auctionId, userId) => {
    await Auction.findByIdAndUpdate(auctionId, { $addToSet: { offerUsers: userId } }, { new: true });    
};

export default {

    async create(req, res, next) {

        let auctionId = req.params.auctionId;

        let auction = await Auction.findById(auctionId);
        if (!auction)
            next(new ApiError(404, "Auction Not Found"));

        else {
            let result = await validateAuctionOfferBody(req, auction.highestPrice);

            if (!result.isEmpty())
                next(new ApiError(422, result.mapped()));
            else {
                if(req.body.winned)
                    return next(new ApiError(403, "You aren't allowed to overwrite this field"));

                req.body.relatedAuction = auctionId;
                let offer = await AuctionOffer.create(req.body);

                auction.highestPrice = offer.price;
                auction.save();

                registerMyOfferInAuction(auctionId, req.user.id);

                offer = await AuctionOffer.findById(offer.id).populate("bidder relatedAuction");
                res.status(201).send(offer);
            }
        }

    },

}