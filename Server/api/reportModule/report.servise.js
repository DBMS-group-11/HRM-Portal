const pool= require("../../db/database");

module.exports = {
    getEmployeeByDepartment: async(connection)=> {
        console.log("___getEmployeeByDepartment")
        try {
            const query = `SELECT * FROM EmployeeByDepartment`;
            const result = await connection.query(query);
            return result[0];
        } catch (error) {
            console.error("Error while retrieving employees by department:", error);
            throw new Error("Couldn't fetch employee data by department");
        }
    },
    getEmployeeByJobtitle: async(connection)=> {
        console.log("___getEmployeeByJobtitle")
        try {
            const query = `SELECT * FROM EmployeeByJobtitle`;
            const result = await connection.query(query);
            return result[0];
        } catch (error) {
            console.error("Error while retrieving employees by Jobtitle:", error);
            throw new Error("Couldn't fetch employee data by Jobtitle");
        }
    },
    getEmployeeByPaygrade: async(connection)=> {
        console.log('___getEmployeeByPaygrade')
        try {
            const query = `SELECT * FROM EmployeeByPaygrade`;
            const result = await connection.query(query);
            return result[0];
        } catch (error) {
            console.error("Error while retrieving employees by Paygrade:", error);
            throw new Error("Couldn't fetch employee data by Paygrade");
        }
    },
    getEmployeeReportGrpByJobDepPay: async(connection)=> {
        try {
            const query = `SELECT * FROM EmployeeReportGrpByJobDepPay`;
            const result = await connection.query(query);
            return result[0];
        } catch (error) {
            console.error("Error while retrieving employees by department:", error);
            throw new Error("Couldn't fetch employee data by department");
        }
    }
    
}