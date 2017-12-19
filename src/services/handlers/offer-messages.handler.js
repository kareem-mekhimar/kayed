import OfferMessage from "../../models/offer-message.model";
import Barter from "../../models/barter.model";
import BarterOffer from "../../models/barter-offer.model";
import OfferMessageNotification from "../../models/offer-message-notification.model";
import { sendNotificationToUser} from '../../helpers/PushNotificationsHelper';
class OfferMessageHandler {

    constructor(io) {
        this.io = io;
        this.init();
    }

    init() {
        let nsp = this.io.of("/offers");

        nsp.on("connection", socket => {
            console.log("Connection");

            socket.on("offerJoin", data => {
                console.log("join")
                socket.room = data.offerId;
                socket.join(data.offerId);
            });

            socket.on("newMessage", async data => {
                let message = await OfferMessage.create(data);
                message = await OfferMessage.findById(message.id).populate("relatedUser");
                nsp.to(socket.room).emit("newMessage", message);

                await this.sendNotificationToOwner(message);
            });
        })
    }


    async sendNotificationToOwner(message) {
        
        const barterOffer = await BarterOffer.findById(message.relatedBarterOffer);
        const barter = await Barter.findById(barterOffer.relatedBarter);
        
        let fromUserId = null ;
        let targetUserId = null ;
        
        if(barterOffer.relatedUser == offerMessageNotification.user){ // Send To owner
             targetUserId = barter.relatedUser ;
             fromUserId = barterOffer.relatedUser ;
        }
        else{ // Send to offer guy
             targetUserId = barterOffer.relatedUser ; 
             fromUserId = barter.relatedUser  ;
        }


        
        let offerMessageNotification = await OfferMessageNotification.create({ 
            user: targetUserId,
            fromUser: fromUserId,
            relatedBarterOffer: barterOffer.id,
            relatedBarter: barter.id
        });


        
        let nsp = this.io.of("/notifications/" + targetUserId + "/offer-messages");

        offerMessageNotification = await OfferMessageNotification.findById(offerMessageNotification.id).populate('fromUser');
        nsp.emit("newMessage", offerMessageNotification);

        await sendNotificationToUser('رسالة جديدة', offerMessageNotification, targetUserId);
    }
}


export default OfferMessageHandler