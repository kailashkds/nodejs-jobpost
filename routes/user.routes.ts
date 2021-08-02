import express from "express";
import passport from "passport";
import { check, validationResult } from "express-validator";
var router=express.Router()
import { signup,edituser,deleteuser,getuser, getuserbyid} from "../controller/user.controller";
/**
* get all user.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.get('/',passport.authenticate('Auth',{session:false}),getuser)
/**
* add user.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.post('/',[
    check('name').exists(),
    check('email').exists(),
    check('phone').exists(),
    check('password').exists(),
    check('address').exists(),
    check('city').exists(),
    check('zipcode').exists(),
    check('state').exists(),
    check('country').exists()
],signup)
/**
* edit user.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.put('/',[
    passport.authenticate('Auth',{session:false}),
    check('name').exists(),
    check('phone').exists(),
    check('address').exists(),
    check('city').exists(),
    check('zipcode').exists(),
    check('state').exists(),
    check('country').exists()
],edituser)

/**
* delete user.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.delete('/',passport.authenticate('Auth',{session:false}),deleteuser)
export =router