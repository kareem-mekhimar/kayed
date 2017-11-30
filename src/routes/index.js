import express from "express" ;
import passport from "passport" ;
import passportService from "../services/passport" ;
import authRoute from "./auth.route";
import categoryRoute from "./category.route" ;
import auctionRoute from "./auction.route" ;


const requireAuth = passport.authenticate('jwt',{ session : false }) ;

const router = express.Router();

router.use("/", authRoute) ;
router.use("/categories", requireAuth, categoryRoute) ;
router.use("/auctions", requireAuth, auctionRoute) ;

export default router ;