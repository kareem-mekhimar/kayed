
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const BarterOfferSchema = new Schema({
  
});

// BarterOfferSchema.set('toJSON', {
//     transform: function (doc, ret, options) {
//         ret.id = ret._id;
//         delete ret._id;
//         delete ret.__v;
//     }
// }); 

export default mongoose.model("barterOffer", BarterOfferSchema);