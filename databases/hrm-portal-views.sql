-- DROP VIEW EmployeeByDepartment ;
-- DROP VIEW EmployeeByJobtitle ;
-- DROP VIEW EmployeeByPaygrade ;

CREATE VIEW EmployeeByDepartment AS
SELECT d.DepartmentName,COUNT(*) AS EmployeeCount
FROM employee e 
JOIN department d ON e.DepartmentID=d.DepartmentID
GROUP BY d.DepartmentName;

CREATE VIEW EmployeeByJobtitle AS
SELECT j.JobTitleName,COUNT(*) AS EmployeeCount
FROM employee e
JOIN jobtitle j ON e.JobTitleID =j.JobTitleID
GROUP BY JobTitleName;

CREATE VIEW EmployeeByPaygrade AS
SELECT p.PayGradeName,COUNT(*) AS EmployeeCount
FROM employee e
JOIN paygrade p ON e.PayGradeID =p.PayGradeID
GROUP BY PayGradeName;