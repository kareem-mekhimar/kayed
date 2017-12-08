"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _barter = require("../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

var _auction = require("../models/auction.model");

var _auction2 = _interopRequireDefault(_auction);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _barterOffer = require("../models/barter-offer.model");

var _barterOffer2 = _interopRequireDefault(_barterOffer);

var _auctionOffer = require("../models/auction-offer.model");

var _auctionOffer2 = _interopRequireDefault(_auctionOffer);

var _BarterAuctionHelper = require("../helpers/Barter&AuctionHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var checkIfUserExist = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, next) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _user2.default.findById(id);

                    case 2:
                        user = _context.sent;

                        if (user) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function checkIfUserExist(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    getUserBartersInMyOffers: function getUserBartersInMyOffers(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var id, query, _req$query, page, limit, status, userBartersOffers, userBartersInMyOffersCount, parentBarters, prevItem, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userBarterOffer, pageCount, response;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            query = {
                                relatedUser: req.user.id
                            };
                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit, status = _req$query.status;


                            if (status && ['PENDING', 'ACCEPTED', 'REJECTED', 'DONE'].includes(status)) query.status = status;

                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context2.prev = 7;
                            _context2.next = 10;
                            return _barterOffer2.default.find(query).select('relatedBarter').populate({
                                path: 'relatedBarter',
                                model: 'barter',
                                populate: {
                                    path: 'relatedUser relatedCategory barterOffer'
                                }
                            }).sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 10:
                            userBartersOffers = _context2.sent;
                            _context2.next = 13;
                            return _barterOffer2.default.count(query);

                        case 13:
                            userBartersInMyOffersCount = _context2.sent;
                            parentBarters = [];
                            prevItem = void 0;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 19;
                            _iterator = userBartersOffers[Symbol.iterator]();

                        case 21:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context2.next = 31;
                                break;
                            }

                            userBarterOffer = _step.value;

                            if (!(prevItem && prevItem.relatedBarter.id == userBarterOffer.relatedBarter.id)) {
                                _context2.next = 26;
                                break;
                            }

                            userBartersInMyOffersCount--;
                            return _context2.abrupt("continue", 28);

                        case 26:
                            prevItem = userBarterOffer;
                            parentBarters.push(userBarterOffer.relatedBarter);

                        case 28:
                            _iteratorNormalCompletion = true;
                            _context2.next = 21;
                            break;

                        case 31:
                            _context2.next = 37;
                            break;

                        case 33:
                            _context2.prev = 33;
                            _context2.t0 = _context2["catch"](19);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 37:
                            _context2.prev = 37;
                            _context2.prev = 38;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 40:
                            _context2.prev = 40;

                            if (!_didIteratorError) {
                                _context2.next = 43;
                                break;
                            }

                            throw _iteratorError;

                        case 43:
                            return _context2.finish(40);

                        case 44:
                            return _context2.finish(37);

                        case 45:

                            parentBarters = (0, _BarterAuctionHelper.isInAll_MyOffers_favourites)(parentBarters.reverse(), req);

                            pageCount = Math.ceil(userBartersInMyOffersCount / limit);
                            response = new _ApiResponse2.default(parentBarters, page, pageCount, limit, userBartersInMyOffersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context2.next = 57;
                            break;

                        case 54:
                            _context2.prev = 54;
                            _context2.t1 = _context2["catch"](7);

                            next(_context2.t1);

                        case 57:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[7, 54], [19, 33, 37, 45], [38,, 40, 44]]);
        }))();
    },
    getUserAuctionsInMyOffers: function getUserAuctionsInMyOffers(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var id, _req$query2, page, limit, finished, query, auctionsWithMyOffer, auctionsWithMyOfferCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);
                            _req$query2 = req.query, page = _req$query2.page, limit = _req$query2.limit, finished = _req$query2.finished;
                            query = {
                                offerUsers: req.user.id
                            };


                            if (finished) query.finished = finished;
                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context3.prev = 7;
                            _context3.next = 10;
                            return _auction2.default.find(query).populate('relatedUser relatedCategory auctionOffer').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 10:
                            auctionsWithMyOffer = _context3.sent;
                            _context3.next = 13;
                            return _auction2.default.count(query);

                        case 13:
                            auctionsWithMyOfferCount = _context3.sent;


                            auctionsWithMyOffer = (0, _BarterAuctionHelper.isInAll_MyOffers_favourites)(auctionsWithMyOffer, req, false);

                            pageCount = Math.ceil(auctionsWithMyOfferCount / limit);
                            response = new _ApiResponse2.default(auctionsWithMyOffer, page, pageCount, limit, auctionsWithMyOfferCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context3.next = 26;
                            break;

                        case 23:
                            _context3.prev = 23;
                            _context3.t0 = _context3["catch"](7);

                            next(_context3.t0);

                        case 26:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2, [[7, 23]]);
        }))();
    },
    getUserWinnedAuctions: function getUserWinnedAuctions(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var id, _req$query3, page, limit, winnedAuctions, winnedAuctionsCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _req$query3 = req.query, page = _req$query3.page, limit = _req$query3.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context4.prev = 5;
                            _context4.next = 8;
                            return _auction2.default.find({ finished: true, 'auctionOffer.bidder': req.user.id }).populate('relatedUser relatedCategory auctionOffer').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            winnedAuctions = _context4.sent;
                            _context4.next = 11;
                            return _auction2.default.count({ finished: true, 'auctionOffer.bidder': req.user.id });

                        case 11:
                            winnedAuctionsCount = _context4.sent;


                            winnedAuctions = (0, _BarterAuctionHelper.isInAll_MyOffers_favourites)(winnedAuctions, req, false);

                            pageCount = Math.ceil(winnedAuctionsCount / limit);
                            response = new _ApiResponse2.default(winnedAuctions, page, pageCount, limit, winnedAuctionsCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context4.next = 24;
                            break;

                        case 21:
                            _context4.prev = 21;
                            _context4.t0 = _context4["catch"](5);

                            next(_context4.t0);

                        case 24:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this3, [[5, 21]]);
        }))();
    }
};
//# sourceMappingURL=user-offers.controller.js.map