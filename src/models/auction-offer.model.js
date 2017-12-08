
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const AuctionOfferSchema = new Schema({

    bidder:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    relatedAuction:{
        type: Schema.Types.ObjectId,
        ref:"auction",
        required:true
    },
    winned: {
        type: Boolean,
        default: false
    }

}) ;


AuctionOfferSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

export default mongoose.model("auction-offer",AuctionOfferSchema);