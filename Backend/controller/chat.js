import { Chat } from '../models/Chat';
import {chatValidation} from '../validation/chatValidation';

export const createNewChat = async(req,res)=>{
    let {content,isConfession,groupId} = req.body;
    let sender = req.username;
    let newChat = {content,isConfession,group : groupId,from : sender};

    let {error}  = chatValidation.validate(newChat);
    if(error) {
        return res.status(404).json({ message: error.details[0].message });
    }

    new Chat(newChat).save()
    .then(()=>{
        return res.status(200).json({message : "New Chat Added"});
    })
    .catch((err)=>{
        return res.status(404).json({message : "Something went wrong."})
    });

}

export const deleteChat = async(chatId, byWhom="")=>{
    try{
        await Chat.updateOne(
            { _id : chatId },
            { $set : {content : `XX -- This Message is being deleted by ${byWhom} -- XX`} }
        );
        return res.status(200).json({message : "deleted successfully"});
    } catch ( err ) {
        return res.status(404).json({message : "Something went wrong...", error : err});
    }
}