import express from "express";
import PushNotificationsController from "../controllers/push-notifications.controller";
const router = express.Router();



/**
* @swagger
* definitions:
*   PushNotification:
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
*       endpoint:
*         type: string
*       keys:
*         type: object
*/



/**
 * @swagger
 * /notifications/subscribe:
 *   post:
 *     tags:
 *       - PushNotifications
 *     summary: Subscribe
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: PushNotification Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PushNotification'   
 *     responses:
 *       204:
 *         description: Success
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
 
 
/**
 * @swagger
 * /notifications/unsubscribe:
 *   delete:
 *     tags:
 *       - PushNotifications
 *     summary: UnSubscribe
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: Success
 */
 
router.route('/subscribe').post(PushNotificationsController.subscribe);
router.route('/unsubscribe').delete(PushNotificationsController.unsubscribe);

export default router;
