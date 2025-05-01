const User = require("../model/User");
const bcrypt = require("bcryptjs");

const getAllUser = async(req,res,next) =>{
    let users;

    try{
        users = await User.find();
    }
    catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({ message : "users are not found"})
    }

    return res.status(200).json({users});
}

const signUp = async(req,res,next) =>{
   const { name , email , password } = req.body;

   let existingUser;

   try{
    existingUser = await User.findOne({email})
   }catch(e){
    console.log(err);
   }

   if(existingUser){
       return res.status(400).json({message : "User is already exists!"})
   }
   const hashedPassword = bcrypt.hashSync(password);
   const user = new User({
       name,email,
       password: hashedPassword,
       blogs: []
   });

   try{
       user.save();
       return res.status(201).json({ user })
   }
   catch(e){console.log(e);}
}

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let existingUser;
  try {
    console.log("Finding user with email:", email);
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log("Error finding user:", e);
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User is not found" });
  }

  console.log("User found:", existingUser);

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }

  return res.status(200).json({ user: existingUser });
};

module.exports = { getAllUser, signUp , logIn};