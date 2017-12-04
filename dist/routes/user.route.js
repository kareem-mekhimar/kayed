"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../controllers/user.controller");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Auth
 *     summary: Update an existing user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: User Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'   
 *     responses:
 *       200:
 *         description: Return Updated User
 *         example:           
 *             {
 *               "user": {
 *                       "fullName": "Magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "82 Fatma El zhraa",
 *                       "phone": "01157954393",
 *                       "country": "Egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *               },
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YTFk..."
 *              }
 *       404:
 *         description:  User Not Found
 *       422:
 *         description: |
 *              - email is Required
 *              - email already exists
 *              ---------------------------
 *              - password is Required
 *              - phone is Required 
 *              - fullName is Required 
 *              - country is Required 
 */

router.route('/:id').put(_user2.default.updateUser);

exports.default = router;
//# sourceMappingURL=user.route.js.map