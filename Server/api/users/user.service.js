const pool=require("../../db/database");

module.exports={
    create:(data,callBack)=>{
        pool.query(
            `insert into useraccount(Username,Email,EmployeeID,PasswordHash,UserAccountLevelID) values(?,?,?,?,?)`,
            [
                data.Username,   //at the runtime ? will be repalce from these values
                data.Email,
                data.EmployeeID,
                data.PasswordHash,
                data.UserAccountLevelID
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    addUser:(data,callBack)=>{ //add a user account into database
        pool.query(
            `insert into useraccount(Username,Email,EmployeeID,PasswordHash,UserAccountLevelID) values(?,?,?,?,?)`,
            [
                data.UserID,
                data.Username,   //at the runtime ? will be repalce from these values
                data.Email,
                data.EmployeeID,
                data.PasswordHash,
                data.UserAccountLevelID
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    addEmployee:(data,callBack)=>{  //add a employee account into database
        pool.query(
            `insert into employee(EmployeeID,EmployeeName,DateOfBirth,Gender,MaritalStatus,Address,Country,DepartmentID,JobTitleID,PayGradeID,EmploymentStatusID,SupervisorID,EmergencyContactID) 
            values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.EmployeeID,
                data.EmployeeName,
                data.DateOfBirth,
                data.Gender,
                data.MaritalStatus,
                data.Address,
                data.Country,
                data.DepartmentID,
                data.JobTitleID,
                data.PayGradeID,
                data.EmploymentStatusID,
                data.SupervisorID,
                data.EmergencyContactID
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getUsers:(callBack)=>{
        pool.query(
            `select * from useraccount`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getUserByUserID:(UserID,callBack)=>{
        pool.query(
            `select * from useraccount where UserID=?`,
            [UserID],
            (error,results,fields)=>{
                console.log(results)
                if(error){
                    callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getUserByUserEmail:(Email,callBack)=>{
        console.log(Email)
        pool.query(
            `select * from useraccount where Email=?`,
            [Email],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateUser:(data, callBack) => {
        pool.query(
            `update useraccount set Username=?,Email=?,EmployeeID=?,PasswordHash=?,UserAccountLevelID=? where userID=?`,
            [
                data.Username,   //at the runtime ? will be repalce from these values
                data.Email,
                data.EmployeeID,
                data.PasswordHash,
                data.UserAccountLevelID,
                data.UserID
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
        `delete from useraccount where UserID = ?`,
        [data.UserID],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
        );
    }
};