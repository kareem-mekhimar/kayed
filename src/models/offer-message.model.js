
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OfferMessageSchema = new Schema({

    relatedUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    relatedBarterOffer: {
        type: Schema.Types.ObjectId,
        ref: 'barterOffer',
        required: true
    },
    creationDate:{
        type: Date,
        default: Date.now
    }
});


OfferMessageSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export default mongoose.model("offer-message", OfferMessageSchema);