import { validationResult } from "express-validator"
import { conn } from "../database/connection"

export const getjob=(req:any,res:any)=>{
    const {id,userrole}=req.user.jwtdata
    let qry=`select j.*,u.name,u.email,u.phone,u.company_name,u.address,u.city,u.state,u.country,u.zipcode from job j inner join user u on u.id=j.client_id and u.role=1 where j.status=1`
    if(userrole==1){
        qry=`select j.*,u.name,u.email,u.phone,u.company_name,u.address,u.city,u.state,u.country,u.zipcode from job j inner join user u on u.id=j.client_id and u.role=1 where j.status=1 and j.client_id=${id}`
    }
    conn.query(qry,(err:any,resdata:any)=>{
        if(err){
            res.status(501).json({success:false,msg:"internal server error",err:err})
        }else{
            // Promise.all([]).then(data=>{

            // }).catch(e=>{
                res.json({success:true,msg:"All job get successfully.",data:resdata})
            // })
        }
    })
}

export const getjobbyid=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err:any) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        const {id,userrole}=req.user.jwtdata
        const {jobid}=req.body
        if(userrole==1){
            let qry=`select j.*,u.name,u.email,u.phone,u.company_name,u.address,u.city,u.state,u.country,u.zipcode from job j inner join user u on u.id=j.client_id and u.role=1 where j.status=1 and j.client_id=${id} and j.id=${jobid};select u.name,u.email,u.phone,u.address,u.city,u.state,u.country,u.zipcode from job_user j inner join user u on u.id=j.user_id where j.job_id=${jobid};`
            conn.query(qry,(err:any,resdata:any)=>{
                if(err){
                    res.status(501).json({success:false,msg:"internal server error",err:err})
                }else if(resdata[0].length==0){
                    res.status(201).json({success:false,msg:"Job not exists."})
                }else{
                    resdata[0][0]['applied']=resdata[1]
                    res.json({success:true,msg:"All job get successfully.",data:resdata[0][0]})
                }
            })
        }else{
            let qry=`select j.*,u.name,u.email,u.phone,u.company_name,u.address,u.city,u.state,u.country,u.zipcode from job j inner join user u on u.id=j.client_id and u.role=1 where j.status=1 and j.id=${jobid}`
            conn.query(qry,(err:any,resdata:any)=>{
                if(err){
                    res.status(501).json({success:false,msg:"internal server error",err:err})
                }else if(resdata.length==0){
                    res.status(201).json({success:false,msg:"Job not exists."})
                }else{
                    res.json({success:true,msg:"All job get successfully.",data:resdata})
                }
            })
        }
    }
}

export const applyjob=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err:any) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        const {id}=req.user.jwtdata
        const {jobid}=req.body
        conn.query('select count(*) as cnt from job where id=? and status=1',[jobid],(err:any,resdata:any)=>{
            if(err){
                res.status(501).json({success:false,msg:"internal server error",err:err})
            }else if(resdata.length==0){
                res.status(201).json({success:false,msg:"Job not exists."})
            }else{
                conn.query('insert into job_user(user_id,job_id) value(?,?)',[id,jobid],(err:any,resdata:any)=>{
                    if(err){
                        res.status(501).json({success:false,msg:"Internal server error.",err:err})
                    }else{
                        res.json({success:true,msg:"Job apply successfully."})
                    }
                })
            }
        })
    }
}
export const editjob=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        const {title,description,position,experience,no_of_hire,salary,job_type,job_end_date,work_remotely,jobid}=req.body
        const {id,userrole}=req.user.jwtdata
        conn.query('select count(*) as cnt from job where id=? and client_id=?',[jobid,id],(err:any,resdat:any)=>{
            if(err){
                res.status(501).json({success:false,msg:"internal server error",err:err})
            }else if(resdat[0]['cnt']==0){
                res.status(201).json({success:false,msg:"user not found."})
            }else{
                conn.query(`update job set title=?,description=?,position=?,experience=?,no_of_hire=?,salary=?,job_type=?,job_end_date=?,work_remotely=? where id=? and client_id=?`,[title,description,position,experience,no_of_hire,salary,job_type,job_end_date,work_remotely,jobid,id],(err:any,resdata:any)=>{
                    if(err){
                        res.status(501).json({success:false,msg:"internal server error",err:err})
                    }else{
                        res.json({success:true,msg:"Job edit successfully."})
                    }
                })
            }
        })
    }
}
export const addjob=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        const {title,description,position,experience,no_of_hire,salary,job_type,job_end_date,work_remotely}=req.body
        const {id}=req.user.jwtdata 
        conn.query(`insert into job(title,description,position,client_id,experience,no_of_hire,salary,job_type,job_end_date,work_remotely) value(?,?,?,?,?,?,?,?,?,?)`,[title,description,position,id,experience,no_of_hire,salary,job_type,job_end_date,work_remotely],(err:any,resdata:any)=>{
            if(err){
                res.status(501).json({success:false,msg:"internal server error",err:err})
            }else{
                res.json({success:true,msg:"Job add successfully."})
            }
        })
    }
}
export const deletejob=(req:any,res:any)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map((err:any) => ({ field: err.param, message: err.msg }));
        res.status(201).json({
            success: false,
            message: err[0].message
        });
        return;
    } else {
        const {id}=req.user.jwtdata
        const {jobid}=req.body
        conn.query('select count(*) as cnt from job where id=? and client_id=?',[jobid,id],(err:any,resdat:any)=>{
            if(err){
                res.status(501).json({success:false,msg:"Internal server error",err:err})
            }else if(resdat[0]['cnt']==0){
                res.status(201).json({success:false,msg:"Job not found."})
            }else{
                conn.query(`update job set status=2 where id=? and client_id=?`,[jobid,id],(err:any,resdata:any)=>{
                    if(err){
                        res.status(501).json({success:false,msg:"Internal server error",err:err})
                    }else{
                        res.json({success:true,msg:"Job delete successfully."})
                    }
                })
            }
        })
    }
}