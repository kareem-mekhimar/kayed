import express from "express";
import PushNotificationsController from "../controllers/push-notifications.controller";
const router = express.Router();



/**
* @swagger
* definitions:
*   PushNotification:
*     type: "object"
*     properties:
*       token:
*         type: string
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
 *              - To Be Added
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
