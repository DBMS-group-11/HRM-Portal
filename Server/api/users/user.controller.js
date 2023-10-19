const {
    create,
    getUserByUserID,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserEmail,
    addEmployee,
    addUser,
    addEmergencyContact
} = require("./user.service");
const {genSaltSync,hashSync,compareSync}=require("bcrypt");
const {sign}=require("jsonwebtoken");

// Helper function for sending error response
const sendErrorResponse = (res, message) => {
    return res.status(500).json({
        success: 0,
        message,
    });
};

module.exports={
    login: async (req,res) => {   //login to the system - done
        console.log("> Login to system")
        const data=req.body;
        try{
            const { email, password } = req.body;
            const results = await getUserByUserEmail(email);
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password",
                });
            }
            const isValidPassword1 = compareSync(password, results[0].PasswordHash);
            const isValidPassword2=data.password==results[0].PasswordHash?true:false;
            if (isValidPassword1 || isValidPassword2) {
                // Token generation and response sending logic
                results.PasswordHash=undefined;
                const jsontoken=sign({result:results},"qwe1234",{
                    expiresIn:"1h"
                });
                //required response
                const values = {
                    UserID: results[0].UserID,
                    UserAccountLevelID: results[0].UserAccountLevelID
                };
                console.log("   ___login successful\n<")  
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsontoken,
                    values:values
                })
                
            }else{
                console.log("<")
                return res.json({
                    success:0,
                    data:"Invalid email or password"
                })
            }
        }catch(err){
            console.error(err);
            console.log("<")
            sendErrorResponse(res, "An error occurred during login");
        }
    },
    register: async (req, res) => { // Registration - done
        console.log("> Register")
        const body = req.body;
        try {
            // Add emergency contact
            const emergencyResult = await addEmergencyContact(body.emergencyInfo);
            const EmergencyContactID = emergencyResult.EmergencyContactID;
            // Prepare data for registration
            data = {
                "UserID": 5,
                "Username": body.personalInfo.username,
                "Email": body.personalInfo.email,
                "PasswordHash": "0000", //default password
                "UserAccountLevelID": 2,
    
                "EmployeeID": "E008",
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
    
                "EmergencyContactID": EmergencyContactID
            }
            // //Hash password
            // const salt = genSaltSync(10);
            // body.PasswordHash = hashSync(body.PasswordHash, salt);

            //Add employee
            const employeeResult = await addEmployee(data);
            //Add user
            const userResult = await addUser(data);
            console.log("<")
            return res.json({
                success: 1,
                data:{
                    user: userResult,
                    employee: employeeResult
                },
                message: "Registration successful",
            })
            
        } catch (error) {
            console.log(error)
            console.log("<")
            return res.status(500).json({
                success: 0,
                message: "An error occurred during registration",
            });
        }
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