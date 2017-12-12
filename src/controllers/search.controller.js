import mongoose from "mongoose";
import Barter from "../models/barter.model";
import Auction from "../models/auction.model";
import { ApiResponse2 } from "../helpers/ApiResponse"
import { checkAllMyOfferAndFavouriteIn } from "../helpers/Barter&AuctionHelper";

export default {
    async search(req, res, next) {
        let { q, page, limit } = req.query;
        if (!q) {
            res.send({ barters: [], auctions: [] });
        }

        let query = {
            $text: { $search: q }
        };

        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        try {

            let barterCount = await Barter.count(query);
            let auctionCount = await Auction.count(query);

            let halfLimit = limit ? Math.ceil(limit / 2) : 5;
            let pageCount = Math.ceil(barterCount + auctionCount / limit);

            
            if (page == 1 && (barterCount < halfLimit || auctionCount< halfLimit))
                halfLimit += halfLimit - Math.min(barterCount, auctionCount)
           
            if (page > Math.ceil((Math.min(barterCount, auctionCount) / limit) * 2 ))
                halfLimit = limit;
 
            let barters = await Barter.find(query)
                .populate('relatedCategory relatedUser')
                .sort({ creationDate: -1 })
                .limit(halfLimit)
                .skip((page - 1) * limit);

            let auctions = await Auction.find(query)
                .populate('relatedCategory relatedUser')
                .sort({ creationDate: -1 })
                .limit(halfLimit)
                .skip((page - 1) * limit);

            barters = await checkAllMyOfferAndFavouriteIn(barters, req, true);
            auctions = await checkAllMyOfferAndFavouriteIn(auctions, req, false);

            let response = new ApiResponse2(undefined, page, pageCount, limit, barters.length + auctions.length, req);

            res.status(200).send({ barters, auctions, ...response });

        } catch (err) {
            next(err);
        }
    }
}

