const pool = require("../../db/database");

async function findIDs(data) {
    console.log("___findIDs");
    const connection = await pool.getConnection();
    let newData = {};
    const queries = {
        'Country': 'SELECT CountryID FROM country WHERE CountryName=?',
        'JobTitleID': 'SELECT JobTitleID FROM jobtitle WHERE JobTitleName = ?',
        'DepartmentID': 'SELECT DepartmentID FROM department WHERE DepartmentName = ?',
        'PayGradeID': 'SELECT PayGradeID FROM paygrade WHERE PayGradeName = ?',
        'EmploymentStatusID': 'SELECT EmploymentStatusID FROM employmentstatus WHERE EmploymentStatusName =?',
        // 'EmergencyContactID': 'SELECT EmergencyContactID FROM emergencycontact WHERE EmergencyContactName =?',
        'SupervisorID': 'SELECT employeeID FROM employee WHERE EmployeeName =?',
    };
    // console.log("_____________________")
    // console.log(data)
    try {
        await connection.beginTransaction();
        for (const [key, query] of Object.entries(queries)) {
            const [result] = await connection.query(query, [data[key]]);
            if (result.length > 0) {
                Object.assign(newData, result[0]);
                // console.log(`${key}: ${JSON.stringify(result[0])}`);
            } else {
                console.log(`No result for ${key}`);
            }
        }
        // console.log(newData);
    } catch (err) {
        console.log("Error of fetching IDs from database");
    } finally {
        connection.release();
    }
    return newData;
}

