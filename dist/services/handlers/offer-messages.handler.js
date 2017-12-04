"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _offerMessage = require("../../models/offer-message.model");

var _offerMessage2 = _interopRequireDefault(_offerMessage);

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

                socket.on("join", function (data) {
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


                                        nsp.sockets.in(socket.room).emit("newMessage", message);

                                    case 7:
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
        key: "onNewMessage",
        value: function onNewMessage(data) {}
    }]);

    return OfferMessageHandler;
}();

exports.default = OfferMessageHandler;
//# sourceMappingURL=offer-messages.handler.js.map