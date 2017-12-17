
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const BarterOfferNotificationSchema = new Schema({
   
    user:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    offerUser:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    relatedBarter:{
        type: Schema.Types.ObjectId,
        ref:"barter",
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


BarterOfferNotificationSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

export default mongoose.model("barter-offer-notification", BarterOfferNotificationSchema);