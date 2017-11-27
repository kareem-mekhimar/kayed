import User from "../models/user.model";

import ApiError from "../helpers/ApiError";
import jwt from "jsonwebtoken";
import config from "../config";

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
                if (acc)
                    throw new Error("Duplicated");
            })
        }).withMessage("Duplicated");

    req.checkBody("password").notEmpty().withMessage("Password required");
    req.checkBody("phone").notEmpty().withMessage("Phone required");
    req.checkBody("fullName").notEmpty().withMessage("FullName required");

    return req.getValidationResult();
}



export default {

    async signUp(req, res, next) {

        let result = await validateSignUpBody(req);

        if (! result.isEmpty())
            next(new ApiError(422, result.mapped()));
        else {
            User.create(req.body).then(user => {
                console.log(user) ;
                res.status(201).send({ user, token: generateToken(user.id) });
            });
        }

    },


    signIn(req, res, next) {
        res.send({ token: generateToken(req.user._id) });
    }
}