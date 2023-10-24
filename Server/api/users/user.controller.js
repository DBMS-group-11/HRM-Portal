const pool = require('../../db/database');
const {
    create,
    getUserByUserID,
    getUserss,
    updateUser,
    deleteUser,
    getUserByUserEmail,
    addEmployee,
    addUser,
    addEmergencyContact,
    getSupervisors,
    getDepartments,
    getJobTitles,
    getCountries,
    getEmployeeStatus,
    getPayGrades,
    addDependent,

    getLastUserID,
    getLastEmployeeID,
    reqLeave,
    getEmployeeIDByUserID,

    getTotTakenLeaveCount
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

// Helper function for sending error response
const sendErrorResponse = (res, message) => {
    return res.status(500).json({
        success: 0,
        message,
    });
};

module.exports = {
    homeSub: (req, res) =>{
        console.log('> HomeSub')
        const data = req.body
        
    },
    login: async (req, res) => {   //login to the system - done
        console.log("> Login to system")

        const data = req.body;
        // console.log(data)
        try {
            const { email, password } = req.body;

            // console.log(email)
            // console.log(password)
            const results = await getUserByUserEmail(email);
            // console.log(results)
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password",
                });
            }
            const isValidPassword1 = compareSync(password, results[0].PasswordHash);
            const isValidPassword2 = data.password == results[0].PasswordHash ? true : false;
            if (isValidPassword1 || isValidPassword2) {
                // Token generation and response sending logic
                results.PasswordHash = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
        
                //required response
                const values = {
                    UserID: results[0].UserID,
                    EmployeeID:results[0].EmployeeID,
                    UserAccountLevelID: results[0].UserAccountLevelID
                };
                // console.log(values)
                console.log("   ___login successful\n<")
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    values: values
                })

            } else {
                console.log("<")
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
        } catch (err) {
            console.error(err);
            console.log("<")
            sendErrorResponse(res, "An error occurred during login");
        }
    },
    register: async (req, res) => { // Registration - done
        console.log("> Register");
        const body = req.body;
        // console.log(body);
        let connection;
        try {
            //Get a connection from the pool
            connection = await pool.getConnection();

            //Start transaction
            await connection.beginTransaction();

            // Add emergency contact
            const emergencyResult = await addEmergencyContact(connection, body.emergencyInfo);
            const EmergencyContactID = emergencyResult.EmergencyContactID;

            const lastUserIDResult = await getLastUserID(connection); //get UserID of last Added user
            // console.log(lastUserIDResult)
            var UserID = parseInt(lastUserIDResult[0]['UserID']) + 1;
            // console.log(lastUserID)
            const lastEmployeeResult = await getLastEmployeeID(connection); //get Last Employee ID of last Added employee
            var EmployeeID = lastEmployeeResult[0]['EmployeeID'];
            // console.log(EmployeeID);

            const parts = EmployeeID.split('-');
            var integerPart = parseInt(parts[1]);
            integerPart++;
            integerPart = integerPart.toString().padStart(4, '0');
            var EmployeeID = parts[0] + '-' + integerPart;

            // console.log(EmployeeID);

            // Prepare data for registration
            data = {
                "UserID": UserID,
                "Username": body.personalInfo.username,
                "Email": body.personalInfo.email,
                "PasswordHash": "0000", //default password
                "UserAccountLevelID": body.personalInfo.userAccountType,

                "EmployeeID": EmployeeID,
                "EmployeeName": body.personalInfo.name,
                "DateOfBirth": body.personalInfo.dob,
                "Gender": body.personalInfo.gender,
                "MaritalStatus": body.personalInfo.maritalStatus,

                "Address": body.personalInfo.address,
                "Country": body.personalInfo.country,
                "DepartmentID": body.departmentInfo.department,
                "JobTitleID": body.departmentInfo.jobTitle,
                "PayGradeID": body.departmentInfo.payGrade,
                "EmploymentStatusID": body.departmentInfo.status,
                "SupervisorID": body.departmentInfo.supervisor,

                "EmergencyContactID": EmergencyContactID
            }
            dependentInfo = {
                "EmployeeID": data.EmployeeID,
                "DependentName": body.personalInfo.dependentName,
                "DependentAge": body.personalInfo.dependentAge
            }
            // //Hash password
            // const salt = genSaltSync(10);
            // body.PasswordHash = hashSync(body.PasswordHash, salt);

            //Add employee
            const employeeResult = await addEmployee(connection, data);
            //Add user
            const userResult = await addUser(connection, data);
            //Add dependent
            const dependentResult = await addDependent(connection, dependentInfo);

            //Commit transaction
            await connection.commit();

            console.log("<")
            return res.json({
                success: 1,
                data: {
                    user: userResult,
                    employee: employeeResult,
                    dependentResult: dependentResult
                },
                message: "Registration successful",
            })

        } catch (error) {
            //Rollback the transaction if any query fails
            if (connection) {
                await connection.rollback();
            }
            console.log(error)
            console.log("<")
            return res.status(500).json({
                success: 0,
                message: "An error occurred during registration",
            });
        } finally {
            if (connection) {
                connection.release();
            }
        }
    },
    getRegisterSub : async (req, res) => {
        console.log("___getRegisterSub")
        try {
            const [
                departments,
                supervisors,
                jobTitles,
                countries,
                EmployeeStatuses,
                PayGrades
            ] = await Promise.all([
                getDepartments(),
                getSupervisors(),
                getJobTitles(),
                getCountries(),
                getEmployeeStatus(),
                getPayGrades()
            ]);
    
            return res.json({
                departments,
                supervisors,
                jobTitles,
                countries,
                EmployeeStatuses,
                PayGrades
            });
        } catch (error) {
            console.error("Actual error:", error); // Log the actual error
            return res.status(500).json({
                error: "An error occurred while fetching registration data"
            });
        }
    },
    myAccount: async (req, res) => {
        console.log(">myAccount");
        console.log(req.body)
        const userID = req.body["userID"];
        const EmployeeID=req.body["EmployeeID"];
        // console.log(EmployeeID)
        try {
            const connection = await pool.getConnection();

            const [personalInfo, departmentInfo, emergencyInfo, supervisor] = await Promise.all([
                connection.query(`
                    SELECT 
                        employee.EmployeeName,
                        employee.EmployeeID,
                        employee.Address,
                        employee.Country,
                        useraccount.Username,
                        useraccount.Email,
                        useraccountlevel.UserAccountLevelName,
                        employee.DateOfBirth,
                        employee.MaritalStatus,
                        employee.Gender,
                        dependentinfo.DependentName,
                        dependentinfo.DependentAge
                    FROM 
                        useraccount 
                    JOIN 
                        employee on useraccount.EmployeeID = employee.EmployeeID
                    JOIN 
                        dependentinfo on dependentinfo.EmployeeID = employee.EmployeeID
                    JOIN 
                        useraccountlevel on useraccount.UserAccountLevelID = useraccountlevel.UserAccountLevelID
                    WHERE 
                        useraccount.userID = ?`, [userID]
                ),
                connection.query(`
                    SELECT 
                        jobtitle.JobTitleName,
                        department.DepartmentName,
                        employmentstatus.EmploymentStatusName,
                        paygrade.PayGradeName
                    FROM 
                        useraccount
                    JOIN 
                        employee ON useraccount.EmployeeID = employee.EmployeeID
                    JOIN 
                        jobtitle ON jobtitle.JobTitleID = employee.JobTitleID
                    JOIN 
                        department ON department.DepartmentID = employee.DepartmentID
                    JOIN     
                        employmentstatus ON employmentstatus.EmploymentStatusID = employee.EmploymentStatusID
                    JOIN 
                        paygrade ON paygrade.PayGradeID = employee.PayGradeID
                    WHERE 
                        useraccount.userID = ?`, [userID]
                ),
                connection.query(`
                    SELECT 
                        emergencycontact.PrimaryName,
                        emergencycontact.PrimaryPhoneNumber,
                        emergencycontact.SecondaryName,
                        emergencycontact.SecondaryPhoneNumber,
                        emergencycontact.Address
                    FROM 
                        useraccount
                    JOIN 
                        employee ON useraccount.EmployeeID = employee.EmployeeID
                    JOIN 
                        emergencycontact ON emergencycontact.EmergencyContactID = employee.EmergencyContactID
                    WHERE 
                        useraccount.userID = ?`, [userID]
                ),
                connection.query(`
                    SELECT 
                        t.EmployeeName
                    FROM
                        useraccount
                    JOIN 
                        employee ON useraccount.EmployeeID = employee.EmployeeID
                    JOIN
                        employee as t ON employee.SupervisorID = t.EmployeeID
                    WHERE 
                        useraccount.userID = ?`, [userID]
                )
            ]);

            connection.release();

            return res.json({
                success: 1,
                message: "My account accessed successfully",
                personalInfo: personalInfo[0],
                supervisor: supervisor[0],
                departmentInfo: departmentInfo[0],
                emergencyInfo: emergencyInfo[0]
            });

        } catch (error) {
            console.error("Actual error:", error);
            return res.status(500).json({
                success: 0,
                message: "An error occurred while accessing my account"
            });
        }
    },
    createUser: (req, res) => {
        const body = req.body;
        console.log(body.PasswordHash);
        console.log(body);
        try {
            const salt = genSaltSync(10);
            body.PasswordHash = hashSync(body.PasswordHash, salt);
        } catch (error) {
            console.log('Error while hasing the password', error);
        }
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserByUserID: (req, res) => {
        const userID = req.params.id;
        getUserByUserID(userID, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getUsers: async (req, res) => {
        console.log(">getUsers")
        try {
            const results = await getUserss();
            return res.json({
                results
            });
        } catch (error) {
            console.error("Actual error:", error); // Log the actual error
            return res.status(500).json({
                error: "An error occurred while fetching users"
            });
        }
    },
    updateUsers: (req, res) => {
        const body = req.body;
        try {
            const salt = genSaltSync(10);
            body.PasswordHash = hashSync(body.PasswordHash, salt);
        } catch (error) {
            console.log('Error whilte hasing the password', error);
        }
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update users"
                })
            }
            return res.json({
                success: 1,
                message: "update successfully"
            })
        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "user delected successfully"
            })
        })
    },
    getReqLeaveSub: async (req, res) => {
        console.log(">getReqLeaveSub");
        // console.log(req.body)
        const userID = req.body['userID']
        // console.log(userID)
        try {
            const totLeaveCountArray = await getTotTakenLeaveCount(userID);
            const totLeaveCount = totLeaveCountArray[0]["totLeaveCount"];

            // Construct the result object
            const result = {
                totTakenApprovedLeaveCount: totLeaveCount
            };
            // console.log(result);
            return res.json({
                success: 1,
                result
            });
        } catch (error) {
            console.error("Actual error:", error);
            return res.status(500).json({
                error: "An error occurred while fetching leave count"
            });
        }
    },
    reqALeave : async (req, res) =>{
        console.log(">reqALeave")
        const data=req.body;
        // console.log(data)
        try{
            // console.log(data['UserID']);
            // const EmployeeID = await getEmployeeIDByUserID(data['UserID']);
            // data["EmployeeID"]=EmployeeID
            // console.log(data)
            const result=await reqLeave(data);
            // console.log(result);
            return res.status(200).json({
                success: 1,
                result : result
            })
        }catch(err){
            return res.json({
                success: 0,
                message: err.message
            })
        }
    }
}