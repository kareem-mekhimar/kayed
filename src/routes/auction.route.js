
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
 *               {
 *               "links": {
 *                   "self": "http://localhost:3000/api/v1/auctions?page=1&limit=2",
 *                   "next": "http://localhost:3000/api/v1/auctions?page=2&limit=2",
 *                   "last": "http://localhost:3000/api/v1/auctions?page=2&limit=2"
 *               },
 *               "data": [
 *                   {
 *                   "title": "opel astra",
 *                   "description": "good car",
 *                   "startPrice": 1000,
 *                   "relatedCategory": {
 *                       "name": "سيارات",
 *                       "id": "5a2442fb4311cd0014c1bfb9"
 *                   },
 *                   "relatedUser": {
 *                       "email": "hazem.tarek@gmail.com",
 *                       "fullName": "Hazem Tarek",
 *                       "phone": "01014466503",
 *                       "country": "مصر",
 *                       "address": "بورسعيد",
 *                       "id": "5a24117b4bc62c0014489e43"
 *                   },
 *                   "endDate": "2017-12-24T00:00:00.000Z",
 *                   "highestPrice": 1000,
 *                   "creationDate": "2017-12-04T16:14:53.719Z",
 *                   "finished": false,
 *                   "imgs": [
 *                       "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093721.jpeg",
 *                       "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg",
 *                       "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg"
 *                   ],
 *                   "id": "5a25747dcda9950014db1bc1"
 *                   },
 *                   {
 *                   "title": "oppo",
 *                   "description": "good device",
 *                   "startPrice": 100000,
 *                   "relatedCategory": {
 *                       "name": "مجديات",
 *                       "id": "5a2443970b92ff001421a3b9"
 *                   },
 *                   "relatedUser": {
 *                       "email": "hazem.tarek@gmail.com",
 *                       "fullName": "Hazem Tarek",
 *                       "phone": "01014466503",
 *                       "country": "مصر",
 *                       "address": "بورسعيد",
 *                       "id": "5a24117b4bc62c0014489e43"
 *                   },
 *                   "endDate": "2017-12-31T00:00:00.000Z",
 *                   "highestPrice": 100001,
 *                   "creationDate": "2017-12-03T19:27:58.447Z",
 *                   "finished": false,
 *                   "imgs": [
 *                       "http://kayed-api.herokuapp.com/uploads/auctions/5a24503e7585730014f103c61512329278453.jpeg"
 *                   ],
 *                   "id": "5a24503e7585730014f103c6"
 *                   }
 *               ],
 *               "page": 1,
 *               "pageCount": 2,
 *               "limit": "2",
 *               "totalCount": 4
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
 *               "title": "new Car",
 *               "description": "Full HD , 3d support",
 *               "startPrice": 10000,
 *               "endDate": "2017-12-05T22:00:00.000Z",
 *               "relatedUser": {
 *                   "fullName": "Magdy",
 *                   "email": "xx@xx.com",
 *                   "address": "82 Fatma",
 *                   "phone": "01157954393",
 *                   "country": "Egypt",
 *                   "id": "5a23d9a74bc62c0014489e3b"
 *               },
 *               "relatedCategory": {
 *                   "name": "تلفزيونات",
 *                   "id": "5a25841337560312b08bb05b"
 *               },
 *               "highestPrice": 10000,
 *               "creationDate": "2017-12-04T17:24:29.201Z",
 *               "finished": false,
 *               "imgs": [
 *                   "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *               ],
 *               "id": "5a2584cd37560312b08bb05c",
 *               "offersCount": 0
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
