import express from "express" ;
import passport from "passport" ;
import passportService from "../services/passport" ;
import authRoute from "./auth.route";
import userRoute from "./user.route" ;

const requireAuth = passport.authenticate('jwt',{ session : false }) ;

const router = express.Router();

router.use("/auth",authRoute) ;

export default router ;