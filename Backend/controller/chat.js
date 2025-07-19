import { Chat } from "../models/Chat";
import { Group } from "../models/Group";
import { chatValidation } from "../validation/chatValidation";

// post request 
export const createNewChat = async (req, res) => {
  let { content, isConfession, groupId } = req.body;
  let sender = req.username;
  let newChat = { content, isConfession, group: groupId, from: sender };

  let { error } = chatValidation.validate(newChat);
  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  }

  new Chat(newChat)
    .save()
    .then(() => {
      return res.status(200).json({ message: "New Chat Added" });
    })
    .catch((err) => {
      return res.status(404).json({ message: "Something went wrong." });
    });
};

// // url : /user/group/:groupId/chat/:chatId/edit
// export const editChat = async (req,res)=>{
// }

export const deleteChat = async (chatId, byWhom = "") => {
  try {
    await Chat.updateOne(
      { _id: chatId },
      {
        $set: {
          content: `XX -- This Message is being deleted by ${byWhom} -- XX`,
        },
      }
    );
    return { message: "deleted successfully" };
  } catch (err) {
    return { message: "Something went wrong...", error: err };
  }
}; // returns object of responce

// url : user/group/:groupId/chat
export const getChatsOfGroup = async (req, res) => {
  let groupId = req.params.groupId;
  try {
    let group = await Group.find({ _id: groupId });
    if (!group) {
      return res.status(400).json({ message: "Group doesnot exists" });
    }
    let chats = group.chats.map(async (chatId)=> await getChatById(chatId));
    return res.status(200).json({ message: "Chat found", chats });
  } catch (error) {
    return res.status(404).json({ message: "Error!!", error });
  }
}; // return list of chats

// function which finds chat by Id
export const getChatById = async(chatId)=>{
  let chat =await Chat.findOne({_id : chatId});
  return chat;
}