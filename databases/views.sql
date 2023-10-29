DROP VIEW EmployeeByDepartment ;
DROP VIEW EmployeeReports;

CREATE VIEW EmployeeByDepartment AS
SELECT d.DepartmentName,COUNT(*) AS EmployeeCount
FROM employee e 
JOIN department d ON e.DepartmentID=d.DepartmentID
GROUP BY d.DepartmentName;

CREATE VIEW EmployeeReportGrpByJobDepPay AS
SELECT j.JobTitleName, d.DepartmentName, p.PayGradeName, COUNT(*) AS EmployeeCount
FROM employee e
JOIN department d ON e.DepartmentID = d.DepartmentID
JOIN paygrade p ON e.PayGradeID= p.PayGradeID
JOIN jobtitle j ON e.JobTitleID=j.JobTitleID
GROUP BY j.JobTitleName, d.DepartmentName, p.PayGradeName;

