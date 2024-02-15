const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Sib = require('sib-api-v3-sdk')
require('dotenv').config()

function isStringValid(string){
  if(string == undefined || string.length === 0){
    return true
  }else{
    return false
  }
}

const signup = async (req,res) => {
  try{
    const { name, email, password} = req.body;
    if(isStringValid(name) || isStringValid(email) || isStringValid(password)){
      return res.status(400).json({err: "Bad parameters. Something missing"})
    }
    bcrypt.hash(password, 10, async(err, hash) => {
      await User.create({name,email,password:hash})
    res.status(201).json({message: 'Successfully created'})
    })
  }catch(err){
    res.status(500).json(err);
  }
}

const generateAccessToken = (id, naam, ispremiumuser) => {
  return jwt.sign({userId: id, name:naam, ispremiumuser}, 'secret key')
}

const login = async (req,res) => {
  try{
  const { email,password} = req.body;
  if(isStringValid(email) || isStringValid(password)){
    return res.status(400).json({err: "Bad parameters. Something missing"})
  }
  const user = await User.findAll({ where:{email}})
    if(user.length>0){
      bcrypt.compare(password, user[0].password, (err,result) => {
        if(err){
          throw new Error('Something went wrong')
        }
        if(result === true){
          res.status(200).json({success:true, message: "User logged in successfully", token: generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser)})
        }else{
          res.status(400).json({success:false, message: "Password is wrong"})
        }
      })
    }else{
      res.status(404).json({success:false, message: "User doesnt exist"})
    }
  }catch(err) {
    console.log(err)
    res.status(500).json({message:err, success:false})
  }
}

const mail = async (req,res) => {
  try{
    const email = req.body.email;
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY
    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
      email: "handsome.anmol5@gmail.com",
      name: 'handsome'
    }
    const receivers = [
      {
        email
      }
    ]
    const resp = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Reset Password',
      textContent: `Forgot Password, Reset it`
    })
    console.log(resp)
    res.status(200).json({resp, success:true});
  }catch(err){
    console.log(err)
  }
}

module.exports = {
  signup, generateAccessToken, login, mail
}