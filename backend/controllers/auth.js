import bcrypt from "bcrypt";
import User from "../models/Users.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    console.log("auth/register");
    console.log(req.body);
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
    
    const friend = await Promise.all(
      user.friend.map((id)=>{
        User.findById(id);
      })
    );
    const formatFriends = friend.map(
      ({
      _id,firstName,lastName,occupation,location,picturePath
    }) => {
      return {_id,firstName,lastName,occupation,location,picturePath}
    })
    res.status(200).json({
      token,
      user:{...user._doc,friend:formatFriends},
      friend
    })
    
    res.end();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
