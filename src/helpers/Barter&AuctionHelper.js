import BarterOffer from '../models/barter-offer.model';
        
export async function checkAllMyOfferAndFavouriteIn(items, req, isBarter= true) {
    let newItems = [];

    for (let item of items) 
        newItems.push(await checkMyOfferAndFavouriteIn(item, req, isBarter));

    return newItems
}

export async function checkMyOfferAndFavouriteIn(item, req, isBarter= true) {
    let newItem;
    let myOfferId = undefined;

    let inMyFavourites = item.favUsers.some((favUser) => {
        return favUser.equals(req.user.id);
    });

    let inMyOffers = item.offerUsers.some((offerUser) => {
        return offerUser.equals(req.user.id);
    });

    if (isBarter && inMyOffers) {
        let barterOffer = await BarterOffer.findOne({ relatedBarter: item.id , relatedUser: req.user.id })
        myOfferId = barterOffer.id;
    }
    
    newItem = { ...item.toJSON(), inMyOffers, inMyFavourites, myOfferId}
    return newItem;
}