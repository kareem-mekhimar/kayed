'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AuctionSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startPrice: {
        type: Number,
        required: true
    },
    highestPrice: {
        type: Number
    },
    endDate: {
        type: Date,
        required: true
    },
    relatedUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    relatedCategory: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    imgs: {
        type: [String]
    },
    auctionOffer: {
        type: Schema.Types.ObjectId,
        ref: 'auction-offer'
    },
    finished: {
        type: Boolean,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    }

});

AuctionSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

exports.default = _mongoose2.default.model("auction", AuctionSchema);
//# sourceMappingURL=auction.model.js.map