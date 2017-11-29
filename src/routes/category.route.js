
import express from "express";
import CategoryController from "../controllers/category.controller";

const router = express.Router();

/**
* @swagger
* definition:
*   Category:
*     properties:
*       id:
*         type: string
*       name:
*         type: string
*   CreateCategory:
*     properties:
*       name:
*         type: string
*   UpdateCategory:
*     properties:
*       name:
*         type: string
*/

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get An Array of Categories
 *         example: 
 *               [
 *                   {
 *                       "name": "cars",
 *                       "id": "5a1d59d25be03c12907a6771"
 *                   },
 *                   {
 *                       "name": "mobiles",
 *                       "id": "5a1db3a29246d21c0c4056cf"
 *                   },
 *                   {
 *                       "name": "planes",
 *                       "id": "5a1db488834c400708f70689"
 *                   }
 *               ]
 *       404:
 *         description: No Categories Found
*/

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Add a new category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: body
 *         description: Category Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'   
 *     responses:
 *       201:
 *         description: Return Created Category
 *         example:           
 *                {
 *                 "name": "test category2",
 *                 "id": "5a1dbdddc1e5142cb8cb78f6"
 *                }
 *       400:
 *         description: Bad Request , Check your inputs
*/
router.route('/')
    .get(CategoryController.findAll)
    .post(CategoryController.createCategory)

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update an existing category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/UpdateCategory"
 *     responses:
 *       200:
 *         example:
 *               {
 *                   "name": "planes",
 *                   "id": "5a1db488834c400708f70689"
 *               }
 *         description: Return Updated Category
 *       404:
 *         description: Category Not Found
*/

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Successed. No Content
 *       404:
 *         description: Category Not Found
*/
router.route('/:id')
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory);

export default router;
