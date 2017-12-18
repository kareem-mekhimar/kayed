import User from "../models/user.model";
import PushNotification from '../models/push.model';
import webPush from 'web-push';

export async function sendNotificationToUser(title, body, userId) {

    let userSubcribtions = await PushNotification.find({ relatedUser: userId });
    console.log('Found UserSubscribtion', userSubcribtions);
    for(let userSub of userSubcribtions) {
        delete userSub.relatedUser;

        const payload = JSON.stringify({
            title,
            body,
            icon: 'https://image.flaticon.com/icons/png/128/148/148921.png'
          });
      
        await webPush.sendNotification(userSub, payload);
    }
}
