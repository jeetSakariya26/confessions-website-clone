import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    nickName : {
        type : String,
        required : true
    },

    profilePhoto : {
        type : String,
        default : "", // default guest photo link
    },

    chats : {
        type : [mongoose.Schema.Types.ObjectId],
        default : [],
    },

    
});

export const User = mongoose.model("User", userSchema);