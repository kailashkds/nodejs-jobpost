require('dotenv').config()
const jwt = require('jsonwebtoken');
import { check, validationResult } from "express-validator";
import crypto from 'crypto';
import {User} from '../models';
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
        User.findOne({where:{email:email,password:crypto.createHash('sha256').update(password, 'utf8').digest('hex')}}).then(resdata=>{
            if(resdata){
                if(resdata['status']==1){
                    res.status(201).json({success:false,msg:"User is block."})
                }else{
                    let jwtdata = {
                        id: resdata.id,
                        name: resdata.name,
                        userrole: resdata.role,
                        email: resdata.email
                    }
                    var token = jwt.sign({ jwtdata, loggedIn: true }, SECRET, { expiresIn: '10d' });
                    res.send({ success: true, message: 'Welcome', data: resdata, token: token });
                }
            }else{
                res.status(201).json({success:false,msg:"Invalid credential."})
            }
        }).catch(e=>{
            res.status(501).json({success:false,msg:"internal server error",err:e})
        })
    }
}