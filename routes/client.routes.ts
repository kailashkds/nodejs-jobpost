import express from "express";
import passport from "passport";
import { check, validationResult } from "express-validator";
var router=express.Router()
import { signup,editclient,deleteclient,getclient} from "../controller/client.controller";
import { getuserbyid } from "../controller/user.controller";
/**
* get all client.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.get('/',getclient)
/**
* signup client.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.post('/',[
    check('name').exists(),
    check('email').exists(),
    check('phone').exists(),
    check('company_name').exists(),
    check('password').exists(),
    check('address').exists(),
    check('city').exists(),
    check('zipcode').exists(),
    check('state').exists(),
    check('country').exists()
],signup)
/**
* edit client.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.put('/',[
    passport.authenticate('clientAuth',{session:false}),
    check('name').exists(),
    check('phone').exists(),
    check('company_name').exists(),
    check('address').exists(),
    check('city').exists(),
    check('zipcode').exists(),
    check('state').exists(),
    check('country').exists()
],editclient)
/**
* delete client.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.delete('/',passport.authenticate('clientAuth',{session:false}),deleteclient)

export =router