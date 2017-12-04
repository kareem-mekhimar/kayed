import AuctionOffer from "../models/auction-offer.model" ;
import User from "../models/user.model";
import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";

const validateAuctionOffer = req => {
    req.checkBody("bidder").notEmpty().withMessage("bidder Required")
    .custom(value => {
        return User.findById(value).then(user => {
            if (!user)
                throw new Error("bidder user Is Not Found");
        })
    }).withMessage("bidder is Not Found in the system");
};


export default {
      
}