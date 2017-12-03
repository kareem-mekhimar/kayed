"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

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

    req.checkBody("email").notEmpty().withMessage("Email Required").custom(function (value) {
        return _user2.default.findOne({ email: value }).then(function (user) {
            if (user) throw new Error("email already exists");
        });
    }).withMessage("email already exists");

    req.checkBody("password").notEmpty().withMessage("Password required");
    req.checkBody("phone").notEmpty().withMessage("Phone required");
    req.checkBody("fullName").notEmpty().withMessage("FullName required");
    req.checkBody("country").notEmpty().withMessage("Country required");
    return req.getValidationResult();
};

exports.default = {
    signUp: function signUp(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var validationErrors, img;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return validateUserBody(req);

                        case 2:
                            validationErrors = _context.sent;


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
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    signIn: function signIn(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var user;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            user = req.user;

                            res.status(200).send({ user: user, token: generateToken(user.id) });

                        case 2:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    updateUser: function updateUser(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var id, validationErrors, img, updatedUser;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            id = req.params.id;
                            _context3.next = 3;
                            return validateUserBody(req);

                        case 3:
                            validationErrors = _context3.sent;

                            if (validationErrors.isEmpty()) {
                                _context3.next = 6;
                                break;
                            }

                            return _context3.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 6:
                            _context3.prev = 6;
                            img = req.body.img;

                            delete req.body.img;

                            _context3.next = 11;
                            return _user2.default.findByIdAndUpdate(id, req.body, { new: true });

                        case 11:
                            updatedUser = _context3.sent;

                            if (updatedUser) {
                                _context3.next = 14;
                                break;
                            }

                            return _context3.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                        case 14:

                            if (img) {
                                updatedUser.img = (0, _utils.writeBase64AndReturnUrl)(img, id, req);
                                updatedUser.save();
                            }

                            res.status(200).send({ user: updatedUser, token: generateToken(id) });

                            _context3.next = 21;
                            break;

                        case 18:
                            _context3.prev = 18;
                            _context3.t0 = _context3["catch"](6);

                            next(_context3.t0);

                        case 21:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[6, 18]]);
        }))();
    }
};
//# sourceMappingURL=user.controller.js.map