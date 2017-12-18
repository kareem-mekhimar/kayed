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

                await sendNotificationToOwner(message);
            });
        })
    }


    async sendNotificationToOwner(message) {
        const barterOffer = await BarterOffer.findById(message.relatedBarterOffer);
        const barter = await Barter.findById(barterOffer.relatedBarter);
        
        if (barter.relatedUser !== message.relatedUser) {
            let offerMessageNotification = await OfferMessageNotification.create({ 
                user: barter.relatedUser,
                offerUser: message.relatedUser,
                relatedBarterOffer: message.relatedBarterOffer
            });
            offerMessageNotification = await OfferMessageNotification.findById(offerMessageNotification.id).populate('offerUser relatedBarterOffer');

            let nsp = this.io.of("/notifications/" + barter.relatedUser + "/offer-messages");
            nsp.emit("newMessage", OfferMessageNotification);

            await sendNotificationToUser('رسالة جديدة', OfferMessageNotification, barter.relatedUser);
        }
    }
}


export default OfferMessageHandler