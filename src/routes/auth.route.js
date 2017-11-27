import express from "express";
import UserController from "../controllers/user.controller";
import passport from "passport";
import passportService from "../services/passport";


const requireSignIn = passport.authenticate('local', { session: false });
const router = express.Router();



//router.post("/signin", requireSignIn, AuthController.signIn);

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
         *       200:
         *         description: Return saved user + your token
         *         schema:
         *           $ref: '#/definitions/User'
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
*       img:
*         type: array
*          items:
*             type: string
*/

router.route('/signup').post(UserController.signUp);

export default router;