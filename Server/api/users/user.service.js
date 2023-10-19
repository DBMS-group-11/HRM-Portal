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
    addUser: async (data) => {
        console.log('   ___addUser')
        try {
            const [results] = await pool.query(
                `INSERT INTO useraccount(UserID, Username, Email, EmployeeID, PasswordHash, UserAccountLevelID) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    data.UserID,
                    data.Username,
                    data.Email,
                    data.EmployeeID,
                    data.PasswordHash,
                    data.UserAccountLevelID
                ]
            );
            return Promise.resolve(results);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    addEmployee: async (data) => {
        console.log("___addEmployee")
        try {
            const [results] = await pool.query(
                `INSERT INTO employee(EmployeeID, EmployeeName, DateOfBirth, Gender, MaritalStatus, Address, Country, DepartmentID, JobTitleID, PayGradeID, EmploymentStatusID, SupervisorID, EmergencyContactID)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
                ]
            );
            return Promise.resolve(results);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    addEmergencyContact: async (data, callBack) => {
        console.log("___addEmergencyContact")
        // First, insert the emergency contact
        // console.log(data)
        const connection=await pool.getConnection(); //we use single connection because multiple quires available
        await connection.beginTransaction();
        
        try{
            // Insert emergency contact
            const [insertResults]=await connection.query(
                `INSERT INTO EmergencyContact(PrimaryName, PrimaryPhoneNumber, SecondaryName, SecondaryPhoneNumber, Address) 
                VALUES(?,?,?,?,?)`,
                [
                    data.name1,
                    data.telNo1,
                    data.name2,
                    data.telNo2,
                    data.Address
                ]
            );
            if(insertResults.affectedRows==0){
                console.log("   No rows inserted!");
                throw new Error("No rows inserted!");
            }
            // After successful insertion, fetch the most recently added EmergencyContactID
            const [selectResults] = await connection.query(
                `SELECT EmergencyContactID FROM EmergencyContact
                    ORDER BY EmergencyContactID DESC
                    LIMIT 1`
            );

            await connection.commit();
            connection.release();
            console.log("   ____EmergencyContact successfully inserted")    
            return Promise.resolve(selectResults[0]);
        }catch(error){
            console.log("   ____EmergencyContact inserted error: " + error)  
            await connection.rollback(); //rolls back any changes made to the database 
            connection.release(); // releases the database connection back to the connection pool
            return Promise.reject(error); //rejected Promise with the caught error as its reason
        }
    },
    // getUsers:(callBack)=>{
    //     console.log("prints")
    //     pool.query(
    //         `select * from useraccount`,
    //         [],
    //         (error,results,fields)=>{
    //             if(error){
    //                 return callBack(error);
    //             }
    //             return callBack(null,results);
    //         }
    //     )
    // },
    getUserss: async () => {
        console.log("___getUsers")
        try {
            const [results] = await pool.query('SELECT * FROM useraccount');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching users: ${error.message}`);
        }
    },
    
    getEmployees : async () => {
        console.log("___getEmployees")
        try {
            const [results] = await pool.query('SELECT EmployeeName FROM employee');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching employees: ${error.message}`);
        }
    },
    getDepartments: async () => {
        console.log("___getDepartments")
        try {
            const [results] = await pool.query('SELECT DepartmentName FROM department');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching departments: ${error.message}`);
        }
    },
    getSupervisors: async () => {
        console.log("___getSupervisors")
        try {
            const [results] = await pool.query('SELECT EmployeeName FROM employee');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching departments: ${error.message}`);
        }
    },
    getJobTitles: async () => {
        console.log("___getJobTitles")
        try{
            const [results] = await pool.query('SELECT JobTitleName FROM jobtitle');
            return results;
        } catch(error) {
            throw new Error(`An error occurred while fetching job titles: ${error.message}`);
        }
    },
    getCountries: async () => {
        console.log('___getCountries')
        try{
            const [results] = await pool.query("SELECT CountryName FROM country");
            return results;
        }catch(error){
            throw new Error(`An error occurred while fetching countries"+ ${error.message}`)
        }
    },
    getEmployeeStatus: async () => {
        console.log('___getEmployeeStatus')
        try{
            const [results] = await pool.query("SELECT EmploymentStatusName FROM employmentstatus");
            return results;
        }catch(error){
            throw new Error(`An error occurred while fetching countries"+ ${error.message}`)
        }
    },
    
    getJobTitles: async () => {
        console.log("___getJobTitles")
        try{
            const [results] = await pool.query('SELECT JobTitleName FROM jobtitle');
            return results;
        } catch(error) {
            throw new Error(`An error occurred while fetching job titles: ${error.message}`);
        }
    },
    getPayGrades: async () => {
        console.log("___getPayGrades")
        try{
            const [results] = await pool.query('SELECT PayGradeName FROM paygrade');
            return results;
        } catch(error) {
            throw new Error(`An error occurred while fetching job titles: ${error.message}`);
        }
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
    getUserByUserEmail_:(Email,callBack)=>{
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
    getUserByUserEmail: async (Email) => {
        console.log("  __getUserByUserEmail")
        try {
            const [results] = await pool.query(`SELECT * FROM useraccount WHERE Email = ?`, [Email]);
            // console.log(results)
            return results;
        } catch (error) {
            throw error;
        }
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