module.exports = {
    addUser: async (connection, data) => {  //done
        console.log('___addUser')
        try {
            const UserAccountLevelID = await connection.query(
                "SELECT UserAccountLevelID FROM useraccountlevel WHERE UserAccountLevelName=?",
                [data.UserAccountLevelID]
            );
            data["UserAccountLevelID"] = UserAccountLevelID[0][0]["UserAccountLevelID"];

            const [results] = await connection.query(
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
            // console.log(data)
            console.log("User added Successfully")
            // return Promise.resolve(results);
            return results
        } catch (error) {
            console.log("Error")
            console.log(error)
            throw error;  // Propagate the error back to the caller
        }
    },
    addEmployee: async (connection,data) => { //done
        console.log("___addEmployee")
        // console.log(data)
        try {
            const newData = await findIDs(data);
            
            data['Country'] = newData['CountryID']
            data['JobTitleID'] = newData['JobTitleID']
            data['DepartmentID'] = newData['DepartmentID']
            data['PayGradeID'] = newData['PayGradeID']
            data['EmploymentStatusID'] = newData['EmploymentStatusID']
            data['SupervisorID'] = newData['employeeID']
            // console.log(data)

            const [results] = await connection.query(
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
            console.log("Employee added successfully")
            // return Promise.resolve(results);
            return results;
        } catch (error) {
            // return Promise.reject(error);
            console.log("Error")
            console.log(error)
            throw error;  // Propagate the error back to the caller
        }
    },
    addEmergencyContact: async (connection,data) => {  //done
        console.log("___addEmergencyContact")
        // First, insert the emergency contact
        // console.log(data)
        // const connection = await pool.getConnection(); //we use single connection because multiple quires available
        // await connection.beginTransaction();

        try {
            // Insert emergency contact
            const [insertResults] = await connection.query(
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
            if (insertResults.affectedRows == 0) {
                console.log("No rows inserted!");
                throw new Error("No rows inserted!");
            }
            // After successful insertion, fetch the most recently added EmergencyContactID
            const [selectResults] = await connection.query(
                `SELECT EmergencyContactID FROM EmergencyContact
                    ORDER BY EmergencyContactID DESC
                    LIMIT 1`
            );

            // await connection.commit();
            // connection.release();
            // return Promise.resolve(selectResults[0]);
            return selectResults[0];
        } catch (error) {
            // console.log("   ____EmergencyContact inserted error: " + error)
            // await connection.rollback(); //rolls back any changes made to the database 
            // connection.release(); // releases the database connection back to the connection pool
            // return Promise.reject(error); //rejected Promise with the caught error as its reason
            console.log('Error')
            console.log(error)
            throw error;  // Propagate the error back to the caller
        }
    },
    getUserss: async () => {
        console.log("___getUsers")
        try {
            const [results] = await pool.query('SELECT * FROM useraccount');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching users: ${error.message}`);
        }
    },
    getEmployees: async () => {
        console.log("___getEmployees")
        try {
            const [results] = await pool.query('SELECT EmployeeName FROM employee');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching employees: ${error.message}`);
        }
    },
    getDepartments: async () => { //done
        console.log("___getDepartments")
        try {
            const [results] = await pool.query('SELECT DepartmentName FROM department');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching departments: ${error.message}`);
        }
    },
    getSupervisors: async () => { //done
        console.log("___getSupervisors")
        try {
            const [results] = await pool.query('SELECT EmployeeID,EmployeeName FROM employee');
            // console.log(results)
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching departments: ${error.message}`);
        }
    },
    getJobTitles: async () => { //done
        console.log("___getJobTitles")
        try {
            const [results] = await pool.query('SELECT JobTitleName FROM jobtitle');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching job titles: ${error.message}`);
        }
    },
    getCountries: async () => { //done
        console.log('___getCountries')
        try {
            const [results] = await pool.query("SELECT CountryName FROM country");
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching countries"+ ${error.message}`)
        }
    },
    getEmployeeStatus: async () => { //done
        console.log('___getEmployeeStatus')
        try {
            const [results] = await pool.query("SELECT EmploymentStatusName FROM employmentstatus");
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching countries"+ ${error.message}`)
        }
    },
    getJobTitles: async () => { //done
        console.log("___getJobTitles")
        try {
            const [results] = await pool.query('SELECT JobTitleName FROM jobtitle');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching job titles: ${error.message}`);
        }
    },
    getPayGrades: async () => { //done
        console.log("___getPayGrades")
        try {
            const [results] = await pool.query('SELECT PayGradeName FROM paygrade');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching job titles: ${error.message}`);
        }
    },
    getTotTakenLeaveCount: async (userID) => {
        console.log("___getTotTakenLeaveCount");
        try {
            console.log(userID);
            const [results] = await pool.query(
                'SELECT count(*) as totLeaveCount FROM useraccount JOIN employee ON useraccount.EmployeeID = employee.EmployeeID JOIN `leave` ON employee.EmployeeID = leave.EmployeeID WHERE useraccount.UserID = ? AND leave.Approved=1',
                [userID]
            );
            // console.log(results);
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching total taken leave count: ${error.message}`);
        }
    } ,
    addDependent: async (connection,data) => { //done
        console.log("___addDependent")
        // console.log(data)
        try {
            const [results] = await connection.query(
                `insert into dependentinfo(EmployeeID,DependentName,DependentAge)
                values(?,?,?)`,
                [
                    data.EmployeeID,
                    data.DependentName,
                    data.DependentAge
                ]
            )
            console.log("depedent added successfully")
            return results; // Return results to the caller
        } catch (error) {
            console.log("Error occurred while adding dependent")
            throw new Error(`An error occurred while adding a dependent: ${error.message}`);
        }
    },
    getLastUserID: async(connection) => {
        console.log("___getLastUserID")
        try {
            const [results] = await connection.query('SELECT UserID FROM useraccount ORDER BY UserID DESC LIMIT 1');
            return results;
        } catch (error) {
            throw new Error(`An error occurred while fetching last user ID: ${error.message}`);
        }
    },
    getLastEmployeeID: async(connection) => {
        console.log("___getLastEmployeeID")
        try{
            const [results] = await connection.query('SELECT EmployeeID FROM employee ORDER BY EmployeeID DESC LIMIT 1');
            return results
        }catch(error){
            throw new Error(`An error occurred while fetching last employee ID: ${error.message}`);
        }
    },
    reqLeave: async (data) => {
        console.log("__reqLeave");
        try {
            const [results] = await pool.query(
                `INSERT INTO \`leave\` (LeaveLogDateTime, EmployeeID, Approved, Reason, LeaveType, FirstAbsentDate, LastAbsentDate, LeaveDayCount, ApprovedDateTime, ApprovedByID)
                VALUES (?, ?, 0, ?, ?, ?, ?, ?, null, null)`,
                [
                    data.LeaveLogDateTime,
                    data.EmployeeID,
                    data.reason,
                    data.leaveType,
                    data.fromDate,
                    data.toDate,
                    data.noOfDays,
                ]
            );
            console.log("Leave requested successfully");
            return results; // Return results to the caller
    
        } catch (error) {
            throw new Error(`An error occurred while requesting leave: ${error.message}`);
        }
    },    
    getUserByUserID: (UserID, callBack) => {
        pool.query(
            `select * from useraccount where UserID=?`,
            [UserID],
            (error, results, fields) => {
                console.log(results)
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUserByUserEmail: async (Email) => {
        console.log("__getUserByUserEmail")
        try {
            const [results] = await pool.query(`SELECT * FROM useraccount WHERE Email = ?`, [Email]);
            // console.log(results)
            return results;
        } catch (error) {
            throw error;
        }
    },
    getEmployeeIDByUserID: async (UserID) => {
        console.log("___getEmployeeIDByUserID");
        console.log(UserID);
    
        try {
            const [results] = await pool.query(`
                SELECT employee.EmployeeID
                FROM employee
                JOIN useraccount ON employee.EmployeeID = useraccount.EmployeeID
                WHERE useraccount.UserID = ?`,
                [UserID]
            );
    
            if (results.length === 0) {
                // No results found for the given UserID
                return null;
            }
    
            const employeeID = results[0].EmployeeID;
            // console.log(employeeID)
            return employeeID;
        } catch (error) {
            // Handle any database query errors here
            console.error("Error in getEmployeeIDByUserID:", error);
            throw error; // You may choose to handle or rethrow the error as needed
        }
    },
    getPersonalInfo : async (connection, data) => {
        console.log("___getPersonalInfo: Fetching personal info for EmployeeID:", data.EmployeeID);
        const sqlQuery = `
            SELECT 
                employee.EmployeeName,
                employee.EmployeeID,
                employee.Address,
                employee.Country,
                useraccount.Username,
                useraccount.Email,
                employee.DateOfBirth,
                employee.MaritalStatus,
                employee.Gender
            FROM useraccount 
            JOIN employee ON employee.EmployeeID = useraccount.EmployeeID
            WHERE employee.EmployeeID = ?
        `;
        try {
            const [results] = await connection.query(sqlQuery, [data.EmployeeID]);
            if(results.length == 0){
                return null;
            }
            return { personalInfo: results[0] };
        } catch (error) {
            console.error("Failed to fetch personal info:", error);
            throw new Error(`An error occurred while fetching personal info: ${error.message}`);
        }
    },
    getDependentInfo : async (connection, data) => {
        console.log("___getDependentInfo: Fetching dependent info for EmployeeID:", data.EmployeeID);
        const sqlQuery = `
            SELECT 
                DependentName, 
                DependentAge 
            FROM 
                dependentinfo 
            WHERE 
                EmployeeID = ?
        `;
        try {
            const [results] = await connection.query(sqlQuery, [data.EmployeeID]);
            if(results.length == 0){
                return null;
            }

            return results;
        } catch (error) {
            console.error("Failed to fetch dependent info:", error);
            throw new Error(`An error occurred while fetching dependent info: ${error.message}`);
        }
    },
    getJobTitleInfo : async (connection, data) => {
        console.log("___getJobTitleInfo: Fetching job title info for EmployeeID:", data.EmployeeID);
        const sqlQuery = `
            SELECT 
                jobtitle.JobTitleName 
            FROM 
                jobtitle 
            JOIN 
                employee ON employee.JobTitleID = jobtitle.JobTitleID 
            WHERE 
                employee.EmployeeID = ?
        `;
        try {
            const [results] = await connection.query(sqlQuery, [data.EmployeeID]);
            if(results.length == 0){
                return null;
            }
            return results;
        } catch (error) {
            console.error("Failed to fetch job title info:", error);
            throw new Error(`An error occurred while fetching job title info: ${error.message}`);
        }
    },
    getDepartmentInfo : async (connection, data) => {
        console.log("___getDepartmentInfo: Fetching department info for EmployeeID:", data.EmployeeID);
        const sqlQuery = `
            SELECT 
                DepartmentName 
            FROM 
                department 
            JOIN 
                employee ON department.DepartmentID = employee.DepartmentID 
            WHERE 
                employee.EmployeeID = ?
        `;
        try {
            const [results] = await connection.query(sqlQuery, [data.EmployeeID]);
            if(results.length == 0){
                return null;
            }
            return results[0];
        } catch (error) {
            console.error("Failed to fetch department info:", error);
            throw new Error(`An error occurred while fetching department info: ${error.message}`);
        }
    },
    getSupervisorsInfo: async(connection, data) => {
        console.log("___getSupervisorsInfo: Fetching supervisor info for EmployeeID:", data.EmployeeID);
    
        const sqlQuery = `
            SELECT 
                supervisor.EmployeeName AS SupervisorName, 
                supervisor.EmployeeID AS SupervisorID 
            FROM 
                employee AS e
            JOIN 
                employee AS supervisor ON e.SupervisorID = supervisor.EmployeeID
            WHERE 
                e.EmployeeID = ?
        `;
    
        try {
            const [results] = await connection.query(sqlQuery, [data.EmployeeID]);
            if(results.length == 0){
                return null;
            }
            return results[0];  // Assuming an employee has only one supervisor.
        } catch (error) {
            console.error("Failed to fetch supervisor info:", error);
            throw new Error(`An error occurred while fetching supervisor info: ${error.message}`);
        }
    },    
    getEmployeeStatusInfo : async (connection, data) => {
        console.log("___getEmployeeStatusInfo: Fetching employee status info for EmployeeID:", data.EmployeeID);
        const sqlQuery = `
            SELECT 
                EmploymentStatusName 
            FROM 
                employmentstatus 
            JOIN 
                employee ON employee.EmploymentStatusID = employmentstatus.EmploymentStatusID 
            WHERE 
                employee.EmployeeID = ?
        `;
        try {
            const [results] = await connection.query(sqlQuery, [data.EmployeeID]);
            if(results.length == 0){
                return null;
            }
            return results;
        } catch (error) {
            console.error("Failed to fetch employee status info:", error);
            throw new Error(`An error occurred while fetching employee status info: ${error.message}`);
        }
    },
    getPayGradesInfo : async (connection, data) => {
        console.log("___getPayGradesInfo: Fetching paygrade info for EmployeeID:", data.EmployeeID);
        const sqlQuery = `
            SELECT 
                PayGradeName 
            FROM 
                paygrade 
            JOIN 
                employee ON employee.PayGradeID = paygrade.PayGradeID 
            WHERE 
                employee.EmployeeID = ?
        `;
        try {
            const [results] = await connection.query(sqlQuery, [data.EmployeeID]);
            if(results.length == 0) {
                return null;
            }
            return results;
        } catch (error) {
            console.error("Failed to fetch paygrade info:", error);
            throw new Error(`An error occurred while fetching paygrade info: ${error.message}`);
        }
    },
    getEmergencyInfo : async (connection, data) => {
        console.log('___getEmergencyInfo: Fetching emergency info for EmployeeID:', data.EmployeeID);
        const sqlQuery = `
            SELECT 
                emergencycontact.PrimaryName,
                emergencycontact.PrimaryPhoneNumber,
                emergencycontact.SecondaryName,
                emergencycontact.SecondaryPhoneNumber,
                emergencycontact.Address 
            FROM 
                emergencycontact 
            JOIN 
                employee ON emergencycontact.EmergencyContactID = employee.EmergencyContactID
            WHERE 
                employee.EmployeeID = ?
        `;
        try {
            const [results] = await connection.query(sqlQuery, [data.EmployeeID]);
            if(results.length == 0){
                return null;
            }
            return results;
        } catch (error) {
            console.error("Failed to fetch emergency info:", error);
            throw new Error(`An error occurred while fetching emergency info: ${error.message}`);
        }
    }    
};