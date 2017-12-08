import User from "../models/user.model";
import Barter from "../models/barter.model";
import Auction from "../models/auction.model";
import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";
import BarterOffer from "../models/barter-offer.model"; 
import AuctionOffer from "../models/auction-offer.model";

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

        let query = {
            relatedUser: req.user.id
        };

        let { page, limit, status } = req.query;
        
        if(status && ['PENDING','ACCEPTED','REJECTED','DONE'].includes(status))
            query.status = status;   
        
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try {
            let userBartersOffers = await BarterOffer.find(query).select('relatedBarter').populate({
                path: 'relatedBarter',
                model: 'barter',
                populate: {
                  path: 'relatedUser relatedCategory barterOffer'
                }
            })
                                        .sort({ creationDate: -1 })
                                        .limit(limit)
                                        .skip((page - 1) * limit);

            let userBartersInMyOffersCount = await BarterOffer.count(query);

            let parentBarters = [];
            let prevItem;
            for(let userBarterOffer of userBartersOffers)
            {
                if(prevItem && prevItem.relatedBarter.id  == userBarterOffer.relatedBarter.id) { 
                    userBartersInMyOffersCount--;
                    continue;
                }
                prevItem = userBarterOffer
                parentBarters.push(userBarterOffer.relatedBarter);
            }   

            parentBarters = isInAll_MyOffers_favourites(parentBarters.reverse(), req);
            
            const pageCount = Math.ceil(userBartersInMyOffersCount / limit);
            let response = new ApiResponse(parentBarters, page, pageCount, limit, userBartersInMyOffersCount);
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

    async getUserAuctionsInMyOffers(req, res, next) {
        let { id } = req.params;
        checkIfUserExist(id, next);
        let { page, limit, finished } = req.query;
        let query = {
            offerUsers: req.user.id
        };
        
        if(finished)
            query.finished = finished
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try {
            let auctionsWithMyOffer = await Auction.find(query).populate('relatedUser relatedCategory auctionOffer')
                                        .sort({ creationDate: -1 })
                                        .limit(limit)
                                        .skip((page - 1) * limit);

            const auctionsWithMyOfferCount = await Auction.count(query);

            auctionsWithMyOffer = isInAll_MyOffers_favourites(auctionsWithMyOffer, req, false);
            
            const pageCount = Math.ceil(auctionsWithMyOfferCount / limit);
            let response = new ApiResponse(auctionsWithMyOffer, page, pageCount, limit, auctionsWithMyOfferCount);
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

    async getUserWinnedAuctions(req, res, next) {
        let { id } = req.params;
        checkIfUserExist(id, next);

        let { page, limit } = req.query;
        
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 20;

        try {
            let winnedAuctions = await Auction.find({ finished: true, 'auctionOffer.bidder': req.user.id }).populate('relatedUser relatedCategory auctionOffer')
                                        .sort({ creationDate: -1 })
                                        .limit(limit)
                                        .skip((page - 1) * limit);

            const winnedAuctionsCount = await Auction.count({ finished: true, 'auctionOffer.bidder': req.user.id });

            winnedAuctions = isInAll_MyOffers_favourites(winnedAuctions, req, false);
            
            const pageCount = Math.ceil(winnedAuctionsCount / limit);
            let response = new ApiResponse(winnedAuctions, page, pageCount, limit, winnedAuctionsCount);
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