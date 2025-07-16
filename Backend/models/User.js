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
        default : "http://localhost:3000/public/default.jpg", // default guest photo link
    },

    groups : {
        type : [mongoose.Schema.Types.ObjectId],
        default : [],
    },

    personalChat : {
        type : [String],
        default : [],
    },

    follower : {
        type : [String],
        default : [],
    },
    
    following : {
        type : [String],
        default : [],
    },
    
    friends : {
        type : [String],
        default : [],
    },
});

export const User = mongoose.model("User", userSchema);