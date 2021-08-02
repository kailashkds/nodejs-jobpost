import {Job, Jobuser, User} from '../models';
export const getjobbyrole=async (role:number,id:number)=>{
    if(role==2){
        return Job.findAll({
            where:{ client_id:id},
            include: [{
              model: User, required: true,attributes:["name","email","phone","company_name","address","city","state","country","zipcode"],as:"client"
            },{
                model: Jobuser,attributes:['id'],include:[{
                    model:User ,attributes:["name","email","phone","address","city","state","country","zipcode"]
                }]
            }]
        })
    }else{
        return Job.findAll({
            where:{status:1 },
            include: [{
              model: User, required: true,as:"client",where:{role:1},attributes:["name","email","phone","company_name","address","city","state","country","zipcode"]
            }]
        })
    }
}
export const getjobByID=async (role:number,id:number,jobid:number)=>{
    if(role==1){
        return Job.findAll({
            where:{ id:jobid },
            include: [{
              model: User, required: true,as:"client",attributes:["name","email","phone","company_name","address","city","state","country","zipcode"]
            },{
                model: Jobuser,attributes:['id'],include:[{
                    model:User,attributes:["name","email","phone","address","city","state","country","zipcode"]
                }]
            }]
        })
    }else{
        return Job.findAll({
            where:{ id:jobid },
            include: [{
              model: User, required: true,as:"client",where:{role:1},attributes:["name","email","phone","company_name","address","city","state","country","zipcode"]
            }]
        })
    }
}
export const getjobid=async (id:number)=>{
    return await Job.findOne({where:{id:id}})
}
export const checkjobapply=async (user_id:number,jobid:number)=>{
    return await Jobuser.findOne({where:{user_id:user_id,job_id:jobid}})
}
export const checkjobuser=async (client_id:number,id:number)=>{
    return await Job.findOne({where:{id:id,client_id:client_id}})
}
export const jobapply=async (id:number,jobid:number)=>{
    let obj={
        user_id:id,
        job_id:jobid
    }               
    return await Jobuser.create(obj)
}
export const editjobs=async(req:any,id:any)=>{
    const {title,description,position,experience,no_of_hire,salary,job_type,job_end_date,work_remotely,jobid}=req.body
    let jobobj={
        title:title,
        description:description,
        position:position,
        experience:experience,
        no_of_hire:no_of_hire,
        salary:salary,
        job_type:job_type,
        job_end_date:job_end_date,
        work_remotely:work_remotely
    }
    return await Job.update(jobobj,{where:{id:jobid,client_id:id}})
}

export const createJob=async(req:any,id:any)=>{
    const {title,description,position,experience,no_of_hire,salary,job_type,job_end_date,work_remotely}=req.body
    let jobobj={
        title:title,
        description:description,
        position:position,
        client_id:id,
        experience:experience,
        no_of_hire:no_of_hire,
        salary:salary,
        job_type:job_type,
        job_end_date:job_end_date,
        work_remotely:work_remotely
    }
    return await Job.create(jobobj)
}
export const deleteJob=async(id:number,jobid:number)=>{
    try {
        let userobj={
            status:2
        }
        return await Job.update(userobj,{where:{id:jobid,client_id:id}})
    } catch (error) {
        throw error
    }
}
