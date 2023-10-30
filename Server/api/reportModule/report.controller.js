const pool= require("../../db/database");

const {
    getEmployeeByDepartment,
    getEmployeeByJobtitle,
    getEmployeeByPaygrade,
    getEmployeeReportGrpByJobDepPay
}=require('./report.servise');

module.exports={
    reports : async (req, res) => {
        console.log("> reports");
        console.log(req.body);
    
        let connection;
    
        try {
            const reportNO = req.body.reportNO;
            // console.log(reportNO);
    
            connection = await pool.getConnection();
    
            if (reportNO == 1) {
                const result = await getEmployeeByDepartment(connection);
                
                return res.json({ success: 1, data: result });
            }else if(reportNO==3){
                const result1 = await getEmployeeByDepartment(connection);
                const result2 = await getEmployeeByJobtitle(connection);
                const result3 = await getEmployeeByPaygrade(connection);
                

                return res.json({ success: 1, data1: result1, data2: result2, data3: result3});
            } 
            else {
                return res.json({ success: 0, message: "Invalid report number" });
            }
        } catch (error) {
            console.error("Error in the reports route:", error);
            return res.status(500).json({ success: 0, error: "Internal server error" });
        } finally {
            console.log("<")
            if (connection) {
                connection.release(); 
            }
        }
    }
};