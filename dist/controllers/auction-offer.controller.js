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

var _auction = require("../models/auction.model");

var _auction2 = _interopRequireDefault(_auction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validateAuctionOffer = function validateAuctionOffer(req) {
    req.checkBody("bidder").notEmpty().withMessage("bidder Required").custom(function (value) {
        return _user2.default.findById(value).then(function (user) {
            if (!user) throw new Error("bidder user Is Not Found");
        });
    }).withMessage("bidder is Not Found in the system");

    req.checkBody("price").notEmpty().withMessage("price required").matches(/\d/).withMessage("Invalid Number");
};

exports.default = {
    create: function create(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var auctionId;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            auctionId = req.params.auctionId;

                            //  let auction = await 

                        case 1:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    }
};
//# sourceMappingURL=auction-offer.controller.js.map