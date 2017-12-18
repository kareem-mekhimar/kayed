"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkUserExist = undefined;

var checkUserExist = exports.checkUserExist = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, next) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 3;
                        return _user2.default.findById(id);

                    case 3:
                        user = _context.sent;

                        if (!user) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt("return");

                    case 6:

                        next(new _ApiError2.default.NotFound('User'));

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function checkUserExist(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=CheckMethods.js.map