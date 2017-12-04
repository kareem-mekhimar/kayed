import express from "express";
import AuctionOfferController from "../controllers/auction-offer.controller";

const router = express.Router();

/**
* @swagger
* definitions:
*   AucttionOffer:
*     required:
*     - "bidder"
*     - "price"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       relatedAuction:
*         type: string
*         readOnly: true
*       bidder:
*         type: string
*       price:
*         type: number
*
*/

/**
 * @swagger
 * /auctions/{auctionId}/offers:
 *   post:
 *     tags:
 *       - AuctionOffer
 *     summary: Create an auction offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auctionId
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: AuctionOffer Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AuctionOffer'   
 *     responses:
 *       201:
 *         description: Return Created BarterOffer
 *         example:           
 *               {
 *                   "relatedBarter": {
 *                       "title": "Samsung Note 8",
 *                       "description": "This is a description for new mobile phone of samsung",
 *                       "neededProduct": "Iphone x",
 *                       "relatedUser": "5a1db2b8a3c9862828910bef",
 *                       "relatedCategory": "5a1db3a29246d21c0c4056cf",
 *                       "creationDate": "2017-11-30T11:49:25.392Z",
 *                       "finished": false,
 *                       "imgs": [],
 *                       "type": "TEMP",
 *                       "id": "5a1ff0456cd27932acaad627"
 *                   },
 *                   "relatedUser": {
 *                       "fullName": "magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "82 Fatma El zhraa",
 *                       "phone": "01157954393",
 *                       "country": "egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *                   },
 *                   "description": "Samsung Note",
 *                   "offeredProduct": "TV Samsung",
 *                   "status": "PENDING",
 *                   "imgs": [
 *                       "https://wallpaperbrowse.com/media/images/maxresdefault_9As8F3D.jpg"
 *                   ],
 *                   "creationDate": "2017-11-30T14:27:32.457Z",
 *                   "id": "5a2015540031364a2043efa8"
 *               }
 *       422:
 *         description: |
 *              - relatedBarter is Required
 *              - Enter a valid barter id
 *              ----------------------------
 *              - relatedUser is Required
 *              - Enter a valid user id
 *              ----------------------------
 *              - description is Required 
 *              - offeredProduct is Required 
 *              ----------------------------
 *              - imgs is Required 
 *              - Imgs Should be an array of imgs's urls
 *              ----------------------------
 *              - Optional status: you can't overwrite status it's PENDING by default
 */

router.route('/:auctionId/offers')
    .post(AuctionOfferController.create);




export default router;
