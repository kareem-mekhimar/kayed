
import express from "express";
import AuctionController from "../controllers/auction.controller" ;

const router = express.Router();


/**
* @swagger
* definitions:
*   Auction:
*     type: "object"
*     required:
*     - "title"
*     - "description"
*     - "startPrice"
*     - "endDate"
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
*       startPrice:
*         type: string
*       endDate:
*         type: string
*       relatedUser:
*         type: string
*       relatedCategory:
*         type: string
*       imgs:
*         type: array
*         items:
*           type: string
*           format: "base64"
*       finished:
*         type: boolean
*         default: false
*         readOnly: true
*       auctionOffer:
*         type: string
*         readOnly: true
*       topBids:
*         type: object 
*         readOnly: true   
*       creationDate:
*         type: string
*         format: date-time
*         readOnly: true
*/

/**
 * @swagger
 * /auctions:
 *   get:
 *     tags:
 *       - Auctions
 *     summary: Get a page of auctions
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
 *         type: string
 *         description: Category id 
 *       - name: "finished"
 *         in: "query"
 *         type: boolean
 *         description: true - false
 *       - name: "startPrice"
 *         in: "query"
 *         type: number
 *       - name: "endPrice"
 *         in: "query"
 *         type: number
 *     responses:
 *       200:
 *         description: Get An Array of Auctions
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
 * /auctions:
 *   post:
 *     tags:
 *       - Auctions
 *     summary: Add a new Auction
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Auction Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Auction'   
 *     responses:
 *       201:
 *         description: Return Created Auction
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
 *       422:
 *         description: Bad Request , Check your inputs
*/

router.route('/')
    .get(AuctionController.findAll)
    .post(AuctionController.create)



/**
 * @swagger
 * /auctions/{id}:
 *   get:
 *     tags:
 *       - Auctions
 *     summary: Get an auction by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get an Auction
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
 * /auctions/{id}:
 *   delete:
 *     tags:
 *       - Auctions
 *     summary: Delete an Auction
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
 *         description: Auction Not Found
*/

router.route('/:id')
    .get(AuctionController.findById)
    .delete(AuctionController.delete);

export default router;
