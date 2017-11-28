import express from "express" ;
import passport from "passport" ;
import passportService from "../services/passport" ;
import authRoute from "./auth.route";

const requireAuth = passport.authenticate('jwt',{ session : false }) ;

const router = express.Router();

router.use("/",authRoute) ;

export default router ;