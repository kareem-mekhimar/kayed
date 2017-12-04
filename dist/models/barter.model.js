'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var BarterSchema = new Schema({
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
        enum: ['TEMP', 'PERM'],
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
    creationDate: {
        type: Date,
        default: Date.now
    }
});

BarterSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

var Barter = _mongoose2.default.model('barter', BarterSchema);

exports.default = Barter;
//# sourceMappingURL=barter.model.js.map