import mongoose from "mongoose";
const Schema = mongoose.Schema;

var PushNotificationsSchema = new Schema({
  relatedUser: {
    type: Schema.Types.ObjectId, 
    ref: 'user',
  },
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String
  }
});

PushNotificationsSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

export default mongoose.model("push-notifications", PushNotificationsSchema);