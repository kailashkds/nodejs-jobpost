import express from 'express';
import passport from 'passport';
import { check, validationResult } from "express-validator";
import { login } from '../controller/common.controller';
import { getuserbyid } from '../controller/user.controller';
var router=express.Router()
router.get('/',(req:any,res:any)=>{
    res.send('work')
})
router.post('/login',[
    check('email').exists(),
    check('password').exists()
],login)

/**
* get user by id.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.get('/getprofile',passport.authenticate('Auth',{session:false}),getuserbyid)
export =router