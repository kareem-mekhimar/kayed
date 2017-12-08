

export function isInAll_MyOffers_favourites(items, req, isBarter= true) {
    let newItems = [];

    for (let item of items) {
        newItems.push(isIn_MyOffers_favourites(item, req, isBarter));
    }

    return newItems.reverse();
}

export function isIn_MyOffers_favourites(item, req, isBarter= true) {
    let newItem;
    
    let inMyFavourites = item.favUsers.some((favUser) => {
        return favUser.equals(req.user.id);
    });

    let inMyOffers = item.offerUsers.some((offerUser) => {
        return offerUser.equals(req.user.id);
    });

    newItem = { ...item.toJSON(), inMyOffers, inMyFavourites }
    return newItem;
}
