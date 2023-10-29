const pool= require("../../db/database");

module.exports = {
    getEmployeeByDepartment: async(connection)=> {
        try {
            const query = `SELECT * FROM EmployeeByDepartment`;
            const result = await connection.query(query);
            return result[0];
        } catch (error) {
            console.error("Error while retrieving employees by department:", error);
            throw new Error("Couldn't fetch employee data by department");
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