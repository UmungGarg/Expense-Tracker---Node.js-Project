const User = require('../models/user');

function isStringValid(string){
  if(string == undefined || string.length === 0){
    return true
  }else{
    return false
  }
}

exports.signup = async (req,res) => {
  try{
    const { name, email, password} = req.body;
    if(isStringValid(name) || isStringValid(email) || isStringValid(password)){
      return res.status(400).json({err: "Bad parameters. Something missing"})
    }
    await User.create({name,email,password})
    res.status(201).json({message: 'Successfully created'})
  }catch(err){
    res.status(500).json(err);
  }
}

exports.login = async (req,res) => {
  User.findAll()
  .then((users) => {
    res.json(users);
  })
}