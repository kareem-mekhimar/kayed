import OfferMessage from "../models/offer-message.model";
import BarterOffer from "../models/barter-offer.model";
import Barter from "../models/barter.model";



export default {

    async findAll(req, res, next) {

        let barterId = req.params.barterId;
        let offerId = req.params.offerId;

        let barter = await Barter.findById(barterId);
        if (!barter) {
            return next(new ApiError.NotFound('Barter'));
        }

        let offer = await BarterOffer.findById(offerId);
        if (!offer) {
            return next(new ApiError.NotFound('BarterOffer'));
        }

        let messages = await OfferMessage.find({ relatedBarterOffer: offerId }).populate("relatedUser") ;
        res.send(messages);

    },




}