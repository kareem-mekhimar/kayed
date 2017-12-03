import express from "express";
import BarterController from "../controllers/barter.controller";
import barterOfferRoute from "./barter-offer.route" ;

const router = express.Router();

/**
* @swagger
* definitions:
*   Barter:
*     type: "object"
*     required:
*     - "title"
*     - "description"
*     - "neededProduct"
*     - "relatedUser"
*     - "relatedCategory"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       title:
*         type: string
*       description:
*         type: string
*       neededProduct:
*         type: string
*       relatedUser:
*         type: string
*       relatedCategory:
*         type: string
*       type:
*         type: string
*         enum:
*         - "TEMP"
*         - "PERM"
*       imgs:
*         type: array
*         items:
*           type: string
*           format: "base64"
*       finished:
*         type: boolean
*         default: false
*         readOnly: true
*       barterOffer:
*         type: string
*         readOnly: true
*       creationDate:
*         type: string
*         format: date-time
*         readOnly: true
*     
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
 *                   "relatedUser": {
 *                       "fullName": "magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "82Fatma El zhraa",
 *                       "phone": "01157954393",
 *                       "country": "egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *                   },
 *                   "relatedCategory": {
 *                       "name": "mobiles",
 *                       "id": "5a1db3a29246d21c0c4056cf"
 *                   },
 *                   "creationDate": "2017-12-03T12:15:05.679Z",
 *                   "finished": false,
 *                   "imgs": [],
 *                   "type": "TEMP",
 *                   "id": "5a23eac99c10230a8c3e6cc5"
 *               }
 *       422:
 *         description: |
 *              - titles is Required
 *              - description is Required
 *              - neededProduct is Required
 *              ----------------------------
 *              - relatedUser is Required 
 *              - User doesn't exist
 *              ----------------------------
 *              - relatedCategory is Required 
 *              - Category doesn't exist
 *              ----------------------------
 *              - Optional type: type of barter should be 'TEMP' OR 'PERM'
 *              - Optional finished: finished should be true or false
 *              - Optional imgs : Imgs should be an array of strings 'images 64base
 */



router.route('/')
    .get(BarterController.findAll)
    .post(BarterController.createBarter)
/**
 * @swagger
 * /barters/{id}:
 *   get:
 *     tags:
 *       - Barters
 *     summary: Get a sepcific barter
 *     produces:
 *       - application/json
 *     parameters:
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
 *         description:  Barter Not Found
*/

/**
 * @swagger
 * /barters/{id}:
 *   put:
 *     tags:
 *       - Barters
 *     summary: Update an existing barter
 *     produces:
 *       - application/json
 *     parameters:
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
 *       404:
 *         description:  Barter Not Found
 *       422:
 *         description: |
 *              - titles is Required
 *              - description is Required
 *              - neededProduct is Required
 *              ----------------------------
 *              - relatedUser is Required 
 *              - User doesn't exist
 *              ----------------------------
 *              - relatedCategory is Required 
 *              - Category doesn't exist
 *              ----------------------------
 *              - Optional type: type of barter should be 'TEMP' OR 'PERM'
 *              - Optional finished: finished should be true or false
 *              - Optional imgs : Imgs should be an array of strings 'images 64base
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
router.route('/:id')
    .get(BarterController.findById)
    .put(BarterController.updateBarter)
    .delete(BarterController.deleteBarter);


router.use(barterOfferRoute)

export default router;
