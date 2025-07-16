import { createToken } from "../service/userAuth.js";
import { User } from "./../models/User.js";
import { userValidation } from "./../validation/userValidation.js";

// tasks : add comments to the code  ~
//         check working of functions
//         think about other functions

// function which adds new User to database (sign Up)
export const signupUser = async (req, res) => {
  let { error } = await userValidation.validate(req.body);
  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ username: req.body.username });
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

// function to login with username & password ( Log In )
export const loginUser = async (req, res) => {
  try {
    await User.findOne({ username: req.body.username })
      .then((user) => {
        if(user.password == req.body.password){
          req.header.token = createToken(user);
          return res.status(200).json({ message: "Login Successful"});
        }
        return res.status(404).json({message : "password is incorrect"});
      })
      .catch((err) => {
        return res.status(404).json({ message: "Username is Incorrect" });
      });
  } catch (err) {
    return res.status(404).json({ message: "some error occured!!!" });
  }
};

// function which finds users from database ( Search ) ( Priority to username then nickName )
export const findUser = async (req, res) => {
  let data = req.body.nickName; // suppose given data has key = nickname
  try {
    const usersViaNickName = await User.find({
      nickName: { $regex: data, $options: "i" },
    });

    const usersViaUsername = await User.find({ username: data });

    const users = usersViaUsername.concat(usersViaNickName);
    if (users.length) {
      res.status(200).json({ message: "Users found.", users });
    } else {
      res.status(404).json({ message: "No result found." });
    }
  } catch (err) {
    console.error("Something went wrong.");
  }
}; // problem where repetion occures in username and nickname ( username = nickname )

// function which finds all Users from database
// export const getAllUsers = async (req, res) => {
//   try {
//     let users = await User.find();
//     return res.status(200).json({ message: "Success", users });
//   } catch (err) {
//     return res.status(404).json({ message: "Error Occured !!" });
//   }
// };

export const getUser = async(req,res)=>{
  let {username} = req.body.params;

  await User.findOne({username})
  .then((user)=>{
    return res.status(200).json(user);
  })
  .catch((err)=>{
    return res.status(404).json("User not found");
  })
}

// follow user
export const followUser = async (req, res) => {
  // const currentUsername = req.user.username;
  const currentUsername = req.username;
  const targetUsername = req.params.username;

  if (currentUsername == targetUsername)
    return res.status(400).send("You can't follow yourself");

  // adding required stuff for currentUsername
  await User.findOne({ username: currentUsername })
    .then((user) => {
      console.log("Found User :", user.username);
      if(user.follower.indexOf(targetUsername) != -1) {
        user.friends.push(targetUsername);
      }
      user.following.push(targetUsername);

      user.save().then(()=>console.log("changes saved..."))
      .catch(()=>console.log("Error !!!"))
    })
    .catch((err) => {
      res.status(404).json({ message: "Something went wrong" });
    });
    
  // adding 
  await User.findOne({ username: targetUsername })
    .then((user) => {
      console.log("Found user ", user.username);
      if (user.following.indexOf(currentUsername) != -1) {
        user.friends.splice(user.friends.length, 0, currentUsername);
        console.log(user.friends);
      }
      user.follower.splice(user.following.length,0,currentUsername);
      console.log(user.follower);

      user.save().then(()=>console.log("changes saved..."))
      .catch(()=>console.log("Error !!!"))
    })
    .catch((err) => {
      res.status(404).json({ message: "Something went wrong" });
    });


  res.send("Followed successfully");
};

// unfollow user - not working properly
export const unfollowUser = async (req, res) => {
  const currentUsername = req.username;
  const targetUsername = req.params.username;

  if(currentUsername == targetUsername)
    res.status(400).json({ message: "You can't unfollow yourself" });

  // removing from friend list if present
  await User.findOne({ username: currentUsername })
    .then((user) => {
      let idx = user.friend.indexOf(targetUsername);
      if (idx != -1) {
        user.friends.splice(idx, 1);
      }
      
      idx = user.following.indexOf(targetUsername);
      if (idx != -1) {
        user.following.splice(idx, 1);
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "Something went wrong" });
    });
    
    await User.findOne({ username: targetUsername })
      .then((user) => {
        let idx = user.friend.indexOf(currentUsername);
        if (idx != -1) {
          user.friends.splice(idx, 1);
        }
        idx = user.follower.indexOf(currentUsername);
        if (idx != -1) {
          user.follower.splice(idx, 1);
        }
        user.save().then(()=>console.log("changes saved..."))
          .catch(()=>console.log("Error !!!"))
      })
      .catch((err) => {
        res.status(404).json({ message: "Something went wrong" });
      });
};

export const logoutUser = async(req,res)=>{
  if(req.header.token){
    delete req.headers.token;
  }
  return res.status(200).json({message : "Logged out Successfully"});
}