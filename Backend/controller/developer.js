import { Developer } from "../models/Developer.js";
import { createToken } from "../service/devAuth.js";
import { devValidation } from "../validation/devValidation.js";
import { User } from "../models/User.js";

export const signupDeveloper = async (req, res) => {
  let { error } = await devValidation.validate(req.body);
  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  }

  let developer = await Developer.findOne({username : req.body.username});
  if (developer) {
    return res.status(404).json({ message: "Developer already exists" });
  }

  developer = new Developer(req.body);
  await developer
    .save()
    .then(() => {
      return res.status(200).json({ message: "New Developer Added" });
    })
    .catch(() => {
      return res
        .status(404)
        .json({ message: "Error Occured while adding developer!!!" });
    });
};

export const loginDeveloper = async (req,res)=>{
  try {
    let developer = await Developer.findOne({username : req.body.username});
    if(developer){
      if(developer.password == req.body.password){
        req.header.token = createToken(developer);
        return res.status(200).json({message : "Login Successful"});
      }
      return res.status(404).json({message : "Password is incorrect"});
    } else {
      return res.status(404).json({ message: "Username is incorrect"});
    }
  } catch(err){
    return res.status(404).json({ message: "Some error occured!!!" });
  }
}

export const deleteUser = async (req, res) => {

  await User.findOne({ username: req.params.username })
    .then(async (user) => {
        await User.deleteOne({ username: req.params.username });
        res.status(200).json({ message: "User removed from database." });
    })
    .catch((err) => {
      res.status(404).json({ message: "User doesnot exist" });
    });
};

export const logoutDeveloper = async (req,res)=>{
  if(req.header.token){
    delete req.header.token;
  }
  return res.status(200).json({message : "Logged out successfully"});
}