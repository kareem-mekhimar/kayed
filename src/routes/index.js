import express from "express" ;
import passport from "passport" ;
import passportService from "../services/passport" ;
import authRoute from "./auth.route";
import userRoute from "./user.route" ;
import categoryRoute from "./category.route" ;
import barterRoute from "./barter.route" ;
import auctionRoute from "./auction.route" ;
import searchRoute from "./search.route" ;
import pushNotificationsRoute from './push-notifications.route';
const requireAuth = passport.authenticate('jwt',{ session : false }) ;

const router = express.Router();
  
router.use("/", authRoute);

router.use("/search", requireAuth, searchRoute);

router.use("/users", requireAuth, userRoute);

router.use("/categories", requireAuth, categoryRoute) ;

router.use("/barters", requireAuth, barterRoute);

router.use("/auctions", requireAuth, auctionRoute) ;

router.use("/notifications", requireAuth, pushNotificationsRoute);

export default router ;