"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _barter = require("../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

var _auction = require("../models/auction.model");

var _auction2 = _interopRequireDefault(_auction);

var _BarterAuctionHelper = require("../helpers/Barter&AuctionHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    search: function search(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var q, query, barters, auctions;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            q = req.query.q;

                            if (!q) {
                                res.send({ barters: [], auctions: [] });
                            }

                            query = {
                                $text: { $search: q }
                            };
                            _context.prev = 3;
                            _context.next = 6;
                            return _barter2.default.find(query).populate('relatedCategory relatedUser').sort({ creationDate: -1 }).limit(10);

                        case 6:
                            barters = _context.sent;
                            _context.next = 9;
                            return _auction2.default.find(query).populate('relatedCategory relatedUser').sort({ creationDate: -1 }).limit(10);

                        case 9:
                            auctions = _context.sent;
                            _context.next = 12;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(barters, req, true);

                        case 12:
                            barters = _context.sent;
                            _context.next = 15;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(auctions, req, false);

                        case 15:
                            auctions = _context.sent;


                            res.status(200).send({ barters: barters, auctions: auctions });

                            _context.next = 22;
                            break;

                        case 19:
                            _context.prev = 19;
                            _context.t0 = _context["catch"](3);

                            next(_context.t0);

                        case 22:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[3, 19]]);
        }))();
    }
};
//# sourceMappingURL=search.controller.js.map