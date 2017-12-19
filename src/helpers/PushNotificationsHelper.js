import User from "../models/user.model";
import mongoose from "mongoose" ;
import * as admin from "firebase-admin";


export async function sendNotificationToUser(title, body, userId) {
    const payload = {
        title,
        body,
        icon: 'https://image.flaticon.com/icons/png/128/148/148921.png'
    };
    let newMessageId = new mongoose.Types.ObjectId();
    let savedMessage = await admin.database().ref('messages/' + userId + '/' + newMessageId ).set(payload);
    
    if(savedMessage) 
        console.log("Saved message ..");
    else 
        console.log("Unsaved Message...", savedMessage);
}   
