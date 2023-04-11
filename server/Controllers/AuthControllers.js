import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
// Registering a new User
export const registerUser = async (req, res) => {
//to hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password=hashedPass

  //saving data to database
  const newUser = new UserModel(req.body);
  const {username}=req.body
  try {
    //checking user exists
    const olduser =await UserModel.findOne({username})
    if(olduser){
      return res.status(400).json({message:'username is already registered'})
    }
    //if user not exists create new
    const user=await newUser.save();
    //creating token
    const token = jwt.sign({
      username:user.username,id:user._id
    },process.env.JWT_KEY,{expiresIn:'1h'})

    res.status(200).json({message:'User registered sucessfully',user,token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login User

export const loginUser = async (req, res) => {
  const {username, password} = req.body

  try {
    //checking user exist in databse
      const user = await UserModel.findOne({username: username})


      if(user)
      {//comparing passwords
          const validity = await bcrypt.compare(password, user.password)


          if(!validity){
            res.status(400).json('Wrong Password')
          }else{
            //creating token
            const token = jwt.sign({
              username:user.username,id:user._id
            },process.env.JWT_KEY,{expiresIn:'1h'})
            res.status(200).json({message:'User Login sucessfully',user,token});
          }
      }
      else{
          res.status(404).json("User does not exists")
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};