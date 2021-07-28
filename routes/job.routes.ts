import express from 'express';
import passport from "passport";
import { check, validationResult } from "express-validator";
import { addjob, applyjob, deletejob, editjob, getjob, getjobbyid } from '../controller/job.controller';
var router=express.Router()
/**
* get all job.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.get('/',passport.authenticate('Auth',{session:false}),getjob)
/**
* get  job detail by id.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.post('/getdetail',[
    passport.authenticate('Auth',{session:false}),
    check('jobid').exists()
],getjobbyid)

/**
* add job.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.post('/',[
    passport.authenticate('clientAuth',{session:false}),
    check('title').exists(),
    check('description').exists(),
    check('position').exists(),
    check('experience').exists(),
    check('no_of_hire').exists(),
    check('salary').exists(),
    check('job_type').exists(),
    check('job_end_date').exists(),
    check('work_remotely').exists()
],addjob)
/**
* user apply for job.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.post('/applyjob',[
    passport.authenticate('userAuth',{session:false}),
    check('jobid').exists()
],applyjob)
/**
* edit job.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.put('/',[
    passport.authenticate('clientAuth',{session:false}),
    check('jobid').exists(),
    check('title').exists(),
    check('description').exists(),
    check('position').exists(),
    check('experience').exists(),
    check('no_of_hire').exists(),
    check('salary').exists(),
    check('job_type').exists(),
    check('job_end_date').exists(),
    check('work_remotely').exists()
],editjob)
/**
* delete job.
*
* @author  Arjun
* @version 1.0
* @since   2021-07-27 
*/
router.delete('/',[
    passport.authenticate('clientAuth',{session:false}),
    check('jobid').exists()
],deletejob)
export=router