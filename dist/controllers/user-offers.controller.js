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
            var id, _req$query, page, limit, status, userBartersInMyOffers, userBartersInMyOffersCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit, status = _req$query.status;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context2.prev = 5;
                            _context2.next = 8;
                            return _barter2.default.find({ offerUsers: id }).populate('relatedCategory relatedUser').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            userBartersInMyOffers = _context2.sent;
                            _context2.next = 11;
                            return _barter2.default.count({ offerUsers: id });

                        case 11:
                            userBartersInMyOffersCount = _context2.sent;


                            userBarters = (0, _BarterAuctionHelper.isInAll_MyOffers_favourites)(userBarters, req);

                            pageCount = Math.ceil(userBartersCount / limit);
                            response = new _ApiResponse2.default(userBarters, page, pageCount, limit, userBartersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context2.next = 24;
                            break;

                        case 21:
                            _context2.prev = 21;
                            _context2.t0 = _context2["catch"](5);

                            next(_context2.t0);

                        case 24:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[5, 21]]);
        }))();
    }
};
//# sourceMappingURL=user-offers.controller.js.map