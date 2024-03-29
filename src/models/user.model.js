

import mongoose from "mongoose";
import bycrypt from "bcryptjs";


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: [true, "Duplicated Email"],
        validate: {
            validator: (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            message: 'Invalid Email Syntax'
        },
        required: [true, "Email Required.."]
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});


UserSchema.pre("save", function (next) {
    const account = this;

    bycrypt.hash(account.password, 10).then(hash => {
        account.password = hash;
        next();
    }).catch(err => console.log(err));
});

UserSchema.methods.isValidPassword = function (newPassword, callback) {
    let user = this;
    bycrypt.compare(newPassword, user.password, function (err, isMatch) {
        if (err)
            return callback(err);

        callback(null, true);
    })
};


UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
    }
});


export default mongoose.model("user", UserSchema)