import EmailValidator from "email-validator";
import { check, validationResult } from "express-validator";
import crypto from 'crypto';
import {User} from '../models';
import { enedituser, engetuser, ensignup, getuseremail, getuserid } from "../entity/user";
export const getclient=async(req:any,res:any)=>{
    try {
        let data=await engetuser(1)
        res.json({success:true,msg:"All client get successfully.",data:data})
    } catch (error) {
        res.status(501).json({success:false,msg:"internal server error",err:err})
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
                    let usersignup=ensignup(req,1)
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
export const editclient=async(req:any,res:any)=>{
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