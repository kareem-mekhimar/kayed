"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auctionOffer = require("../models/auction-offer.model");

var _auctionOffer2 = _interopRequireDefault(_auctionOffer);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateAuctionOffer = function validateAuctionOffer(req) {
    req.checkBody("bidder").notEmpty().withMessage("bidder Required").custom(function (value) {
        return _user2.default.findById(value).then(function (user) {
            if (!user) throw new Error("bidder user Is Not Found");
        });
    }).withMessage("bidder is Not Found in the system");
};

exports.default = {};
//# sourceMappingURL=auction-offer.controller.js.map