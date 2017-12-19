"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendNotificationToUser = undefined;

var sendNotificationToUser = exports.sendNotificationToUser = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(title, body, userId) {
        var payload, newMessageId, savedMessage;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        payload = {
                            title: title,
                            body: body,
                            icon: 'https://image.flaticon.com/icons/png/128/148/148921.png'
                        };
                        newMessageId = new _mongoose2.default.Types.ObjectId();
                        _context.next = 4;
                        return admin.database().ref('messages/' + userId + '/' + newMessageId).set(payload);

                    case 4:
                        savedMessage = _context.sent;


                        if (savedMessage) console.log("Saved message ..");else console.log("Unsaved Message...", savedMessage);

                    case 6:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function sendNotificationToUser(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=PushNotificationsHelper.js.map