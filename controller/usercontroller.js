const User = require('../model/userModel')
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "1i2ggy3";

// const userLogin = async (req, res) => {
//   const { email, password  }= req.body;
//  try {
//   const resultData = await User.find({email: email});
//   if (!resultData) {
//     return res.json({
//       data: 0,
//       message: 'SIGN_UP First',
//       success: 1,
      
//     })
//   }
//     const matchpassword = await bcrypt.compare(password,resultData.password);

//     if(!matchpassword){
//      return res.json({
//         message:"Invalid credential",
//         data: 2,
//       })
//     }
//     const token = jwt.sign({email:resultData.email,id:resultData._id},SECRET_KEY);
//      res.status(201),json({user:resultData, token:token}); 

//   }
//   catch (error) {
//    res.json({
//     message:"error",
//     data: 0,
//    })
//  }
  
// }

// const userSignUp = async (req, res) => {
//   const { name, email, password } = req.body
//   const resultdata = await User.find({ email: email })

//   if (resultdata.length > 0) {
//     return res.json({
//       data: 0,
//       message: 'already exits',
//       success: 0,
//     })
//   }

//   const data = await new User({
//     name,
//     email,
//     password,
//   }).save()

//   return res.json({
//     data: 1,
//     message: 'successfully submitted',
//     success: 1,
//   })
// }

const userSignUp = async(req,res)=>{
  const {name,email,password} = req.body;
  try{
    const existingUser = await User.find({email: email});
    if(existingUser.length>0){
      return res.status(400).json({
        message: "User already exists",
        data: 0,
      });
    }
    const hashPassword = await bcrypt.hash(password,10);
    const result = await User.create({
      name:name,
      email:email,
      password:hashPassword,
    });
    const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY);
      return res.status(201).json({message:"data saved in database", data:1,token:token});
  }catch(e){
    return res.json({
      message: "Error"
     })
  }
}

const userLogin = async(req,res)=>{
   const {email,password} = req.body;
   try {
    const loginUser  = await User.find({email:email});
    // if(!loginUser){
    //   return res.json({
    //     message: "User not found",
    //     data: 0
    //   }) 
    // }
    // if(loginUser.length>0){
    //   return res.status(400).json({ 
    //     message: "User not found",
    //     data: 0,
    //   });
    // }
    const matchPassword = await bcrypt.compare(password,loginUser[0].password);
    if(!matchPassword){
       return res.json({
        message:"Invalid Password", 
        data:0,
      })
    }
    const token = jwt.sign({email:loginUser.email,id:loginUser._id},SECRET_KEY);
     return res.json({user:loginUser,
                      token:token,
                        data:2});
   } catch (error) {
    return res.json({
      message: "SignUp First",
      data:0,
     })
   }
}

module.exports = { userLogin, userSignUp }
