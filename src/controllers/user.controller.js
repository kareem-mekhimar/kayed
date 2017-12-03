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


const validateSignUpBody = req => {

    req.checkBody("email").notEmpty().withMessage("Email Required")
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user)
                    throw new Error("Duplicated");
            })
        }).withMessage("Duplicated");

    req.checkBody("password").notEmpty().withMessage("Password required");
    req.checkBody("phone").notEmpty().withMessage("Phone required");
    req.checkBody("fullName").notEmpty().withMessage("FullName required");
    req.checkBody("country").notEmpty().withMessage("Country required");
    return req.getValidationResult();
}


export default {

    async signUp(req, res, next) {

        let result = await validateSignUpBody(req);

        if (!result.isEmpty())
            next(new ApiError(422, result.mapped()));
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
    }
}