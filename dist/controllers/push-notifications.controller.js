"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _offerMessageNotification = require("../models/offer-message-notification.model");

var _offerMessageNotification2 = _interopRequireDefault(_offerMessageNotification);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _CheckMethods = require("../helpers/CheckMethods");

var _push = require("../models/push.model");

var _push2 = _interopRequireDefault(_push);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validateSubcribtion = function validateSubcribtion(req) {
    req.checkBody("endpoint").notEmpty().withMessage("endpoint required").custom(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
            var userSub;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userSub = _push2.default.findOne({ endpoint: value, relatedUser: req.user.id });

                            if (!userSub) {
                                _context.next = 3;
                                break;
                            }

                            throw new Error("User is already subscribed");

                        case 3:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }()).withMessage('User is already subscribed');
    req.checkBody("keys.p256dh").notEmpty().withMessage("keys.p256dh required");
    req.checkBody("keys.auth").notEmpty().withMessage("Keys.auth required");
    return req.getValidationResult();
};

exports.default = {
    subscribe: function subscribe(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var validationErrors, pushNotification;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return validateSubcribtion(req);

                        case 2:
                            validationErrors = _context2.sent;

                            if (validationErrors.isEmpty()) {
                                _context2.next = 5;
                                break;
                            }

                            return _context2.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 5:
                            _context2.next = 7;
                            return (0, _CheckMethods.isUserNotExist)(req.params.id);

                        case 7:
                            if (!_context2.sent) {
                                _context2.next = 9;
                                break;
                            }

                            return _context2.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                        case 9:

                            req.body.relatedUser = req.user.id;
                            _context2.prev = 10;
                            _context2.next = 13;
                            return _push2.default.create(req.body);

                        case 13:
                            pushNotification = _context2.sent;

                            res.status(204).end();
                            _context2.next = 20;
                            break;

                        case 17:
                            _context2.prev = 17;
                            _context2.t0 = _context2["catch"](10);

                            next(_context2.t0);

                        case 20:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[10, 17]]);
        }))();
    },
    unsubscribe: function unsubscribe(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (!(0, _CheckMethods.isUserNotExist)(req.params.id)) {
                                _context3.next = 2;
                                break;
                            }

                            return _context3.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                        case 2:
                            _context3.next = 4;
                            return _push2.default.find({ relatedUser: req.user.id }).remove();

                        case 4:

                            req.status(204).end();

                        case 5:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }))();
    }
};
//# sourceMappingURL=push-notifications.controller.js.map