import { User } from "./../models/User.js";
import { userValidation } from "./../validation/userValidation.js";

export const addUser = async (req, res) => {
  let { error } = await userValidation.validate(req.body);
  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  }
  let user = await User.findOne(req.body.username);
  if (user) {
    return res.status(404).json({ message: "user already exists" });
  }

  user = new User(req.body);
  await user
    .save()
    .then(() => {
      return res.status(200).json({ message: "New User Added" });
    })
    .catch(() => {
      return res
        .status(404)
        .json({ message: "Error Occured while adding user!!!" });
    });
};

export const getUser = async (req, res) => {
  try {
    let user = await User.find(req.body.username);
    if (user) {
      return res.status(200).json({ message: "user found", user });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    return res.status(404).json({ message: "some error occured!!!" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    return res.status(200).json({ message: "Success", users });
  } catch (err) {
    return res.status(404).json({ message: "Error Occured !!" });
  }
};

