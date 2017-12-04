
import OfferHandler from "./offer-messages.handler" ;

class EventHandler {

    constructor(io){
         new OfferHandler(io) ;
    }
}


export default EventHandler ;