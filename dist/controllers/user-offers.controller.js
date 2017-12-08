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

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

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
            var id, query, _req$query, page, limit, status, userBartersOffers, userBartersInMyOffersCount, parentBarters, prevItem, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userBarterOffer, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _userBarterOffer, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, parentBarter, pageCount, response;

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
                            return _barterOffer2.default.find(query).populate({
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

                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context2.prev = 49;
                            _iterator2 = userBartersOffers[Symbol.iterator]();

                        case 51:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                _context2.next = 75;
                                break;
                            }

                            _userBarterOffer = _step2.value;
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            _context2.prev = 56;

                            for (_iterator3 = parentBarters[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                parentBarter = _step3.value;

                                if (_userBarterOffer.relatedBarter.id == parentBarter.id && parentBarter.inMyOffers == true) parentBarter.MyOfferId = _userBarterOffer.id;
                            }
                            _context2.next = 64;
                            break;

                        case 60:
                            _context2.prev = 60;
                            _context2.t1 = _context2["catch"](56);
                            _didIteratorError3 = true;
                            _iteratorError3 = _context2.t1;

                        case 64:
                            _context2.prev = 64;
                            _context2.prev = 65;

                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }

                        case 67:
                            _context2.prev = 67;

                            if (!_didIteratorError3) {
                                _context2.next = 70;
                                break;
                            }

                            throw _iteratorError3;

                        case 70:
                            return _context2.finish(67);

                        case 71:
                            return _context2.finish(64);

                        case 72:
                            _iteratorNormalCompletion2 = true;
                            _context2.next = 51;
                            break;

                        case 75:
                            _context2.next = 81;
                            break;

                        case 77:
                            _context2.prev = 77;
                            _context2.t2 = _context2["catch"](49);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context2.t2;

                        case 81:
                            _context2.prev = 81;
                            _context2.prev = 82;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 84:
                            _context2.prev = 84;

                            if (!_didIteratorError2) {
                                _context2.next = 87;
                                break;
                            }

                            throw _iteratorError2;

                        case 87:
                            return _context2.finish(84);

                        case 88:
                            return _context2.finish(81);

                        case 89:
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
                            _context2.next = 100;
                            break;

                        case 97:
                            _context2.prev = 97;
                            _context2.t3 = _context2["catch"](7);

                            next(_context2.t3);

                        case 100:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[7, 97], [19, 33, 37, 45], [38,, 40, 44], [49, 77, 81, 89], [56, 60, 64, 72], [65,, 67, 71], [82,, 84, 88]]);
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
            var id, _req$query3, page, limit, winnedAuctionsOffers, winnedAuctionsOffersCount, parentAuctions, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, winnedAuctionOffer, pageCount, response;

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
                            return _auctionOffer2.default.find({ winned: true, bidder: req.user.id }).select('relatedAuction').populate({
                                path: 'relatedAuction',
                                model: 'auction',
                                populate: {
                                    path: 'relatedUser relatedCategory auctionOffer'
                                }
                            }).sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            winnedAuctionsOffers = _context4.sent;
                            _context4.next = 11;
                            return _auctionOffer2.default.count({ winned: true, bidder: req.user.id });

                        case 11:
                            winnedAuctionsOffersCount = _context4.sent;
                            parentAuctions = [];
                            _iteratorNormalCompletion4 = true;
                            _didIteratorError4 = false;
                            _iteratorError4 = undefined;
                            _context4.prev = 16;

                            for (_iterator4 = winnedAuctionsOffers[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                winnedAuctionOffer = _step4.value;

                                parentAuctions.push(winnedAuctionOffer.relatedAuction);
                            }_context4.next = 24;
                            break;

                        case 20:
                            _context4.prev = 20;
                            _context4.t0 = _context4["catch"](16);
                            _didIteratorError4 = true;
                            _iteratorError4 = _context4.t0;

                        case 24:
                            _context4.prev = 24;
                            _context4.prev = 25;

                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }

                        case 27:
                            _context4.prev = 27;

                            if (!_didIteratorError4) {
                                _context4.next = 30;
                                break;
                            }

                            throw _iteratorError4;

                        case 30:
                            return _context4.finish(27);

                        case 31:
                            return _context4.finish(24);

                        case 32:
                            parentAuctions = (0, _BarterAuctionHelper.isInAll_MyOffers_favourites)(parentAuctions.reverse(), req, false);

                            pageCount = Math.ceil(winnedAuctionsOffersCount / limit);
                            response = new _ApiResponse2.default(parentAuctions, page, pageCount, limit, winnedAuctionsOffersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context4.next = 44;
                            break;

                        case 41:
                            _context4.prev = 41;
                            _context4.t1 = _context4["catch"](5);

                            next(_context4.t1);

                        case 44:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this3, [[5, 41], [16, 20, 24, 32], [25,, 27, 31]]);
        }))();
    }
};
//# sourceMappingURL=user-offers.controller.js.map