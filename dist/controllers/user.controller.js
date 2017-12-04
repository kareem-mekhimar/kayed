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

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwtSecret = _config2.default.jwtSecret;


var generateToken = function generateToken(id) {

    return _jsonwebtoken2.default.sign({
        sub: id,
        iss: 'App',
        iat: new Date().getTime(),
        expiresIn: 604800000
    }, jwtSecret);
};

var validateUserBody = function validateUserBody(req) {
    var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isUpdate) {
        req.checkBody("email").notEmpty().withMessage("Email Required").custom(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
                var user;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log(req.user.email);
                                console.log(value);

                                if (!(req.user.email !== value)) {
                                    _context.next = 9;
                                    break;
                                }

                                console.log("IM HERE: ");
                                _context.next = 6;
                                return _user2.default.findOne({ email: value, _id: { $ne: req.user.id } });

                            case 6:
                                user = _context.sent;

                                if (!user) {
                                    _context.next = 9;
                                    break;
                                }

                                throw new Error("email already taken");

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x2) {
                return _ref.apply(this, arguments);
            };
        }()).withMessage("email already taken");
    } else {
        req.checkBody("email").notEmpty().withMessage("Email Required").custom(function (value) {
            return _user2.default.findOne({ email: value }).then(function (user) {
                if (user) throw new Error("email already exists");
            });
        }).withMessage("email already exists");
    }
    req.checkBody("password").notEmpty().withMessage("Password required");
    req.checkBody("phone").notEmpty().withMessage("Phone required");
    req.checkBody("fullName").notEmpty().withMessage("FullName required");
    req.checkBody("country").notEmpty().withMessage("Country required");

    return req.getValidationResult();
};

var checkIfUserExist = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, next) {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _user2.default.findById(id);

                    case 2:
                        user = _context2.sent;

                        if (user) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                    case 5:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function checkIfUserExist(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = {
    signUp: function signUp(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var validationErrors, img;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return validateUserBody(req);

                        case 2:
                            validationErrors = _context3.sent;


                            if (!validationErrors.isEmpty()) next(new _ApiError2.default(422, validationErrors.mapped()));else {
                                img = req.body.img;

                                delete req.body.img;

                                _user2.default.create(req.body).then(function (user) {

                                    var id = user.id;
                                    if (img) {
                                        user.img = (0, _utils.writeBase64AndReturnUrl)(img, "users/" + id, req);
                                        user.save();
                                    }
                                    res.status(201).send({ user: user, token: generateToken(id) });
                                });
                            }

                        case 4:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }))();
    },
    signIn: function signIn(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var user;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            user = req.user;

                            res.status(200).send({ user: user, token: generateToken(user.id) });

                        case 2:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this2);
        }))();
    },
    updateUser: function updateUser(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var validationErrors, id, img, updatedUser;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return validateUserBody(req, true);

                        case 2:
                            validationErrors = _context5.sent;

                            if (validationErrors.isEmpty()) {
                                _context5.next = 5;
                                break;
                            }

                            return _context5.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 5:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _context5.prev = 7;
                            img = req.body.img;

                            delete req.body.img;

                            _context5.next = 12;
                            return _user2.default.findByIdAndUpdate(id, req.body, { new: true });

                        case 12:
                            updatedUser = _context5.sent;

                            if (updatedUser) {
                                _context5.next = 15;
                                break;
                            }

                            return _context5.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                        case 15:

                            if (img) {
                                updatedUser.img = (0, _utils.writeBase64AndReturnUrl)(img, id, req);
                                updatedUser.save();
                            }

                            res.status(200).send({ user: updatedUser, token: generateToken(id) });

                            _context5.next = 22;
                            break;

                        case 19:
                            _context5.prev = 19;
                            _context5.t0 = _context5["catch"](7);

                            next(_context5.t0);

                        case 22:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this3, [[7, 19]]);
        }))();
    },
    getUserBarters: function getUserBarters(req, res, next) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var id, _req$query, page, limit, userBarters, userBartersCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context6.prev = 5;
                            _context6.next = 8;
                            return _barter2.default.find({ relatedUser: id }).populate('relatedCategory relatedUser').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            userBarters = _context6.sent;
                            _context6.next = 11;
                            return _barter2.default.count({ relatedUser: id });

                        case 11:
                            userBartersCount = _context6.sent;
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
                            _context6.next = 23;
                            break;

                        case 20:
                            _context6.prev = 20;
                            _context6.t0 = _context6["catch"](5);

                            next(_context6.t0);

                        case 23:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this4, [[5, 20]]);
        }))();
    },
    getUserAuctions: function getUserAuctions(req, res, next) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var id, _req$query2, page, limit, userAuctions, userAuctionsCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _req$query2 = req.query, page = _req$query2.page, limit = _req$query2.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context7.prev = 5;
                            _context7.next = 8;
                            return _auction2.default.find({ relatedUser: id }).populate('relatedCategory relatedUser').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            userAuctions = _context7.sent;
                            _context7.next = 11;
                            return _auction2.default.count({ relatedUser: id });

                        case 11:
                            userAuctionsCount = _context7.sent;
                            pageCount = Math.ceil(userAuctionsCount / limit);
                            response = new _ApiResponse2.default(userAuctions, page, pageCount, limit, userAuctionsCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context7.next = 23;
                            break;

                        case 20:
                            _context7.prev = 20;
                            _context7.t0 = _context7["catch"](5);

                            next(_context7.t0);

                        case 23:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, _this5, [[5, 20]]);
        }))();
    }
};
//# sourceMappingURL=user.controller.js.map