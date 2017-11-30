
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const AuctionOfferSchema = new Schema({}) ;


export default mongoose.model("auction-offer",AuctionOfferSchema);