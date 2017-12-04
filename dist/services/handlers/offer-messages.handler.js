"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _offerMessage = require("../../models/offer-message.model");

var _offerMessage2 = _interopRequireDefault(_offerMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
         io.of("/offers").on("connection", function (socket) {
            console.log("Connection");
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