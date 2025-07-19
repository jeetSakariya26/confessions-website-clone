  import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import {signupUser, loginUser, findUser,followUser,unfollowUser, logoutUser, getUser } from './controller/user.js'
import { userAuthMiddleware } from './service/userAuth.js';
import { loginDeveloper, signupDeveloper,deleteUser, logoutDeveloper} from './controller/developer.js';
import { devAuthMiddleware } from './service/devAuth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));

app.listen(process.env.PORT, ()=>{
    console.log("App is listening...");
});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("Database connected");
})
.catch(()=>{
  console.log("Some error occured while connecting database");
})

app.post('/dev/login', loginDeveloper);

app.post('/dev/signup', signupDeveloper);

app.get('/dev/logout', logoutDeveloper);

app.post('/dev/:username/delete',devAuthMiddleware, deleteUser);

app.post('/user/signup',signupUser);

app.post('/user/login', loginUser);

app.get('/user/logout',logoutUser);

app.post('/user/find', findUser);

app.get('/user/:username/profile',userAuthMiddleware,getUser);

app.post('/user/:username/follow',userAuthMiddleware,followUser);

app.post('/user/:username/unfollow',userAuthMiddleware,unfollowUser);

app.get('/{*any}',(req,res)=>{
  res.status(200).json({message : "This is global page"});
});