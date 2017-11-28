import Category from "../models/category.model";
import ApiResponse from "../helpers/ApiResponse";
import ApiError from "../helpers/ApiError";

const validateCategory = req => {
    req.checkBody("name")
        .notEmpty().withMessage("category's name is required")
        .custom(async value => {
            const category = await Category.findOne({ name: value });
            if (category) throw new Error();
        }).withMessage("this category name already exists");
    return req.getValidationResult();
}

export default {
    async findAll(req, res, next) {
        try {
            const allCategories = await Category.find({});
            if (!allCategories)
                next(new ApiError('404', 'No Categories are found'));
            res.status(200).send(allCategories);
        }
        catch (err) {
            next(err);
        }
    },

    async createCategory(req, res, next) {

        const validationErrors = await validateCategory(req);
        if (!validationErrors.isEmpty())
            next(new ApiError(422, validationErrors.mapped()));

        try {
            const createdCategory = await Category.create(req.body);
            createdCategory.save();
            res.status(201).send(createdCategory);
        }
        catch (err) {
            next(new ApiError(400, 'Error Happended..'));
            console.log(err);
        }
    },

    async updateCategory(req, res, next) {
        const { id } = req.params;

        const validationErrors = await validateCategory(req);
        if (!validationErrors.isEmpty())
            next(new ApiError(422, validationErrors.mapped()));

        try {
            const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCategory)
                next(new ApiError(404, 'Category Not Found !'));

            res.status(200).send(updatedCategory);
        }
        catch (err) {
            next(err);
        }
    },

    async deleteCategory(req, res, next) {
        const { id } = req.params;
        try {
            const deletedCategory = await Category.findByIdAndRemove(id);
            if (deletedCategory)
                res.status(204).send();
            next(new ApiError(404, 'Category Not Found !'));
        }
        catch (err) {
            next(err);
        }
    }
}