import EmailValidator from "email-validator";
import { check, validationResult } from "express-validator";
import crypto from 'crypto';
import {User} from '../models';
export const engetuser=async (role:number)=>{
        return await User.findAll({where:{role:role}})
}
export const getuserid=async (id:number)=>{
    return await User.findOne({where:{id:id}})
}
export const getuseremail=async (email:any)=>{
    return await User.findOne({where:{email:email}})
}
export const ensignup=async(req:any,role:number)=>{
    try {
        var {name,email,phone,password,company_name,address,city,state,country,zipcode}=req.body
        email=email.toLowerCase()
        let userobj={
            name:name,
            email:email,
            phone:phone,
            password:crypto.createHash('sha256').update(password, 'utf8').digest('hex'),
            company_name:company_name,
            address:address,
            city:city,
            state:state,
            country:country,
            zipcode:zipcode,
            role:role
        }
        return await User.create(userobj)
        
    } catch (error) {
        throw error
    }
}
export const enedituser=async(req:any,id:number)=>{
    try {
        const {name,phone,address,city,state,country,zipcode,company_name}=req.body
        let userobj={
            name:name,
            phone:phone,
            company_name:company_name,
            address:address,
            city:city,
            state:state,
            country:country,
            zipcode:zipcode
        }
        return await User.update(userobj,{where:{id:id}})
    } catch (error) {
        throw error
    }
}

export const deleteusermd=async(id:number)=>{
    try {
        let userobj={
            status:2
        }
        return await User.update(userobj,{where:{id:id}})
    } catch (error) {
        throw error
    }
}
