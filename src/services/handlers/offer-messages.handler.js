import OfferMessage from "../../models/offer-message.model";
import Barter from "../../models/barter.model";
import BarterOffer from "../../models/barter-offer.model";

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
            let nsp = this.io.of("/notifications/" + barter.relatedUser + "/offer-messages");
            nsp.emit("newMessage", message);
        }
    }
}


export default OfferMessageHandler