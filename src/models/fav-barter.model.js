
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const FavBarterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: [true, 'Id of user is required']
    },
    barter: {
        type: Schema.Types.ObjectId, 
        ref: 'barter',
        required: [true, 'Id of barter is required']
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

FavBarterSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
    }
}); 

export default mongoose.model("fav-barter", FavBarterSchema);
