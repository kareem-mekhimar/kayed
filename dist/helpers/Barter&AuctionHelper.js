"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isInAll_MyOffers_favourites = isInAll_MyOffers_favourites;
exports.isIn_MyOffers_favourites = isIn_MyOffers_favourites;
function isInAll_MyOffers_favourites(items, req) {
    var isBarter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var newItems = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            newItems.push(isIn_MyOffers_favourites(item, req, isBarter));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return newItems.reverse();
}

function isIn_MyOffers_favourites(item, req) {
    var isBarter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var newItem = void 0;

    var inMyFavourites = item.favUsers.some(function (favUser) {
        return favUser.equals(req.user.id);
    });

    var inMyOffers = void 0;
    if (isBarter) {
        inMyOffers = item.offerUsers.some(function (offerUser) {
            return offerUser.equals(req.user.id);
        });
    }

    newItem = _extends({}, item.toJSON(), { inMyOffers: inMyOffers, inMyFavourites: inMyFavourites });
    return newItem;
}
//# sourceMappingURL=Barter&AuctionHelper.js.map