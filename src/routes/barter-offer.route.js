import express from "express";
import BarterOfferController from "../controllers/barter-offer.controller";
const router = express.Router();

/**
* @swagger
* definitions:
*   BarterOffer:
*     required:
*     - "relatedBarter"
*     - "relatedUser"
*     - "description"
*     - "offeredProduct"
*     - "imgs"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       relatedBarter:
*         type: string
*         readOnly: true
*       relatedUser:
*         type: string
*       description:
*         type: string
*       offeredProduct:
*         type: string
*       imgs:
*         type: array
*         items:
*           type: string
*           format: "URL"
*       status:
*         type: string
*         enum:
*         - "PENDING"
*         - "ACCEPTED"
*         - "REJECTED"
*         - "DONE"
*         readOnly: true
*         default: "PENDING"
*   Status:
*     properties:
*       status:
*         type: string
*
*/

/**
 * @swagger
 * /barters/{barterId}/offers:
 *   post:
 *     tags:
 *       - BarterOffer
 *     summary: Create a barter offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: barterId
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: BarterOffer Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/BarterOffer'   
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

router.route('/:barterId/offers')
    .post(BarterOfferController.createBarterOffer);

/**
 * @swagger
 * /barters/{barterId}/offers/{offerId}:
 *   get:
 *     tags:
 *       - BarterOffer
 *     summary: Get a sepcific barter offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: barterId
 *         in: path
 *         required: true
 *         type: string
 *       - name: offerId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get a barter offer
 *         example: 
 *               {
 *                   "relatedBarter": {
 *                       "title": "Samsung Note 8",
 *                       "description": "This is a description for new mobile phone of samsung",
 *                       "neededProduct": "Iphone x",
 *                       "relatedUser": "5a1db2b8a3c9862828910bef",
 *                       "relatedCategory": "5a1db3a29246d21c0c4056cf",
 *                       "barterOffer": "5a20514241be11491c6a00e0",
 *                       "creationDate": "2017-11-30T11:49:25.392Z",
 *                       "finished": true,
 *                       "imgs": [],
 *                       "type": "TEMP",
 *                       "id": "5a1ff0456cd27932acaad627"
 *                   },
 *                   "relatedUser": {
 *                       "fullName": "magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "ASasasas",
 *                       "phone": "01157954393",
 *                       "country": "egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *                   },
 *                   "description": "Samsung Note",
 *                   "offeredProduct": "LG TV 2017",
 *                   "status": "ACCEPTED",
 *                   "imgs": [
 *                       "https://wallpaperbrowse.com/media/images/81.jpg"
 *                   ],
 *                   "creationDate": "2017-12-02T14:54:37.521Z",
 *                   "id": "5a22beadf76e80383c82cb0a"
 *               }
 *       404:
 *         description: BarterOffer Not Found
*/

/**
 * @swagger
 * /barters/{barterId}/offers/{offerId}:
 *   put:
 *     tags:
 *       - BarterOffer
 *     summary: Update an existing barter offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: barterId
 *         in: path
 *         required: true
 *         type: string
 *       - name: offerId
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: BarterOffer Object
 *         in: body
 *         required: true
 *         schema:
 *             $ref: "#/definitions/Status"
 *     responses:
 *       200:
 *         description: Return Updated BarterOffer
 *         example:           
 *                {
 *                   "relatedBarter": "5a1ff0456cd27932acaad627",
 *                   "relatedUser": "5a1db2b8a3c9862828910bef",
 *                   "description": "Samsung Note",
 *                   "offeredProduct": "LG TV 2017",
 *                   "status": "ACCEPTED",
 *                   "imgs": [
 *                       "https://wallpaperbrowse.com/media/images/81.jpg"
 *                   ],
 *                   "creationDate": "2017-12-02T14:54:37.521Z",
 *                   "id": "5a22beadf76e80383c82cb0a"
 *               }
 *       400:
 *         description: | 
 *              - status should be ACCEPTED or REJECTED IF status of barterOffer is PENDING
 *              - status should be DONE or REJECTED is IF status of barterOffer is ACCEPTED
 *              - you can't update DONE or REJECTED offer IF status of barterOffer is DONE OR REJECTED
 *       404:
 *         description: BarterOffer Not Found
 *       422:
 *         description: |
 *              ----------------------------
 *              - status: valid status is required
 *              - status should be one of ['PENDING','ACCEPTED','REJECTED','DONE']
 */



router.route('/:barterId/offers/:offerId')
    .get(BarterOfferController.findById)
    .put(BarterOfferController.updateBarterOffer);

export default router;
