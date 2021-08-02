import EmailValidator from "email-validator";
import { check, validationResult } from "express-validator";
import crypto from 'crypto';
import {User} from '../models';
import { deleteusermd, enedituser, engetuser, ensignup, getuseremail, getuserid } from "../entity/user";
export const getuser=async(req:any,res:any)=>{
    try {
        let data=await engetuser(0)
        res.json({success:true,msg:"All user get successfully.",data:data})
    } catch (error) {
        res.status(501).json({success:false,msg:"internal server error",err:err})
    }
}
export const getuserbyid=async(req:any,res:any)=>{
    try {
        const {id}=req.user.jwtdata
        let userdata=await getuserid(id)
        if(userdata){
            res.json({success:true,msg:"Get profile detail successfully.",data:userdata})
        }else{
            res.json({success:false,msg:"user not found."})
        }
    } catch (error) {
        res.status(501).json({success:false,msg:"internal server error",err:error})
    }
}
export const signup=async(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
       try {
           var {email}=req.body
           email=email.toLowerCase()
           if (EmailValidator.validate(email)) {
                let uemail=await getuseremail(email)
                if(uemail){
                    res.status(201).json({success:false,msg:"user already exists."})
                }else{
                    let usersignup=ensignup(req,0)
                    res.json({success:true,msg:"user signup successfully."})    
                }
           }else{
               res.json({ success: false, message: 'Invalid email address.' })
           }
       } catch (error) {
        res.status(501).json({success:false,msg:"internal server error",err:error})
       }
    }
}
export const edituser=async(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        try {
            const {id}=req.user.jwtdata
            let udata=await getuserid(id)
            if(!udata){
                res.status(201).json({success:false,msg:"user not found."})
            }else{
                let dt=await enedituser(req,id)
                res.json({success:true,msg:"Profile edit successfully."})
            }
        } catch (e) {
            res.status(501).json({success:false,msg:"internal server error",err:e})
        }
    }
}
export const deleteuser=async(req:any,res:any)=>{
    try {
        let userid=req.user.jwtdata['id']
        let checkuser=await getuserid(userid)
        if(!checkuser){
            res.status(201).json({success:false,msg:"user not found."})
        }else{
            let dlt=await deleteusermd(userid)
            res.json({success:true,msg:"Delete successfully."})
        }
    } catch (e) {
        res.status(501).json({success:false,msg:"internal server error",err:e})
    }
}