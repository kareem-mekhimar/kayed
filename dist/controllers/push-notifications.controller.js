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

var _PushNotificationsHelper = require("../helpers/PushNotificationsHelper");

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const validateSubcribtion = req => {
//     req.checkBody("endpoint").notEmpty().withMessage("endpoint required").custom(async value => { 
//         let userSub = PushNotification.findOne({endpoint: value, relatedUser: req.user.id})
//         if (userSub) 
//             throw new Error("User is already subscribed");
//     }).withMessage('User is already subscribed');
//     req.checkBody("keys.p256dh").notEmpty().withMessage("keys.p256dh required");
//     req.checkBody("keys.auth").notEmpty().withMessage("Keys.auth required");
//     return req.getValidationResult();
// }

exports.default = {
    subscribe: function subscribe(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            console.log('BODY Of push notification: ', req.body);

                            _context.prev = 1;
                            _context.next = 4;
                            return admin.database().ref('fcmTokens/').set(_defineProperty({}, req.user.id, req.body.token));

                        case 4:
                            res.status(204).end();
                            _context.next = 10;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context["catch"](1);

                            next(_context.t0);

                        case 10:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[1, 7]]);
        }))();
    },
    unsubscribe: function unsubscribe(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return admin.database().ref('fcmTokens/' + req.user.id).remove();

                        case 3:
                            req.status(204).end();
                            _context2.next = 9;
                            break;

                        case 6:
                            _context2.prev = 6;
                            _context2.t0 = _context2["catch"](0);

                            next(_context2.t0);

                        case 9:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[0, 6]]);
        }))();
    }
};
//# sourceMappingURL=push-notifications.controller.js.map