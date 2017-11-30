
import express from "express";
import AuctionController from "../controllers/auction.controller" ;

const router = express.Router();

router.route('/')
    .get(AuctionController.findAll)
    .post(AuctionController.create)

router.route('/:id')
    .put(AuctionController.findById)
    .delete(AuctionController.delete);

export default router;
