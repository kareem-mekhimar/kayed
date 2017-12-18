'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendNotificationToUser = undefined;

var sendNotificationToUser = exports.sendNotificationToUser = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(title, body, userId) {
        var userSubcribtions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userSub, payload;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _push2.default.find({ relatedUser: userId });

                    case 2:
                        userSubcribtions = _context.sent;

                        console.log('Found UserSubscribtion', userSubcribtions);
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 7;
                        _iterator = userSubcribtions[Symbol.iterator]();

                    case 9:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 18;
                            break;
                        }

                        userSub = _step.value;

                        delete userSub.relatedUser;

                        payload = JSON.stringify({
                            title: title,
                            body: body,
                            icon: 'https://image.flaticon.com/icons/png/128/148/148921.png'
                        });
                        _context.next = 15;
                        return _webPush2.default.sendNotification(userSub, payload);

                    case 15:
                        _iteratorNormalCompletion = true;
                        _context.next = 9;
                        break;

                    case 18:
                        _context.next = 24;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t0 = _context['catch'](7);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 24:
                        _context.prev = 24;
                        _context.prev = 25;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 27:
                        _context.prev = 27;

                        if (!_didIteratorError) {
                            _context.next = 30;
                            break;
                        }

                        throw _iteratorError;

                    case 30:
                        return _context.finish(27);

                    case 31:
                        return _context.finish(24);

                    case 32:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[7, 20, 24, 32], [25,, 27, 31]]);
    }));

    return function sendNotificationToUser(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _push = require('../models/push.model');

var _push2 = _interopRequireDefault(_push);

var _webPush = require('web-push');

var _webPush2 = _interopRequireDefault(_webPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=PushNotificationsHelper.js.map