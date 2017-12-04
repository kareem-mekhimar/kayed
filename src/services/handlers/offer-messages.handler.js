
import OfferMessage from "../../models/offer-message.model" ;

class OfferMessageHandler{
   
    constructor(io){
       this.io  = io ;    
       this.init() ;
    }
        
    init(){
       this.io.of("/offers").on("connection",socket =>{
           console.log("Connection") ;
       })
    }

    onNewMessage(data){  
      
    }
    
}


export default OfferMessageHandler