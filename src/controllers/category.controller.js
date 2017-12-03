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
            res.status(200).send(allCategories);
        }
        catch (err) {
            next(err);
        }
    },

    async createCategory(req, res, next) {

        const validationErrors = await validateCategory(req);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));

        try {
            const createdCategory = await Category.create(req.body);
            res.status(201).send(createdCategory);
        }
        catch (err) {
            next(err);
        }
    },

    async updateCategory(req, res, next) {
        const { id } = req.params;

        const validationErrors = await validateCategory(req);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));

        try {
            const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCategory)
                return next(new ApiError.NotFound('Category'));
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
            if (!deletedCategory)
                return next(new ApiError.NotFound('Category'));
                
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}