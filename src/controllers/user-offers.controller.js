import User from "../models/user.model";
import Barter from "../models/barter.model";
import Auction from "../models/auction.model";
import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import { isInAll_MyOffers_favourites, isIn_MyOffers_favourites } from "../helpers/Barter&AuctionHelper";

const checkIfUserExist = async (id, next) => {
    const user = await User.findById(id);
    if(!user)
        return next(new ApiError.NotFound('User'));
}

export default {

    async getUserBartersInMyOffers(req, res, next) {
        let { id } = req.params;
        checkIfUserExist(id, next);

        let { page, limit, status } = req.query;
        
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try {
            let userBartersInMyOffers = await Barter.find({ offerUsers: id }).populate('relatedCategory relatedUser')
                                .sort({ creationDate: -1 })
                                .limit(limit)
                                .skip((page - 1) * limit);
            
            const userBartersInMyOffersCount = await Barter.count({ offerUsers: id });
            
            userBarters = isInAll_MyOffers_favourites(userBarters, req);

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
    }
}    