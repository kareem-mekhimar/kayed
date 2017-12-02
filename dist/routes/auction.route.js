"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _auction = require("../controllers/auction.controller");

var _auction2 = _interopRequireDefault(_auction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_auction2.default.findAll).post(_auction2.default.create);

router.route('/:id').put(_auction2.default.findById).delete(_auction2.default.delete);

exports.default = router;
//# sourceMappingURL=auction.route.js.map