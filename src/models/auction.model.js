
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const AuctionSchema = new Schema({
   
    title : {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    startPrice:{
       type: Number,
       required:true
    },
    highestPrice:{
       type: Number
    },
    endDate:{
        type: Date,
        required:true
    },
    relatedUser:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    relatedCategory:{
        type: Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    imgs:{
        type:[String]
    },
    auctionOffer:{
        type: Schema.Types.ObjectId,
        ref:'auction-offer'
    },
    favUsers: { 
        type: [Schema.Types.ObjectId], 
        ref: 'user'
    },
    offerUsers: {
        type: [Schema.Types.ObjectId],
        ref: 'user'
    },
    finished:{
        type: Boolean,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    }

});


AuctionSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.favUsers;
        delete ret.offerUsers;
    }
}); 

export default mongoose.model("auction",AuctionSchema);