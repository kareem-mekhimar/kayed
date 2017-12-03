import express from "express" ;
import passport from "passport" ;
import passportService from "../services/passport" ;
import authRoute from "./auth.route";
import userRoute from "./user.route" ;
import categoryRoute from "./category.route" ;
import barterRoute from "./barter.route" ;
<<<<<<< HEAD
=======
import barterOfferRoute from "./barter-offer.route" ;
>>>>>>> 56659be18bb9dc75fd115f32f5e613b2704d5a23
import auctionRoute from "./auction.route" ;

const requireAuth = passport.authenticate('jwt',{ session : false }) ;

const router = express.Router();
  

<<<<<<< HEAD
router.use("/", authRoute) ;
=======
router.use("/", authRoute);
router.use("/users", requireAuth, userRoute);
>>>>>>> 56659be18bb9dc75fd115f32f5e613b2704d5a23
router.use("/categories", requireAuth, categoryRoute) ;
router.use("/barters", requireAuth, barterRoute);
router.use("/auctions", requireAuth, auctionRoute) ;


export default router ;