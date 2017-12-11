import OfferMessage from "../../models/offer-message.model" ;

class OfferMessageHandler{
   
    constructor(io){
       this.io  = io ;    
       this.init() ;
    }
        
    init(){
       let nsp = this.io.of("/offers") ;
       
       nsp.on("connection",socket =>{
           console.log("Connection") ;

           socket.on("offerJoin",data => {
               console.log("join")
               socket.room = data.offerId ;
               socket.join(data.offerId) ;
           });

           socket.on("newMessage",async data => {
               let message = await OfferMessage.create(data) ;
               message = await OfferMessage.findById(message.id).populate("relatedUser") ;
              
               nsp.to(socket.room).emit("newMessage",message) ;
           });
       })
    }

    onNewMessage(data){  
       
    }
    
}


export default OfferMessageHandler