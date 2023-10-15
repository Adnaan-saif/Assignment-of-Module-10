const StudentsModel = require("../models/StudentsModel");
const jwt = require("jsonwebtoken");
const OTPModel = require("../models/OTPModel");

exports.create = async (req, res)=>{
   let reqBody = req.body
    try{

        let result = await StudentsModel.create(reqBody);
        res.status(200).json({status:"success",data:result})
    }
    catch (error) {
        res.status(200).json({status:"fail",data:error})
    }
}

exports.logIn = async (req,res)=>{
    try{
        let reqBody = req.body;
        let result = await StudentsModel.find(reqBody).count();
        if(result===1){
            let Payload = {
                exp:Math.floor(Date.now()/1000)+(12*60*60),
                data:reqBody['email']
            }
            let token = jwt.sign(Payload,"SecretKey457246");
            res.status(200).json({status:"success",data:token})
        }
        else{
            res.status(200).json({status:"fail",data:"No User Found"})
        }
    }
    catch (error) {
        res.status(200).json({status:"fail",data:error})
    }
}

exports.update = async (req, res) => {
    try{
        let email = req.headers['email'];
        let reqBody = req.body;
        let result = await StudentsModel.updateOne({email: email}, reqBody)
        res.status(200).json({status:"success",data:result})
    }catch (error) {
        res.status(200).json({status:"fail",data:error})
    }
}


exports.read = async (req,res)=>{
   try {
       let email = req.headers['email'];
       let result = await StudentsModel.find({email:email});
       res.status(200).json({status:"success",data:result})
   }
   catch (e) {
       res.status(200).json({status:"fail",data:e})
   }
}

exports.delete = async (req, res) => {
    try{
        let email = req.headers['email'];
        let result = await StudentsModel.deleteOne({email: email})
        res.status(200).json({status:"success",data:result})
    }catch (error) {
        res.status(200).json({status:"fail",data:error})
    }
}

exports.resetPass=async (req,res)=>{
    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass =  req.body['password'];
    let statusUpdate = 1;
    let result = await OTPModel.find({email:email,otp:OTPCode,status:statusUpdate}).count();
    if(result === 1){
        let result = await StudentsModel.updateOne({email: email}, {password:NewPass})
        res.status(200).json({status:"success",data:"Password Reset Success"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }
}