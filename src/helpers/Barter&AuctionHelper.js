export function isInAll_MyOffers_favourites(items, req, isBarter = true) {
    let newItems = [];
    let isInMyOffer = isBarter? false : undefined;
    let isInMyFavourites = false;    
    for(let item of items) {

        for (let userId of item.favUsers) {
            if (userId == req.user.id){
                inMyFavourites = true;
                break; 
            }
        }

        if(isBarter) {
            for(let userId of item.offerUsers)
            {
                if (userId == req.user.id) 
                {
                    isInMyOffer = true;
                    break;
                }
            }           
        }
        item = { ...item.toJSON(),inMyOffers: isInMyOffer, inMyFavourites : isInMyFavourites }
        newItems.push(item);
    }
    return newItems.reverse();
}

export function isIn_MyOffers_favourites(item, req, isBarter = true) {
    let newItem;
    let isInMyOffer = isBarter? false : undefined;
    let isInMyFavourites = false;
    for(let userId of item.favUsers)
    {
        if (userId == req.user.id) 
            isInMyFavourites = true;
    }

    if(isBarter) { 
        for(let userId of item.offerUsers)
        {
            if (userId == req.user.id) {
                isInMyOffer = true;
                break;
            }
        }
    }
    newItem = { ...item.toJSON(),inMyOffers: isInMyOffer, inMyFavourites : isInMyFavourites }
    return newItem;
}
