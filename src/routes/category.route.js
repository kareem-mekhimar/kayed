
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
 *     description: Get All Categories
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
 *       404:
 *         description: No Categories Found
*/

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     description: create a category
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
 *           $ref: '#/definitions/CreateCategory'   
 *     responses:
 *       201:
 *         description: Return Created Category
 *       400:
 *         description: Bad Request , ORM has failed to save object
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
 *     description: update a category
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
 *         description: Category Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UpdateCategory'   
 *     responses:
 *       200:
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
 *     description: delete a category
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
