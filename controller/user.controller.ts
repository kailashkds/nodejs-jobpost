import EmailValidator from "email-validator";
import { check, validationResult } from "express-validator";
import {conn} from "../database/connection";
import crypto from 'crypto';
export const getuser=(req:any,res:any)=>{
    conn.query('select * from user where role=0',(err:any,resdata:any)=>{
        if(err){
            res.status(501).json({success:false,msg:"internal server error",err:err})
        }else{
            res.json({success:true,msg:"All user get successfully.",data:resdata})
        }
    })
}
export const getuserbyid=(req:any,res:any)=>{
    const {id}=req.user.jwtdata
    conn.query('select * from user where id=?',[id],(err:any,resdata:any)=>{
        if(err){
            res.status(501).json({success:false,msg:"internal server error",err:err})
        }else if(resdata.length>0){
            res.json({success:true,msg:"Get profile detail successfully.",data:resdata[0]})
        }else{
            res.json({success:false,msg:"user not found."})
        }
    })
}
export const signup=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].field+' : '+err[0].message
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
                    conn.query(`insert into user(name,email,phone,password,company_name,address,city,state,country,zipcode) value(?,?,?,?,?,?,?,?,?,?)`,[name,email,phone,crypto.createHash('sha256').update(password, 'utf8').digest('hex'),company_name,address,city,state,country,zipcode],(err:any,resdata:any)=>{
                        if(err){
                            res.status(501).json({success:false,msg:"internal server error",err:err})
                        }else{
                            res.json({success:true,msg:"user signup successfully."})
                        }
                    })
                }
            })
        }else{
            res.send({ success: false, message: 'Invalid email address.' })
        }
    }
}
export const edituser=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        var {name,phone,address,city,state,country,zipcode}=req.body
        const {id}=req.user.jwtdata
        conn.query('select count(*) as cnt from user where id=?',[id],(err:any,resdat:any)=>{
            if(err){
                res.status(501).json({success:false,msg:"internal server error",err:err})
            }else if(resdat[0]['cnt']==0){
                res.status(201).json({success:false,msg:"user not found."})
            }else{
                conn.query(`update user set name=?,phone=?,address=?,city=?,state=?,country=?,zipcode=? where id=?`,[name,phone,address,city,state,country,zipcode,id],(err:any,resdata:any)=>{
                    if(err){
                        res.status(501).json({success:false,msg:"internal server error",err:err})
                    }else{
                        res.json({success:true,msg:"Profile edit successfully."})
                    }
                })
            }
        })
    }
}
export const deleteuser=(req:any,res:any)=>{
    let userid=req.user.jwtdata['id']
    conn.query('select count(*) as cnt from user where id=?',[userid],(err:any,resdat:any)=>{
        if(err){
            res.status(501).json({success:false,msg:"internal server error",err:err})
        }else if(resdat[0]['cnt']==0){
            res.status(201).json({success:false,msg:"user not found."})
        }else{
            conn.query(`update user set status=2 where id=?`,[userid],(err:any,resdata:any)=>{
                if(err){
                    res.status(501).json({success:false,msg:"internal server error",err:err})
                }else{
                    res.json({success:true,msg:"Delete successfully."})
                }
            })
        }
    })
}