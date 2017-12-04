import express from "express";
import UserController from "../controllers/user.controller";
const router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update an existing user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: User Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'   
 *     responses:
 *       200:
 *         description: Return Updated User
 *         example:           
 *             {
 *               "user": {
 *                       "fullName": "Magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "82 Fatma El zhraa",
 *                       "phone": "01157954393",
 *                       "country": "Egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *               },
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YTFk..."
 *              }
 *       404:
 *         description:  User Not Found
 *       422:
 *         description: |
 *              - email is Required
 *              - email already exists
 *              ---------------------------
 *              - password is Required
 *              - phone is Required 
 *              - fullName is Required 
 *              - country is Required 
 */

router.route('/:id').put(UserController.updateUser);


export default router;
