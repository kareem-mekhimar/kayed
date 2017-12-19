import User from "../models/user.model";
import mongoose from "mongoose" ;
import * as admin from "firebase-admin";
import request from 'request-promise';
import config from '../config';


export async function sendNotificationToUser(title, body, userId, actionUrl) {
    let userNotifiToken = await admin.database().ref(`/fcmTokens/${userId}`)
                                                .once('value')
                                                .then(token => token.val());
    console.log("USER TOKEN : ", userNotifiToken);

    if(userNotifiToken) {
        try{ 
            let sentNotification = await request(
                {
                    uri: 'https://fcm.googleapis.com/fcm/send',
                    method: 'POST',
                    headers: { 'Authorization': 'key=' + config.serverKeyFirebase },
                    json: {
                        "notification": {
                            title,
                            body,
                            icon: 'https://image.flaticon.com/icons/png/128/148/148921.png',
                            click_action : `${config.clientUrl}/${actionUrl}`
                        },
                        "to": userNotifiToken
                    }
                }
            );
            if(sentNotification)
                console.log("Message Sent");
            else
                console.log("Message Not Sent");
        } catch(err) {
            console.log(err);   
        }  
    } 
}
