"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auction = require("../models/auction.model");

var _auction2 = _interopRequireDefault(_auction);

var _auctionOffer = require("../models/auction-offer.model");

var _auctionOffer2 = _interopRequireDefault(_auctionOffer);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _category = require("../models/category.model");

var _category2 = _interopRequireDefault(_category);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validateAuctionBody = function validateAuctionBody(req) {

    req.checkBody("relatedUser").notEmpty().withMessage("relatedUser Required").custom(function (value) {
        return _user2.default.findById(value).then(function (user) {
            if (!user) throw new Error("Related user Is Not Found");
        });
    }).withMessage("relatedUser is Not Found in the system");

    req.checkBody("relatedCategory").notEmpty().withMessage("relatedCategory Required").custom(function (value) {
        return _category2.default.findById(value).then(function (category) {
            if (!category) throw new Error("Related category Is Not Found");
        });
    }).withMessage("relatedCategory is Not Found in the system");

    req.checkBody("title").notEmpty().withMessage("title required");
    req.checkBody("description").notEmpty().withMessage("Description required");
    req.checkBody("endDate").notEmpty().withMessage("endDate required");
    req.checkBody("startPrice").notEmpty().withMessage("startPrice required").matches(/\d/).withMessage("Invalid Number");
    req.checkBody("imgs").notEmpty().withMessage("Provide at least one image");

    return req.getValidationResult();
};

exports.default = {
    findAll: function findAll(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var page, limit, category, startPrice, endPrice, finished, findQuery, countQuery, results, count, pageCount, response;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            page = req.query.page;
                            limit = req.query.limit;
                            category = req.query.category;
                            startPrice = req.query.startPrice;
                            endPrice = req.query.endPrice;
                            finished = req.query.finished;

                            if (!(startPrice && endPrice)) {
                                _context.next = 9;
                                break;
                            }

                            if (!(endPrice < startPrice)) {
                                _context.next = 9;
                                break;
                            }

                            return _context.abrupt("return", next(new _ApiError2.default(400, "startPrice Can't be more than endPrice")));

                        case 9:
                            findQuery = _auction2.default.find({});
                            countQuery = _auction2.default.count();


                            if (category) {
                                findQuery.where("relatedCategory").equals(category);
                                countQuery.where("relatedCategory").equals(category);
                            }

                            if (startPrice) {
                                findQuery.where("highestPrice").gte(startPrice);
                                countQuery.where("highestPrice").gte(startPrice);
                            }

                            if (endPrice) {
                                findQuery.where("highestPrice").lte(endPrice);
                                countQuery.where("highestPrice").gte(endPrice);
                            }

                            if (typeof finished !== 'undefined') {
                                findQuery.where("finished").equals(finished);
                                countQuery.where("finished").equals(finished);
                            }

                            findQuery.populate('relatedUser relatedCategory');

                            page = page ? parseInt(page) : 1;
                            limit = limit ? limit : 20;

                            _context.next = 20;
                            return findQuery.sort({ creationDate: -1 }).limit(parseInt(limit)).skip((page - 1) * limit);

                        case 20:
                            results = _context.sent;
                            _context.next = 23;
                            return countQuery;

                        case 23:
                            count = _context.sent;
                            pageCount = Math.ceil(count / limit);
                            response = new _ApiResponse2.default(results, page, pageCount, limit, count);


                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }

                            res.send(response);

                        case 30:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    findById: function findById(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var id, auction, topAuctionOffers;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            id = req.params.id;
                            _context2.next = 3;
                            return _auction2.default.findById(id).populate('relatedUser relatedCategory');

                        case 3:
                            auction = _context2.sent;

                            if (auction) {
                                _context2.next = 8;
                                break;
                            }

                            next(new _ApiError2.default(404, "Auction with this id not found"));
                            _context2.next = 13;
                            break;

                        case 8:
                            _context2.next = 10;
                            return _auctionOffer2.default.find({ relatedAuction: id }).sort({ price: -1 }).limit(3);

                        case 10:
                            topAuctionOffers = _context2.sent;


                            console.log(topAuctionOffers);

                            res.send(auction);

                        case 13:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    create: function create(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var result, imgs, auction, i, url;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return validateAuctionBody(req);

                        case 2:
                            result = _context3.sent;

                            if (result.isEmpty()) {
                                _context3.next = 7;
                                break;
                            }

                            next(new _ApiError2.default(422, result.mapped()));
                            _context3.next = 23;
                            break;

                        case 7:
                            _context3.prev = 7;
                            imgs = req.body.imgs;

                            delete req.body.imgs;

                            req.body.highestPrice = req.body.startPrice;

                            _context3.next = 13;
                            return _auction2.default.create(req.body);

                        case 13:
                            auction = _context3.sent;


                            for (i = 0; i < imgs.length; i++) {
                                url = (0, _utils.writeBase64AndReturnUrl)(imgs[i], "auctions/" + auction.id + new Date().getTime(), req);

                                auction.imgs.push(url);
                            }

                            _context3.next = 17;
                            return auction.save();

                        case 17:

                            res.status(201).send(auction);

                            _context3.next = 23;
                            break;

                        case 20:
                            _context3.prev = 20;
                            _context3.t0 = _context3["catch"](7);

                            next(_context3.t0);

                        case 23:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[7, 20]]);
        }))();
    },
    delete: function _delete(req, res, next) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var id, auction;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            id = req.params.id;
                            _context4.next = 3;
                            return _auction2.default.findById(id);

                        case 3:
                            auction = _context4.sent;


                            if (!auction) next(new _ApiError2.default(404, "Auction with this id not found"));else {
                                auction.remove();
                                res.status(204).end();
                            }

                        case 5:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    }
};
//# sourceMappingURL=auction.controller.js.map