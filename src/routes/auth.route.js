import express from "express";
import UserController from "../controllers/user.controller";
import passport from "passport";
import passportService from "../services/passport";


const requireSignIn = passport.authenticate('local', { session: false });
const router = express.Router();

/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *       - Auth
 *     description: Sign in to the api
         *     parameters:
         *       - name: body
         *         description: Credentials
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/LoginBody'
         *     responses:
         *       200:
         *         description: Returns saved user + your token
         *       400:
         *         description: You have made an error maybe you didn't provide a required attribute
 */

/**
* @swagger
* definition:
*   LoginBody:
*     properties:
*       email:
*         type: string
*       password:
*         type: string
*/

router.post("/signin", requireSignIn, UserController.signIn);

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Auth
 *     description: Sign up to the api
         *     parameters:
         *       - name: body
         *         description: User object
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/User'
         *     responses:
         *       201:
         *         description: Returns saved user + your token
         *       400:
         *         description: You have made an error maybe you didn't provide a required attribute
 */

/**
* @swagger
* definition:
*   User:
*     properties:
*       fullName:
*         type: string
*       email:
*         type: string
*       password:
*         type: string
*       address:
*         type: string
*       phone:
*         type: string
*       country:
*         type: string
*       img:
*         type: string
*/


router.route('/signup').post(UserController.signUp);

export default router;