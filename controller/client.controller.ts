import EmailValidator from "email-validator";
import { check, validationResult } from "express-validator";
import {conn} from "../database/connection";
import crypto from 'crypto';
export const getclient=(req:any,res:any)=>{
    conn.query('select * from user where role=1',(err:any,resdata:any)=>{
        if(err){
            res.status(501).json({success:false,msg:"internal server error",err:err})
        }else{
            res.json({success:true,msg:"All client get successfully.",data:resdata})
        }
    })
}
export const signup=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        var {name,email,phone,password,company_name,address,city,state,country,zipcode}=req.body
        email=email.toLowerCase()
        if (EmailValidator.validate(email)) {
            conn.query('select count(*) as cnt from user where email=?',[email],(err:any,resdat:any)=>{
                if(err){
                    res.status(501).json({success:false,msg:"internal server error",err:err})
                }else if(resdat[0]['cnt']>0){
                    res.status(201).json({success:false,msg:"user already exists."})
                }else{
                    conn.query(`insert into user(name,email,phone,password,company_name,address,city,state,country,zipcode,role) value(?,?,?,?,?,?,?,?,?,?,1)`,[name,email,phone,crypto.createHash('sha256').update(password, 'utf8').digest('hex'),company_name,address,city,state,country,zipcode],(err:any,resdata:any)=>{
                        if(err){
                            res.status(501).json({success:false,msg:"internal server error",err:err})
                        }else{
                            res.json({success:true,msg:"client signup successfully."})
                        }
                    })
                }
            })
        }else{
            res.send({ success: false, message: 'Invalid email address.' })
        }
    }
}
export const editclient=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        const {name,phone,id}=req.body
        conn.query('select count(*) as cnt from user where id=? and role=1',[id],(err:any,resdat:any)=>{
            if(err){
                res.status(501).json({success:false,msg:"internal server error",err:err})
            }else if(resdat[0]['cnt']==0){
                res.status(201).json({success:false,msg:"user not found."})
            }else{
                conn.query(`update user set name=?,phone=? where id=?`,[name,phone,id],(err:any,resdata:any)=>{
                    if(err){
                        res.status(501).json({success:false,msg:"internal server error",err:err})
                    }else{
                        res.json({success:true,msg:"client edit successfully."})
                    }
                })
            }
        })
    }
}
export const deleteclient=(req:any,res:any)=>{
    let userid=req.user.jwtdata['id']
    conn.query('select count(*) as cnt from user where id=? and role=1',[userid],(err:any,resdat:any)=>{
        if(err){
            res.status(501).json({success:false,msg:"internal server error",err:err})
        }else if(resdat[0]['cnt']==0){
            res.status(201).json({success:false,msg:"user not found."})
        }else{
            conn.query(`update user set status=2 where id=?`,[userid],(err:any,resdata:any)=>{
                if(err){
                    res.status(501).json({success:false,msg:"internal server error",err:err})
                }else{
                    res.json({success:true,msg:"client delete successfully."})
                }
            })
        }
    })
}