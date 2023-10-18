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
    login:(req,res) => {   //login to the system - done
        const data=req.body;
        getUserByUserEmail(data.email,(err,results)=>{            
            if(err){
                console.log(err);
            }
            console.log("--------------------------------------------");
            console.log("Results ::"+results)
            console.log(results)
            if(results==null){
                return res.json({
                    success:0,
                    data:"Invalid email or password"
                });
            }
            const result1=compareSync(data.password,results[0].PasswordHash);
            const result2=data.password==results[0].PasswordHash?true:false;
            if(result1 || result2){
                results.PasswordHash=undefined;
                const jsontoken=sign({result:results},"qwe1234",{
                    expiresIn:"1h"
                });
                //required response
                const values = {
                    UserID: results[0].UserID,
                    UserAccountLevelID: results[0].UserAccountLevelID
                };
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsontoken,
                    values:values
                });
            }else{
                return res.json({
                    success:0,
                    data:"Invalid email or password"
                })
            }
        })
    },
    register:(req, res) => { // Registration - done
        var body = req.body;
        console.log("-----------------------------------------------------------------");
        console.log(body);

        data = {
            "UserID": 5,
            "Username": body.personalInfo.username,
            "Email": body.personalInfo.email,
            "PasswordHash": "0000", //default password
            "UserAccountLevelID": 2,

            "EmployeeID": "E007",
            "EmployeeName": body.personalInfo.name,
            "DateOfBirth": body.personalInfo.dob,
            "Gender": body.personalInfo.gender,
            "MaritalStatus": body.personalInfo.maritalStatus,

            "Address":body.personalInfo.address,
            "Country": body.personalInfo.country,
            "DepartmentID": body.departmentInfo.department,
            "JobTitleID": body.departmentInfo.jobTitle,
            "PayGradeID": body.departmentInfo.payGrade,
            "EmploymentStatusID": body.departmentInfo.status,
            "SupervisorID":  body.departmentInfo.supervisor,
            "EmergencyContactID": 1
        }
        body=data
        console.log("_______________________________________________________________________________") //
        console.log(body)
        
        console.log("-----------------------------------------------------------------");
        try {
            const salt = genSaltSync(10);
            body.PasswordHash = hashSync(body.PasswordHash, salt); //hash the password
        } catch (error) {
            console.log('Error while hashing the password', error);
            return res.status(500).json({
                success: 0,
                message: "Error while hashing the password",
            });
        }
        //----------------------------------------
        // Add user and employee
        addEmployee(body, (err, employeeResult) => {
            // console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error",
                });
            }else{
                // Assuming employee was added successful, you can now add the addUser
                addUser(body, (err, userResult) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database Connection error",
                        });
                    }else{
                        return res.status(200).json({
                            success: 1,
                            data: {
                                user: userResult,
                                employee: employeeResult,
                            },
                            message: "User and employee added successfully",
                        });
                    }
                });
            }
        });
    },
    myAccount:(req, res) => {

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