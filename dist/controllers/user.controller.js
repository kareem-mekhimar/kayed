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

var validateSignUpBody = function validateSignUpBody(req) {

    req.checkBody("email").notEmpty().withMessage("Email Required").custom(function (value) {
        return _user2.default.findOne({ email: value }).then(function (user) {
            if (user) throw new Error("Duplicated");
        });
    }).withMessage("Duplicated");

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
            var result, img;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return validateSignUpBody(req);

                        case 2:
                            result = _context.sent;


                            if (!result.isEmpty()) next(new _ApiError2.default(422, result.mapped()));else {
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
    }
};
//# sourceMappingURL=user.controller.js.map