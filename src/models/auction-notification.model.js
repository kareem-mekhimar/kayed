
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const AuctionNotificationSchema = new Schema({
   
    user:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    bidder:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    relatedAuction:{
        type: Schema.Types.ObjectId,
        ref:"auction",
        required:true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    seen:{
       type:Boolean,
       default:false
    }
}) ;


AuctionNotificationSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

export default mongoose.model("auction-notification",AuctionNotificationSchema);