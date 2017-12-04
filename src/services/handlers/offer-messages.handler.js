
import OfferMessage from "../../models/offer-message.model" ;

class OfferMessageHandler{
   
    constructor(io){
       this.io  = io ;    
       this.init() ;
    }
      
    init(){
       io.of("")
    }

    onNewMessage(data){  

    }
    
}


export default OfferMessageHandler