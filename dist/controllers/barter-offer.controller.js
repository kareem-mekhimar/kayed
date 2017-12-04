"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _barter = require("../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

var _barterOffer = require("../models/barter-offer.model");

var _barterOffer2 = _interopRequireDefault(_barterOffer);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validateBarterOffer = function validateBarterOffer(req) {
    var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    // req.checkBody("relatedBarter").notEmpty().withMessage("relatedBarter is Required").custom(async value => {
    //     const barter = await Barter.findById(value);
    //     if(!barter) throw new Error()
    // }).withMessage('Enter a valid barter id');

    req.checkBody("relatedUser").notEmpty().withMessage("relatedUser is Required").custom(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
            var user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _user2.default.findById(value);

                        case 2:
                            user = _context.sent;

                            if (user) {
                                _context.next = 5;
                                break;
                            }

                            throw new Error();

                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x2) {
            return _ref.apply(this, arguments);
        };
    }()).withMessage('Enter a valid user id');

    req.checkBody("description").notEmpty().withMessage("description is required");
    req.checkBody("offeredProduct").notEmpty().withMessage("offeredProduct is required");
    req.checkBody("imgs").notEmpty().withMessage("imgs is required").isArray().withMessage("Imgs Should be an array of imgs's urls");
    if (isUpdate) req.checkBody("status").isIn(['PENDING', 'ACCEPTED', 'REJECTED', 'DONE']).withMessage('valid status is required');else req.checkBody("status").optional().equals('PENDING').withMessage("you can't overwrite status it's PENDING by default");
    return req.getValidationResult();
};

exports.default = {
    createBarterOffer: function createBarterOffer(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var validationErrors, barterId, barter, createdBarterOffer, barterOffer;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return validateBarterOffer(req);

                        case 2:
                            validationErrors = _context2.sent;

                            if (validationErrors.isEmpty()) {
                                _context2.next = 5;
                                break;
                            }

                            return _context2.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 5:
                            barterId = req.params.barterId;
                            _context2.prev = 6;
                            _context2.next = 9;
                            return _barter2.default.findById(barterId);

                        case 9:
                            barter = _context2.sent;

                            if (barter) {
                                _context2.next = 14;
                                break;
                            }

                            return _context2.abrupt("return", next(new _ApiError2.default.NotFound('Barter')));

                        case 14:
                            req.body.relatedBarter = barterId;

                        case 15:
                            _context2.next = 17;
                            return _barterOffer2.default.create(req.body);

                        case 17:
                            createdBarterOffer = _context2.sent;

                            createdBarterOffer.save();

                            _context2.next = 21;
                            return _barterOffer2.default.findById(createdBarterOffer.id).populate('relatedBarter relatedUser');

                        case 21:
                            barterOffer = _context2.sent;


                            res.status(201).send(barterOffer);
                            _context2.next = 28;
                            break;

                        case 25:
                            _context2.prev = 25;
                            _context2.t0 = _context2["catch"](6);

                            next(_context2.t0);

                        case 28:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[6, 25]]);
        }))();
    },
    findById: function findById(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var offerId, barterOffer;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            offerId = req.params.offerId;
                            _context3.prev = 1;
                            _context3.next = 4;
                            return _barterOffer2.default.findById(offerId).populate('relatedBarter relatedUser');

                        case 4:
                            barterOffer = _context3.sent;

                            if (barterOffer) {
                                _context3.next = 7;
                                break;
                            }

                            return _context3.abrupt("return", next(new _ApiError2.default.NotFound('BarterOffer')));

                        case 7:

                            res.send(barterOffer);
                            _context3.next = 13;
                            break;

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3["catch"](1);

                            next(_context3.t0);

                        case 13:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2, [[1, 10]]);
        }))();
    },
    updateBarterOffer: function updateBarterOffer(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var offerId, validationErrors, barterOffer, updatedBarterOffer;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            offerId = req.params.offerId;
                            _context4.next = 3;
                            return validateBarterOffer(req, true);

                        case 3:
                            validationErrors = _context4.sent;

                            if (validationErrors.isEmpty()) {
                                _context4.next = 6;
                                break;
                            }

                            return _context4.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 6:
                            _context4.prev = 6;
                            _context4.next = 9;
                            return _barterOffer2.default.findById(offerId).populate('relatedBarter relatedUser');

                        case 9:
                            barterOffer = _context4.sent;

                            if (barterOffer) {
                                _context4.next = 12;
                                break;
                            }

                            return _context4.abrupt("return", next(new _ApiError2.default.NotFound('BarterOffer')));

                        case 12:
                            _context4.t0 = barterOffer.status;
                            _context4.next = _context4.t0 === 'PENDING' ? 15 : _context4.t0 === 'ACCEPTED' ? 18 : _context4.t0 === 'REJECTED' ? 21 : _context4.t0 === 'DONE' ? 21 : 23;
                            break;

                        case 15:
                            if (req.body.status === 'ACCEPTED' || req.body.status === 'REJECTED') {
                                _context4.next = 17;
                                break;
                            }

                            return _context4.abrupt("return", next(new _ApiError2.default(400, 'status should be ACCEPTED or REJECTED')));

                        case 17:
                            return _context4.abrupt("break", 23);

                        case 18:
                            if (req.body.status === 'DONE' || req.body.status === 'REJECTED') {
                                _context4.next = 20;
                                break;
                            }

                            return _context4.abrupt("return", next(new _ApiError2.default(400, 'status should be DONE or REJECTED')));

                        case 20:
                            return _context4.abrupt("break", 23);

                        case 21:
                            return _context4.abrupt("return", next(new _ApiError2.default(400, "you can't update DONE or REJECTED offer")));

                        case 23:
                            if (!(req.body.status === 'DONE')) {
                                _context4.next = 26;
                                break;
                            }

                            _context4.next = 26;
                            return _barter2.default.findByIdAndUpdate(req.body.relatedBarter, {
                                barterOffer: barterOffer.id, finished: true
                            });

                        case 26:
                            _context4.next = 28;
                            return _barterOffer2.default.findByIdAndUpdate(offerId, req.body, { new: true });

                        case 28:
                            updatedBarterOffer = _context4.sent;

                            res.status(200).send(updatedBarterOffer);
                            _context4.next = 35;
                            break;

                        case 32:
                            _context4.prev = 32;
                            _context4.t1 = _context4["catch"](6);

                            next(_context4.t1);

                        case 35:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this3, [[6, 32]]);
        }))();
    }
};
//# sourceMappingURL=barter-offer.controller.js.map