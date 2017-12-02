"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _barter = require("../controllers/barter.controller");

var _barter2 = _interopRequireDefault(_barter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @swagger
* definition:
*   Barter:
*     properties:
*       title:
*         type: string
*         required: true
*       description:
*         type: string
*         required: true
*       neededProduct:
*         type: string
*         required: true
*       relatedUser:
*         type: string
*         required: true
*       relatedCategory:
*         type: string
*         required: true
*       type:
*         type: string
*       imgs:
*         type: array
*       finished:
*         type: string
*       barterOffer:
*         type: string
*/

/**
 * @swagger
 * /barters:
 *   get:
 *     tags:
 *       - Barters
 *     summary: Get all barters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: "page"
 *         in: "query"
 *         type: number
 *         default: 1
 *       - name: "limit"
 *         in: "query"
 *         type: number
 *         default: 20
 *       - name: "category"
 *         in: "query"
 *         type: id
 *       - name: "type"
 *         in: "query"
 *         type: string
 *         description: TEMP - PERM
 *       - name: "finished"
 *         in: "query"
 *         type: string
 *         description: true - false
 *     responses:
 *       200:
 *         description: Get An Array of Barters
 *         example: 
 *                   {
 *                       "links": {
 *                           "self": "http://localhost:3000/api/v1/barters?page=1&limit=20"
 *                       },
 *                       "data": [
 *                           {
 *                              "title": "Samsung",
 *                              "description": "Ay haga2",
 *                              "neededProduct": "IPHone2",
 *                              "relatedUser": "5a1db2b8a3c9862828910bef",
 *                              "relatedCategory": "5a1d59d25be03c12907a6771",
 *                              "creationDate": "2017-11-29T17:06:59.354Z",
 *                              "finished": false,
 *                              "imgs": [],
 *                              "type": "TEMP",
 *                              "id": "5a1ee933d75f0e2338e6222c"
 *                           },
 *                           {
 *                               "title": "BMW",
 *                               "description": "Ay haga2",
 *                               "neededProduct": "IPHone2",
 *                               "relatedUser": "5a1db2b8a3c9862828910bef",
 *                               "relatedCategory": "5a1d59d25be03c12907a6771",
 *                               "creationDate": "2017-11-29T17:05:51.703Z",
 *                               "finished": false,
 *                               "imgs": [],
 *                               "type": "TEMP",
 *                               "id": "5a1ee8efc25fa638dc9fdef2"
 *                           }
 *                       ],
 *                       "page": 1,
 *                       "pageCount": 1,
 *                       "limit": 20,
 *                       "totalCount": 4
 *                   }
 *       400:
 *         description: Bad Request , Check your inputs
 *       404:
 *         description: No Categories Found
*/

/**
 * @swagger
 * /barters:
 *   post:
 *     tags:
 *       - Barters
 *     summary: Add a new barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: body
 *         description: Barter Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Barter'   
 *     responses:
 *       201:
 *         description: Return Created Barter
 *         example:           
 *               {
 *                   "title": "Samsung Note 8",
 *                   "description": "This is a description for new mobile phone of samsung",
 *                   "neededProduct": "Iphone x",
 *                   "relatedUser": "5a1db2b8a3c9862828910bef",
 *                   "relatedCategory": "5a1db3a29246d21c0c4056cf",
 *                   "finished": false,
 *                   "imgs": [],
 *                   "type": "TEMP",
 *                   "id": "5a1ef08e8eb4c6421c2f9599"
 *               }
 *       400:
 *         description: Bad Request , Check your inputs
*/

router.route('/').get(_barter2.default.findAll).post(_barter2.default.createBarter);
/**
 * @swagger
 * /barters/{id}:
 *   get:
 *     tags:
 *       - Barters
 *     summary: get a barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get a barter
 *         example: 
 *               {
 *              "title": "Samsung Note 8",
 *            "description": "This is a description for new mobile phone of samsung",
 *               "neededProduct": "Iphone x",
 *               "relatedUser": {
 *                   "fullName": "magdy",
 *                   "email": "demo@demo.com",
 *                   "address": "ASasasas",
 *                   "phone": "01157954393",
 *                   "country": "egypt",
 *                   "id": "5a1db2b8a3c9862828910bef"
 *               },
 *               "relatedCategory": {
 *                   "name": "mobiles",
 *                   "id": "5a1db3a29246d21c0c4056cf"
 *               },
 *               "creationDate": "2017-11-30T11:49:25.392Z",
 *               "finished": false,
 *               "imgs": [],
 *               "type": "TEMP",
 *               "id": "5a1ff0456cd27932acaad627"
 *               }
 *       404:
 *         description: No Categories Found
*/

/**
 * @swagger
 * /barters/{id}:
 *   put:
 *     tags:
 *       - Barters
 *     summary: update an existing barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: Barter Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Barter'   
 *     responses:
 *       201:
 *         description: Return Updated Barter
 *         example:           
 *                {
 *                 "name": "test category2",
 *                 "id": "5a1dbdddc1e5142cb8cb78f6"
 *                }
 *       400:
 *         description: Bad Request , Check your inputs
*/

/**
 * @swagger
 * /barters/{id}:
 *   delete:
 *     tags:
 *       - Barters
 *     summary: Delete a barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Successed. No Content
 *       404:
 *         description: Barter Not Found
*/
router.route('/:id').get(_barter2.default.findById).put(_barter2.default.updateBarter).delete(_barter2.default.deleteBarter);

exports.default = router;
//# sourceMappingURL=barter.route.js.map