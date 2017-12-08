import schedule from "node-schedule" ;

import Auction from "../models/auction.model";
import AuctionOffer from "../models/auction-offer.model";


export function start() {
        
        schedule.scheduleJob('0 0 0 * * *', async () => {
                let auctions = Auction.find({ finished:false }) ;
                
                for(let auction in auctions){
                 
                        let endDate = auction.endDate ;
                
                        if(new Date() > endDate){
                                let auctionOffer = await AuctionOffer.findOne({ relatedAuction: auction.id }).sort({ price: -1 }).limit(1)
                                
                                console.log(auctionOffer) ;
                                
                                if(auctionOffer){
                                        auction.auctionOffer = auctionOffer._id
                                        auctionOffer.winned = true;                                        
                                }
                                auction.finished = true;
                                
                                auctionOffer.save();
                                auction.save() ;
                        }
                }           
        });

}