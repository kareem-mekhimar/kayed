
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const BarterOfferSchema = new Schema({
    relatedBarter: {
        type: Schema.Types.ObjectId, 
        ref: 'barter',
        required: [true, 'Id of barter is required']
    },
    relatedUser: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: [true, 'Id of user is required']
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    offeredProduct: {
        type: String,
        required: [true, 'offeredProduct is required']
    },
    imgs: {
        type: [String],
        required: [true, 'IMGS of barterOffer is required']
    },
    status: {
        type: String,
        enum : ['PENDING','ACCEPTED','REJECTED','DONE'],
        default: 'PENDING'
    }
});

BarterOfferSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

export default mongoose.model("barterOffer", BarterOfferSchema);