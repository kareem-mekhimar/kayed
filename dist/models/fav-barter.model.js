'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var FavBarterSchema = new Schema({
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
});

FavBarterSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

exports.default = _mongoose2.default.model("fav-barter", FavBarterSchema);
//# sourceMappingURL=fav-barter.model.js.map