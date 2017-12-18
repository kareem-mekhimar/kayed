"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _barterOfferNotification = require("../models/barter-offer-notification.model");

var _barterOfferNotification2 = _interopRequireDefault(_barterOfferNotification);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _CheckMethods = require("../helpers/CheckMethods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    findAll: function findAll(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _req$query, page, limit, notifications, notificationsCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _CheckMethods.checkUserExist)(req.params.id, next);

                        case 2:
                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context.prev = 5;
                            _context.next = 8;
                            return _barterOfferNotification2.default.find({ user: req.user.id }).populate("offerUser relatedBarter").sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            notifications = _context.sent;
                            _context.next = 11;
                            return _barterOfferNotification2.default.count({ user: req.user.id });

                        case 11:
                            notificationsCount = _context.sent;
                            pageCount = Math.ceil(notificationsCount / limit);
                            response = new _ApiResponse.ApiResponse2(notifications, page, pageCount, limit, notificationsCount, req);


                            res.send(response);
                            _context.next = 20;
                            break;

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context["catch"](5);

                            next(_context.t0);

                        case 20:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[5, 17]]);
        }))();
    },
    findManyUnseen: function findManyUnseen(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var notifications;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _CheckMethods.checkUserExist)(req.params.id, next);

                        case 2:
                            _context2.next = 4;
                            return _barterOfferNotification2.default.find({ user: req.user.id, seen: false }).populate("offerUser relatedBarter").sort({ creationDate: -1 }).limit(10);

                        case 4:
                            notifications = _context2.sent;


                            res.send(notifications);

                        case 6:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    resetAll: function resetAll(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return (0, _CheckMethods.checkUserExist)(req.params.id, next);

                        case 2:
                            _context3.next = 4;
                            return _barterOfferNotification2.default.update({ user: req.user.id, seen: false }, { seen: true }, { multi: true });

                        case 4:

                            res.status(204).end();

                        case 5:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    }
};
//# sourceMappingURL=barter-offer-notification.controller.js.map