require('dotenv').config()
const jwt = require('jsonwebtoken');
import EmailValidator from "email-validator";
import { check, validationResult } from "express-validator";
import {conn} from "../database/connection";
import crypto from 'crypto';
const SECRET=process.env.JWTSECRET;
export const login=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        const {email,password}=req.body
        conn.query('select * from user where email=? and password=?',[email,crypto.createHash('sha256').update(password, 'utf8').digest('hex')],(err:any,resdata:any)=>{
            if(err){
                res.status(501).json({success:false,msg:"Internal server error.",err:err})
            }else if(resdata.length>0){
                if(resdata[0]['status']==1){
                    res.status(201).json({success:false,msg:"User is block."})
                }else{
                    let jwtdata = {
                        id: resdata[0].id,
                        name: resdata[0].name,
                        userrole: resdata[0].role,
                        email: resdata[0].email
                    }
                    var token = jwt.sign({ jwtdata, loggedIn: true }, SECRET, { expiresIn: '10d' });
                    res.send({ success: true, message: 'Welcome', data: resdata[0], token: token });
                }
            }else{
                res.status(201).json({success:false,msg:"Invalid credential."})
            }
        })
    }
}