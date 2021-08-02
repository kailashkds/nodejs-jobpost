import { validationResult } from "express-validator"
import { checkjobapply, checkjobuser, createJob, deleteJob, editjobs, getjobByID, getjobbyrole, getjobid, jobapply } from "../entity/job"
import { Job, Jobuser, User } from "../models"

export const getjob=async(req:any,res:any)=>{
    try {
        const {id,userrole}=req.user.jwtdata
        let resdata=await getjobbyrole(userrole,id)
        res.json({success:true,msg:"All job get successfully.",data:resdata})        
    } catch (e) {
        res.status(501).json({success:false,msg:"internal server error",err:e})
    }
}
export const getjobbyid=async(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err:any) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        try {
            const {id,userrole}=req.user.jwtdata
            const {jobid}=req.body
            let resdata=await getjobByID(userrole,id,jobid)
            res.json({success:true,msg:"Job get successfully.",data:resdata})
        } catch (error) {
            res.status(501).json({success:false,msg:"internal server error",err:error})
        }
    }
}

export const applyjob=async(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err:any) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        try {
            const {id}=req.user.jwtdata
            const {jobid}=req.body
            let jobi=await getjobid(jobid)
            let ujapply=await checkjobapply(id,jobid)
            if(!jobi){
                res.status(201).json({success:false,msg:"Job not exists."})
            }else if(ujapply){
                res.status(201).json({success:false,msg:"Already applied."})
            }else{
                let jbcreate=await jobapply(id,jobid)
                res.json({success:true,msg:"Job apply successfully."})
            }
        } catch (error) {
            res.status(501).json({success:false,msg:"internal server error",err:error})
        }
    }
}
export const editjob=async(req:any,res:any)=>{
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
            const {id,userrole}=req.user.jwtdata
            const {jobid}=req.body
            let checkjbuser=await checkjobuser(id,jobid)
            if(!checkjbuser){
                res.status(201).json({success:false,msg:"Job not found."})
            }else{
                let edjob=await editjobs(req,id)
                res.json({success:true,msg:"Job edit successfully."})
            }
        } catch (error) {
            res.status(501).json({success:false,msg:"Internal server error",err:error})
        }
    }
}
export const addjob=async(req:any,res:any)=>{
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
            let resdt=await createJob(req,id)     
            res.json({success:true,msg:"Job add successfully."})
        } catch (error) {
            res.status(501).json({success:false,msg:"internal server error",err:e})
        }
    }
}
export const deletejob=async(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err:any) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        try {
            const {id}=req.user.jwtdata
            const {jobid}=req.body
            let checkjbuser=await checkjobuser(id,jobid)
            if(!checkjbuser){
                res.status(201).json({success:false,msg:"Job not found."})
            }else{
                let dltjob=await deleteJob(id,jobid)
                res.json({success:true,msg:"Job delete successfully."})
            }
        } catch (error) {            
            res.status(501).json({success:false,msg:"internal server error",err:error})
        }
    }
}