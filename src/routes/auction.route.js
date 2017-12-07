
import express from "express";
import auctionOfferRoute from "./auction-offer.route";
import AuctionController from "../controllers/auction.controller";


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
*       highestPrice:
*         type: number
*         readOnly: true
*       offersCount:
*         type: number
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
 *       - name: "categories"
 *         in: "query"
 *         type: string
 *         description: "EX : id1,id2,id3,.."
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
 *               {
 *                   "links": {
 *                       "self": "http://localhost:3000/api/v1/auctions?page=1&limit=2",
 *                       "next": "http://localhost:3000/api/v1/auctions?page=2&limit=2",
 *                       "last": "http://localhost:3000/api/v1/auctions?page=3&limit=2"
 *                   },
 *                   "data": [
 *                       {
 *                           "title": "opel astra",
 *                           "description": "good car",
 *                           "startPrice": 1000,
 *                           "relatedCategory": {
 *                               "name": "سيارات",
 *                               "id": "5a2442fb4311cd0014c1bfb9"
 *                           },
 *                           "relatedUser": {
 *                               "email": "hazem.tarek@gmail.com",
 *                               "fullName": "Hazem Tarek",
 *                               "phone": "01014466503",
 *                               "country": "مصر",
 *                               "address": "بورسعيد",
 *                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
 *                               "id": "5a24117b4bc62c0014489e43"
 *                           },
 *                           "endDate": "2017-12-24T00:00:00.000Z",
 *                           "highestPrice": 10000000000000,
 *                           "creationDate": "2017-12-04T16:14:53.719Z",
 *                           "finished": false,
 *                           "favUsers": [],
 *                           "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093721.jpeg",
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg",
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg"
 *                           ],
 *                           "id": "5a25747dcda9950014db1bc1",
 *                           "inMyFavourites": false
 *                       },
 *                       {
 *                           "title": "new Car",
 *                           "description": "Full HD , 3d support",
 *                           "startPrice": 10000,
 *                           "endDate": "2017-12-05T22:00:00.000Z",
 *                           "relatedUser": {
 *                               "fullName": "Magdyxy",
 *                               "email": "x2x@x2x.com",
 *                               "address": "82 Fatma",
 *                               "phone": "01157954393",
 *                               "country": "Egypt",
 *                               "id": "5a23d9a74bc62c0014489e3b"
 *                           },
 *                           "relatedCategory": {
 *                               "name": "تلفزيونات",
 *                               "id": "5a25841337560312b08bb05b"
 *                           },
 *                           "highestPrice": 12000,
 *                           "creationDate": "2017-12-04T17:24:29.201Z",
 *                           "finished": false,
 *                           "favUsers": [],
 *                           "imgs": [
 *                               "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *                           ],
 *                           "id": "5a2584cd37560312b08bb05c",
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "page": 1,
 *                   "pageCount": 3,
 *                   "limit": "2",
 *                   "totalCount": 5
 *               }
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
 *               "title": "new Car",
 *               "description": "Full HD , 3d support",
 *               "startPrice": 10000,
 *               "endDate": "2017-12-05T22:00:00.000Z",
 *               "relatedUser": "5a23d9a74bc62c0014489e3b",
 *               "relatedCategory": "5a25841337560312b08bb05b",
 *               "highestPrice": 10000,
 *               "creationDate": "2017-12-04T17:24:29.201Z",
 *               "finished": false,
 *               "imgs": [
 *                   "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *               ],
 *               "id": "5a2584cd37560312b08bb05c"
 *               }
 *       422:
 *         description: |
 *              - relatedUser is Required
 *              - Related user Is Not Found
 *              ----------------------------
 *              - relatedCategory is Required 
 *              - Related category Is Not Found
 *              ----------------------------
 *              - title is Required 
 *              - description is Required 
 *              - endDate is Required 
 *              ----------------------------
 *              - startPrice is Required 
 *              - Invalid Number
 *              ----------------------------
 *              - Provide at least one image
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
 *                   "title": "new Car",
 *                   "description": "Full HD , 3d support",
 *                   "startPrice": 10000,
 *                   "endDate": "2017-12-05T22:00:00.000Z",
 *                   "relatedUser": {
 *                       "fullName": "Magdyxy",
 *                       "email": "x2x@x2x.com",
 *                       "address": "82 Fatma",
 *                       "phone": "01157954393",
 *                       "country": "Egypt",
 *                       "id": "5a23d9a74bc62c0014489e3b"
 *                   },
 *                   "relatedCategory": {
 *                       "name": "تلفزيونات",
 *                       "id": "5a25841337560312b08bb05b"
 *                   },
 *                   "highestPrice": 12000,
 *                   "creationDate": "2017-12-04T17:24:29.201Z",
 *                   "finished": false,
 *                   "favUsers": [],
 *                   "imgs": [
 *                       "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *                   ],
 *                   "id": "5a2584cd37560312b08bb05c",
 *                   "offersCount": 1,
 *                   "topBids": {
 *                       "1": {
 *                           "bidderName": "Magdyxy",
 *                           "price": 12000
 *                       }
 *                   },
 *                   "inMyFavourites": false
 *               }
 *       404:
 *         description: Auction with this id not found
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
 *         description: Auction with this id not found
*/

router.route('/:id')
    .get(AuctionController.findById)
    .delete(AuctionController.delete);


router.use(auctionOfferRoute);

export default router;
