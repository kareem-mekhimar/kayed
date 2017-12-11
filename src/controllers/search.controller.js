import mongoose from "mongoose" ;
import Barter from "../models/barter.model";
import Auction from "../models/auction.model";

import { checkAllMyOfferAndFavouriteIn } from "../helpers/Barter&AuctionHelper";

export default {
    async search(req, res, next) {
        let { q } = req.query;
        if (!q) {
            res.send({ barters: [] , auctions: [] });
        }

        let query = { 
            $text: { $search: q }
        };

        try{ 
            let barters = await Barter.find(query)
                                    .populate('relatedCategory relatedUser')
                                    .sort({ creationDate: -1 })
                                    .limit(10);

            let auctions = await Auction.find(query)
                                    .populate('relatedCategory relatedUser')
                                    .sort({ creationDate: -1})
                                    .limit(10);
            
            barters = await checkAllMyOfferAndFavouriteIn(barters, req, true);
            auctions = await checkAllMyOfferAndFavouriteIn(auctions, req, false);

            res.status(200).send({ barters , auctions })
            
        } catch(err) {
            next(err);
        }

    }
}

