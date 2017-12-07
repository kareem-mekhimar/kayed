
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const FavAuctionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: [true, 'Id of user is required']
    },
    auction: {
        type: Schema.Types.ObjectId, 
        ref: 'auction',
        required: [true, 'Id of auction is required']
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

FavAuctionSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

export default mongoose.model("fav-auction", FavAuctionSchema);