const {
    create,
    getUserByUserID,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserEmail,
    addEmployee,
    addUser,
} = require("./user.service");
const {genSaltSync,hashSync,compareSync}=require("bcrypt");
const {sign}=require("jsonwebtoken");


module.exports={
    login:(req,res)=>{   //login to the system
        const data=req.body;
        console.log(data)
        getUserByUserEmail(data.email,(err,results)=>{
            console.log("///////////////////////")
            console.log("-----"+results)
            console.log("---->"+results[0])
            
            if(err){
                console.log(err);
            }
            console.log(results)
            if(results==null){
                return res.json({
                    success:0,
                    data:"Invalid email or password"
                });
            }
            const result=compareSync(data.password,results[0].PasswordHash);
            if(result){
                results.PasswordHash=undefined;
                const jsontoken=sign({result:results},"qwe1234",{
                    expiresIn:"1h"
                });
                console.log("result > "+result);
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsontoken
                });
            }else{
                return res.json({
                    success:0,
                    data:"Invalid email or password"
                })
            }
        })
    },
    register:(req,res)=>{
        const body=req.body;
        try{
            const salt=genSaltSync(10);
            body.PasswordHash=hashSync(body.PasswordHash,salt);
        }catch(error){
            console.log('Error while hasing the password',error);
        }
        addEmployee(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database Connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        })
        addUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database Connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        })
    },

    createUser:(req,res)=>{
        const body=req.body;
        console.log(body.PasswordHash);
        console.log(body);
        try{
            const salt=genSaltSync(10);
            body.PasswordHash=hashSync(body.PasswordHash,salt);
        }catch(error){
            console.log('Error while hasing the password',error);
        }
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database Connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });
    },
    getUserByUserID:(req,res)=>{
        const userID=req.params.id;
        getUserByUserID(userID,(err,results)=>{
            if(err){
                console.log(err);
                return ;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not Found"
                });
            }
            return res.json({
                success:1,
                data:results
            })
        })
    },
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        })
    },
    updateUsers:(req,res)=>{
        const body=req.body;
        try{
            const salt=genSaltSync(10);
            body.PasswordHash=hashSync(body.PasswordHash,salt);
        }catch(error){
            console.log('Error whilte hasing the password',error);
        }
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return ;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Failed to update users"
                })
            }
            return res.json({
                success:1,
                message:"update successfully"
            })
        })
    },
    deleteUser:(req,res)=>{
        const data=req.body;
        deleteUser(data,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success:0,
                    message:"Record Not Found"
                })
            }
            return res.json({
                success:1,
                message:"user delected successfully"
            })
        })
    },
    
}