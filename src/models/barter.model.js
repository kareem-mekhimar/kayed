import mongoose from "mongoose";
import UserSchema from "./user.model"
const Schema = mongoose.Schema;

const BarterSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title of barter is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'description of barter is required']
    },
    neededProduct: {
        type: String,
        required: [true, 'neededProduct of barter is required']
    },
    relatedUser: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: [true, 'Id of user is required']
    },
    relatedCategory: {
        type: Schema.Types.ObjectId, 
        ref: 'category',
        required: [true, 'Id of category is required']
    },
    type: {
        type: String,
        enum : ['TEMP','PERM'],
        default: 'TEMP'
    },
    imgs: {
        type: [String]
    },
    finished: {
        type: Boolean,
        default: false
    },
    barterOffer: {
        type: Schema.Types.ObjectId, 
        ref: 'barterOffer'
    },
    favUsers: { 
        type: [Schema.Types.ObjectId], 
        ref: 'user'
    },
    offerUsers: {
        type: [Schema.Types.ObjectId],
        ref: 'user'
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

BarterSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.favUsers;
        delete ret.offerUsers
    }
});

const Barter = mongoose.model('barter', BarterSchema);

export default Barter;

