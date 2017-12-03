import User from "../models/user.model";

import ApiError from "../helpers/ApiError";
import jwt from "jsonwebtoken";
import config from "../config";
import { writeBase64AndReturnUrl } from "../utils";

const { jwtSecret } = config;


const generateToken = id => {

    return jwt.sign({
        sub: id,
        iss: 'App',
        iat: new Date().getTime(),
        expiresIn: 604800000
    }, jwtSecret)
}


const validateUserBody = req => {

    req.checkBody("email").notEmpty().withMessage("Email Required")
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user)
                    throw new Error("email already exists");
            })
        }).withMessage("email already exists");

    req.checkBody("password").notEmpty().withMessage("Password required");
    req.checkBody("phone").notEmpty().withMessage("Phone required");
    req.checkBody("fullName").notEmpty().withMessage("FullName required");
    req.checkBody("country").notEmpty().withMessage("Country required");
    return req.getValidationResult();
}


export default {

    async signUp(req, res, next) {

        const validationErrors = await validateUserBody(req);

        if (!validationErrors.isEmpty())
            next(new ApiError(422, validationErrors.mapped()));
        else {

            let img = req.body.img;
            delete req.body.img;

            User.create(req.body).then(user => {

                let id = user.id;
                if (img) {
                    user.img = writeBase64AndReturnUrl(img, "users/"+id, req);
                    user.save();
                }


                res.status(201).send({ user, token: generateToken(id) });
            });
        }

    },


    async signIn(req, res, next) {
        let user = req.user;
        res.status(200).send({ user, token: generateToken(user.id) });
    },


    async updateUser(req, res, next) {
        const { id } = req.params;

        const validationErrors = await validateUserBody(req);
        if (!validationErrors.isEmpty())
            return next(new ApiError(422, validationErrors.mapped()));

        try {
            let img = req.body.img;
            delete req.body.img;

            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedUser)
                return next(new ApiError.NotFound('User'));

            if (img) {
                updatedUser.img = writeBase64AndReturnUrl(img, id, req);
                updatedUser.save();
            }

            res.status(200).send({ user: updatedUser, token: generateToken(id) });
           
        } catch (err) {
            next(err)
        }
    }
}