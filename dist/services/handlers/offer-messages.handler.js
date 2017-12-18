"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _offerMessage = require("../../models/offer-message.model");

var _offerMessage2 = _interopRequireDefault(_offerMessage);

var _barter = require("../../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

var _barterOffer = require("../../models/barter-offer.model");

var _barterOffer2 = _interopRequireDefault(_barterOffer);

var _offerMessageNotification = require("../../models/offer-message-notification.model");

var _offerMessageNotification2 = _interopRequireDefault(_offerMessageNotification);

var _PushNotificationsHelper = require("../../helpers/PushNotificationsHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OfferMessageHandler = function () {
    function OfferMessageHandler(io) {
        _classCallCheck(this, OfferMessageHandler);

        this.io = io;
        this.init();
    }

    _createClass(OfferMessageHandler, [{
        key: "init",
        value: function init() {
            var _this = this;

            var nsp = this.io.of("/offers");

            nsp.on("connection", function (socket) {
                console.log("Connection");

                socket.on("offerJoin", function (data) {
                    console.log("join");
                    socket.room = data.offerId;
                    socket.join(data.offerId);
                });

                socket.on("newMessage", function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
                        var message;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.next = 2;
                                        return _offerMessage2.default.create(data);

                                    case 2:
                                        message = _context.sent;
                                        _context.next = 5;
                                        return _offerMessage2.default.findById(message.id).populate("relatedUser");

                                    case 5:
                                        message = _context.sent;

                                        nsp.to(socket.room).emit("newMessage", message);

                                        _context.next = 9;
                                        return sendNotificationToOwner(message);

                                    case 9:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this);
                    }));

                    return function (_x) {
                        return _ref.apply(this, arguments);
                    };
                }());
            });
        }
    }, {
        key: "sendNotificationToOwner",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
                var barterOffer, barter, offerMessageNotification, nsp;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _barterOffer2.default.findById(message.relatedBarterOffer);

                            case 2:
                                barterOffer = _context2.sent;
                                _context2.next = 5;
                                return _barter2.default.findById(barterOffer.relatedBarter);

                            case 5:
                                barter = _context2.sent;

                                if (!(barter.relatedUser !== message.relatedUser)) {
                                    _context2.next = 17;
                                    break;
                                }

                                _context2.next = 9;
                                return _offerMessageNotification2.default.create({
                                    user: barter.relatedUser,
                                    offerUser: message.relatedUser,
                                    relatedBarterOffer: message.relatedBarterOffer
                                });

                            case 9:
                                offerMessageNotification = _context2.sent;
                                _context2.next = 12;
                                return _offerMessageNotification2.default.findById(offerMessageNotification.id).populate('offerUser relatedBarterOffer');

                            case 12:
                                offerMessageNotification = _context2.sent;
                                nsp = this.io.of("/notifications/" + barter.relatedUser + "/offer-messages");

                                nsp.emit("newMessage", _offerMessageNotification2.default);

                                _context2.next = 17;
                                return (0, _PushNotificationsHelper.sendNotificationToUser)('رسالة جديدة', _offerMessageNotification2.default, barter.relatedUser);

                            case 17:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function sendNotificationToOwner(_x2) {
                return _ref2.apply(this, arguments);
            }

            return sendNotificationToOwner;
        }()
    }]);

    return OfferMessageHandler;
}();

exports.default = OfferMessageHandler;
//# sourceMappingURL=offer-messages.handler.js.map