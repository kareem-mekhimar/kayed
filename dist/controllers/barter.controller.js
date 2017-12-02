"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _barter = require("../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _category = require("../models/category.model");

var _category2 = _interopRequireDefault(_category);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validateBarter = function validateBarter(req) {
    req.checkBody("title").notEmpty().withMessage("titles is Required");
    req.checkBody("description").notEmpty().withMessage("description is required");
    req.checkBody("neededProduct").notEmpty().withMessage("neededProduct is required");
    req.checkBody("relatedUser").notEmpty().withMessage("relatedUser is required").custom(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
            var user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _user2.default.findById(value);

                        case 2:
                            user = _context.sent;

                            if (user) {
                                _context.next = 5;
                                break;
                            }

                            throw new Error('User doesnt exist');

                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }()).withMessage('User doesnt exist');
    req.checkBody("relatedCategory").notEmpty().withMessage("relatedCategory is required").custom(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
            var category;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _category2.default.findById(value);

                        case 2:
                            category = _context2.sent;

                            if (category) {
                                _context2.next = 5;
                                break;
                            }

                            throw new Error('Category doesnt exist');

                        case 5:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }()).withMessage('Category doesnt exist');

    req.checkBody('type').optional().isIn(['TEMP', 'PERM']).withMessage("type of barter should be 'TEMP' OR 'PERM'");
    req.checkBody('finished').optional().isIn(['true', 'false']).withMessage("finished should be true or false");
    // req.checkBody('imgs').optional()
    // .custom(value => {
    //     if(!Array.isArray(value))
    //         throw new Error('imgs should be array')
    // })
    return req.getValidationResult();
};

exports.default = {
    findAll: function findAll(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var _req$query, page, limit, category, type, finished, query, barters, bartersCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit, category = _req$query.category, type = _req$query.type, finished = _req$query.finished;
                            query = {};


                            if (category) query.relatedCategory = category;
                            if (type) query.type = type;
                            if (finished) query.finished = finished;

                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context3.prev = 7;
                            _context3.next = 10;
                            return _barter2.default.find(query).populate('relatedCategory relatedUser').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 10:
                            barters = _context3.sent;
                            _context3.next = 13;
                            return _barter2.default.count();

                        case 13:
                            bartersCount = _context3.sent;
                            pageCount = Math.ceil(bartersCount / limit);
                            response = new _ApiResponse2.default(barters, page, pageCount, limit, bartersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context3.next = 25;
                            break;

                        case 22:
                            _context3.prev = 22;
                            _context3.t0 = _context3["catch"](7);

                            next(new _ApiError2.default.BadRequest());
                            // next(err);

                        case 25:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[7, 22]]);
        }))();
    },
    createBarter: function createBarter(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var validationErrors, imgs, createdBarter, i, barter;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return validateBarter(req);

                        case 2:
                            validationErrors = _context4.sent;

                            if (!validationErrors.isEmpty()) next(new _ApiError2.default(422, validationErrors.mapped()));

                            _context4.prev = 4;
                            imgs = req.body.imgs;

                            delete req.body.imgs;

                            _context4.next = 9;
                            return _barter2.default.create(req.body);

                        case 9:
                            createdBarter = _context4.sent;


                            // handle barter imgs
                            if (imgs) {
                                for (i = 0; i < imgs.length; i++) {
                                    createdBarter.imgs.push((0, _utils.writeBase64AndReturnUrl)(imgs[i], createdBarter.id + i, req));
                                }
                            }

                            _context4.next = 13;
                            return _barter2.default.findById(createdBarter.id).populate('relatedCategory relatedUser');

                        case 13:
                            barter = _context4.sent;

                            createdBarter.save();

                            res.status(201).send(barter);

                            _context4.next = 21;
                            break;

                        case 18:
                            _context4.prev = 18;
                            _context4.t0 = _context4["catch"](4);

                            next(new _ApiError2.default.BadRequest());
                            //next(err);

                        case 21:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this2, [[4, 18]]);
        }))();
    },
    findById: function findById(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var id, barter;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            id = req.params.id;
                            _context5.prev = 1;
                            _context5.next = 4;
                            return _barter2.default.findById(id).populate('relatedCategory relatedUser');

                        case 4:
                            barter = _context5.sent;

                            if (barter) res.send(barter);else next(new _ApiError2.default.NotFound('Barter'));
                            _context5.next = 11;
                            break;

                        case 8:
                            _context5.prev = 8;
                            _context5.t0 = _context5["catch"](1);

                            next(new _ApiError2.default.BadRequest());
                            //next(err);

                        case 11:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this3, [[1, 8]]);
        }))();
    },
    updateBarter: function updateBarter(req, res, next) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var id, validationErrors, imgs, updatedBarter, i;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            id = req.params.id;
                            _context6.next = 3;
                            return validateBarter(req);

                        case 3:
                            validationErrors = _context6.sent;

                            if (!validationErrors.isEmpty()) next(new _ApiError2.default(422, validationErrors.mapped()));

                            _context6.prev = 5;
                            imgs = req.body.imgs;

                            delete req.body.imgs;

                            _context6.next = 10;
                            return _barter2.default.findByIdAndUpdate(id, req.body, { new: true }).populate('relatedCategory relatedUser');

                        case 10:
                            updatedBarter = _context6.sent;

                            if (!updatedBarter) next(new _ApiError2.default.NotFound('Barter'));

                            // handle barter imgs
                            if (imgs) {
                                for (i = 0; i < imgs.length; i++) {
                                    updatedBarter.imgs.push((0, _utils.writeBase64AndReturnUrl)(imgs[i], updatedBarter.id + i, req));
                                }
                            }
                            res.status(200).send(updatedBarter);
                            _context6.next = 19;
                            break;

                        case 16:
                            _context6.prev = 16;
                            _context6.t0 = _context6["catch"](5);

                            next(new _ApiError2.default.BadRequest());

                        case 19:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this4, [[5, 16]]);
        }))();
    },
    deleteBarter: function deleteBarter(req, res, next) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var id, deletedBarter;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            id = req.params.id;
                            _context7.prev = 1;
                            _context7.next = 4;
                            return _barter2.default.findByIdAndRemove(id);

                        case 4:
                            deletedBarter = _context7.sent;

                            if (deletedBarter) res.status(204).send();
                            next(new _ApiError2.default.NotFound('Barter'));
                            _context7.next = 12;
                            break;

                        case 9:
                            _context7.prev = 9;
                            _context7.t0 = _context7["catch"](1);

                            next(new _ApiError2.default.BadRequest());
                            //next(err);

                        case 12:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, _this5, [[1, 9]]);
        }))();
    }
};
//# sourceMappingURL=barter.controller.js.map