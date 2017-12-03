"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require("../services/passport");

var _passport4 = _interopRequireDefault(_passport3);

var _auth = require("./auth.route");

var _auth2 = _interopRequireDefault(_auth);

var _category = require("./category.route");

var _category2 = _interopRequireDefault(_category);

var _barter = require("./barter.route");

var _barter2 = _interopRequireDefault(_barter);

var _auction = require("./auction.route");

var _auction2 = _interopRequireDefault(_auction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireAuth = _passport2.default.authenticate('jwt', { session: false });

var router = _express2.default.Router();

router.use("/", _auth2.default);
router.use("/categories", requireAuth, _category2.default);
router.use("/auctions", requireAuth, _auction2.default);
router.use("/barters", requireAuth, _barter2.default);

exports.default = router;
//# sourceMappingURL=index.js.map