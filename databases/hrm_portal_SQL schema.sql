drop database hrm_portal; 

create database if not exists hrm_portal;
use hrm_portal;

-- Create schema hrm-portal;
-- -------------------------------------------------------------------------------
CREATE TABLE if not exists `Organization`(
  `OrganizationID` NUMERIC(10,0),
  `Name` VARCHAR(20),
  `Address` VARCHAR(50),
  `RegistrationNumber` VARCHAR(10),
  PRIMARY KEY (`OrganizationID`)
);
CREATE TABLE if not exists `Country` (
  `CountryID` NUMERIC(10,0), 
  `CountryName` VARCHAR(20),
  PRIMARY KEY (`CountryID`)
);
CREATE TABLE if not exists `Branch` (
  `BranchID` NUMERIC(10,0), 
  `BranchName` VARCHAR(20),
  `CountryID` NUMERIC(10,0),
  `OrganizationID` NUMERIC(10,0),
  PRIMARY KEY (`BranchID`),
  FOREIGN KEY (`OrganizationID`) REFERENCES `Organization`(`OrganizationID`),
  FOREIGN KEY (`CountryID`) REFERENCES `Country`(`CountryID`)
);
-- -------------------------------------------------------------------------------
CREATE TABLE if not exists `PayGrade` (
  `PayGradeID` 	NUMERIC(10,0),
  `PayGradeName` VARCHAR(20),
  `AnnualLeaveCount` NUMERIC(3,0),
  `CasualLeaveCount` NUMERIC(3,0),
  `MaternityLeaveCount` NUMERIC(3,0),
  `PayLeaveCount` NUMERIC(3,0),
  PRIMARY KEY (`PayGradeID`)
);
-- -------------------------------------------------------------------------------
CREATE TABLE if not exists `EmergencyContact` (
  `EmergencyContactID` INT AUTO_INCREMENT,
  `PrimaryName` VARCHAR(20),
  `PrimaryPhoneNumber` NUMERIC(20,0),
  `SecondaryName` VARCHAR(50),
  `SecondaryPhoneNumber` NUMERIC(20,0),
  `Address` VARCHAR(100),
  PRIMARY KEY (`EmergencyContactID`)
);
CREATE TABLE if not exists `Department` (
  `DepartmentID` VARCHAR(10),
  `DepartmentName` VARCHAR(40),
  PRIMARY KEY (`DepartmentID`)
);
CREATE TABLE if not exists `JobTitle` (
  `JobTitleID` NUMERIC(10,0), 
  `JobTitleName` VARCHAR(20),
  PRIMARY KEY (`JobTitleID`)
);
CREATE TABLE if not exists `EmploymentStatus` (
  `EmploymentStatusID` NUMERIC(10,0),
  `EmploymentStatusName` VARCHAR(20),
  PRIMARY KEY (`EmploymentStatusID`)
);
CREATE TABLE if not exists `Employee` (
  `EmployeeID` VARCHAR(10),  
  `EmployeeName` VARCHAR(20),
  `DateOfBirth` DATE,
  `Gender` ENUM('Male','Female'),
  `MaritalStatus` ENUM('Married','Unmarried'),
  `Address` VARCHAR(2000),
  `Country` VARCHAR(20),
  `DepartmentID` VARCHAR(10),
  `JobTitleID` NUMERIC(10,0),
  `PayGradeID` NUMERIC(10,0),
  `EmploymentStatusID` NUMERIC(10,0),
  `SupervisorID` VARCHAR(10),
  `EmergencyContactID` INT AUTO_INCREMENT,
  PRIMARY KEY (`EmployeeID`),
  FOREIGN KEY (`DepartmentID`) REFERENCES `Department`(`DepartmentID`),
  FOREIGN KEY (`JobTitleID`) REFERENCES `JobTitle`(`JobTitleID`),
  FOREIGN KEY (`PayGradeID`) REFERENCES `PayGrade`(`PayGradeID`),
  FOREIGN KEY (`EmploymentStatusID`) REFERENCES `EmploymentStatus`(`EmploymentStatusID`),
  FOREIGN KEY (`SupervisorID`) REFERENCES `Employee`(`EmployeeID`),
  FOREIGN KEY (`EmergencyContactID`) REFERENCES `EmergencyContact`(`EmergencyContactID`)
);
CREATE TABLE if not exists `DependentInfo` (
  `DependentInfoID` INT AUTO_INCREMENT, 
  `EmployeeID` VARCHAR(10),
  `DependentName` VARCHAR(20),
  `DependentAge` NUMERIC(10,0),
  PRIMARY KEY (`DependentInfoID`),
  FOREIGN KEY (`EmployeeID`) REFERENCES `Employee`(`EmployeeID`)
);
-- ------------------------------------------------------------------------------
CREATE TABLE if not exists `UserAccountLevel` (
  `UserAccountLevelID` NUMERIC(10,0),
  `UserAccountLevelName` VARCHAR(32),
  `OwnProfileDetailsAccess` ENUM('NO','VIEW','EDIT'),
  `EveryProfileDetailsAccess` ENUM('NO','VIEW','EDIT'),
  `LeaveApproveAccess` ENUM('NO','VIEW','EDIT'),
  PRIMARY KEY (`UserAccountLevelID`)
);
CREATE TABLE if not exists `UserAccount` (
  `UserID` NUMERIC(10,0),
  `Username` VARCHAR(32) UNIQUE,
  `EmployeeID` VARCHAR(10),
  `Email` VARCHAR(64) UNIQUE,
  `PasswordHash` VARCHAR(100),
  `UserAccountLevelID` NUMERIC(10,0),
  PRIMARY KEY (`UserID`),
  FOREIGN KEY (`EmployeeID`) REFERENCES `Employee`(`EmployeeID`),
  FOREIGN KEY (`UserAccountLevelID`) REFERENCES `UserAccountLevel`(`UserAccountLevelID`)
);
-- -------------------------------------------------------------------------------
CREATE TABLE if not exists `Leave` (
  `LeaveID` INT auto_increment,
  `LeaveLogDateTime` DATETIME,
  `EmployeeID` VARCHAR(10),
  `Approved` BOOLEAN, 
  `Reason` VARCHAR(100),
  `LeaveType` ENUM('Annual', 'Casual', 'Maternity', 'No-Pay'),
  `FirstAbsentDate` DATE,
  `LastAbsentDate` DATE,
  `LeaveDayCount` NUMERIC(3,0),
  `ApprovedDateTime` DATETIME,
  `ApprovedByID` VARCHAR(10),
  PRIMARY KEY (`LeaveID`),
  FOREIGN KEY (`ApprovedByID`) REFERENCES `Employee`(`EmployeeID`),
  FOREIGN KEY (`EmployeeID`) REFERENCES `Employee`(`EmployeeID`)
);
CREATE TABLE if not exists `Salary` (
  `SalaryID` NUMERIC(10,0),
  `JobTitleID` NUMERIC(10,0),
  `EmploymentStatusID` NUMERIC(10,0), 
  `PayGradeID` NUMERIC(10,0),
  `Salary` NUMERIC(10,3),
  PRIMARY KEY (`SalaryID`),
  FOREIGN KEY (`JobTitleID`) REFERENCES `JobTitle`(`JobTitleID`),
  FOREIGN KEY (`PayGradeID`) REFERENCES `PayGrade`(`PayGradeID`),
  FOREIGN KEY (`EmploymentStatusID`) REFERENCES `EmploymentStatus`(`EmploymentStatusID`)
);
-- --------Triggers------------------------------------------------------------------------------

DELIMITER //

CREATE TRIGGER `before_employee_delete`
BEFORE DELETE ON `Employee`
FOR EACH ROW
BEGIN
    -- Delete related records in the DependentInfo table
    DELETE FROM `DependentInfo` WHERE `EmployeeID` = OLD.EmployeeID;
    
    -- Delete related records in the UserAccount table
    DELETE FROM `UserAccount` WHERE `EmployeeID` = OLD.EmployeeID;
    
    -- Set NULL to supervisor references in Employee table
    UPDATE `Employee` SET `SupervisorID` = NULL WHERE `SupervisorID` = OLD.EmployeeID;
    
    -- Delete related records in the Leave table
    DELETE FROM `Leave` WHERE `EmployeeID` = OLD.EmployeeID OR `ApprovedByID` = OLD.EmployeeID;
    
    -- Add any other related table cleanup logic here as needed
END;

//

DELIMITER ;


DELIMITER //

CREATE TRIGGER `before_useraccount_insert_check_email`
BEFORE INSERT ON `UserAccount`
FOR EACH ROW
BEGIN
    -- Check if the email already exists
    IF EXISTS (SELECT 1 FROM `UserAccount` WHERE `Email` = NEW.Email) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Duplicate email detected!';
    END IF;
END;
//
DELIMITER ;

-- Create AuditLog table for tracking deleted employees
CREATE TABLE if not exists `AuditLog` (
  `LogID` INT AUTO_INCREMENT,
  `Action` VARCHAR(50),
  `TableName` VARCHAR(50),
  `RecordID` VARCHAR(20),
  `Timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`LogID`)
);

-- Trigger to add entry to AuditLog when an Employee is deleted
DELIMITER //

CREATE TRIGGER `after_employee_delete`
AFTER DELETE ON `Employee`
FOR EACH ROW
BEGIN
    INSERT INTO `AuditLog` (`Action`, `TableName`, `RecordID`) 
    VALUES ('DELETE', 'Employee', OLD.EmployeeID);
END;

//

DELIMITER ;

-- Trigger to check leave count before inserting a new leave
DELIMITER //

CREATE TRIGGER `before_leave_insert`
BEFORE INSERT ON `Leave`
FOR EACH ROW
BEGIN
    DECLARE available_leave_count INT;
    DECLARE paygrade_id NUMERIC(10,0);
    
    -- Get the PayGradeID for the employee
    SELECT PayGradeID INTO paygrade_id FROM Employee WHERE EmployeeID = NEW.EmployeeID;
    
    -- Check available leave count based on the leave type
    CASE NEW.LeaveType
        WHEN 'Annual' THEN
            SELECT AnnualLeaveCount INTO available_leave_count FROM PayGrade WHERE PayGradeID = paygrade_id;
        WHEN 'Casual' THEN
            SELECT CasualLeaveCount INTO available_leave_count FROM PayGrade WHERE PayGradeID = paygrade_id;
        WHEN 'Maternity' THEN
            SELECT MaternityLeaveCount INTO available_leave_count FROM PayGrade WHERE PayGradeID = paygrade_id;
        WHEN 'No-Pay' THEN
            SELECT PayLeaveCount INTO available_leave_count FROM PayGrade WHERE PayGradeID = paygrade_id;
    END CASE;
    
    -- If applied leave count is more than available leave count, throw an error
    IF NEW.LeaveDayCount > available_leave_count THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not enough leaves available';
    END IF;
END;

//

DELIMITER ;



-- -------------------------------------------------------------------------------

-- Insrting sample data
-- ------------------------------------------------------------------------

  -- Sample data for Organization table
INSERT INTO Organization (OrganizationID, Name, Address, RegistrationNumber)
VALUES
  (1, 'Jupiter Apparels', '123 Main St', 'ABC123');
  
-- Sample data for the Country table
INSERT INTO Country (CountryID, CountryName)
VALUES
  (1, 'Sri Lanka'),
  (2, 'Bangladesh'),
  (3, 'Pakistan');

-- Sample data for the Branch table
INSERT INTO Branch (BranchID, BranchName, CountryID, OrganizationID)
VALUES
  (1, 'Branch 1', 1, 1),
  (2, 'Branch 2', 2, 1),
  (3, 'Branch 3', 3, 1),
  (4, 'Branch 3', 1, 1);
  
  -- Sample data for UserAccountLevel table
INSERT INTO UserAccountLevel (UserAccountLevelID, UserAccountLevelName, OwnProfileDetailsAccess, EveryProfileDetailsAccess,LeaveApproveAccess)
VALUES
  (1, 'Level4', 'EDIT', 'EDIT','EDIT'), -- admin
  (2, 'Level3', 'EDIT', 'EDIT','EDIT'), -- hr manager
  (3, 'Level2', 'VIEW', 'NO','EDIT'), -- supervisor
  (4, 'Level1', 'VIEW', 'NO','NO'); -- employee
  
  -- Sample data for PayGrade table
  INSERT INTO PayGrade (PayGradeID, PayGradeName, AnnualLeaveCount, CasualLeaveCount, MaternityLeaveCount, PayLeaveCount)
VALUES
    (1, 'Level 1', 25, 10, 12, 5),
    (2, 'Level 2', 20, 8, 14, 6),
    (3, 'Level 3', 18, 7, 10, 4);

-- Sample data for JobTitle table
INSERT INTO JobTitle (JobTitleID, JobTitleName)
VALUES
    (1, 'HR Manager'),
    (2, 'Accountant'),
    (3, 'Software Engineer'),
    (4, 'QA Engineer');

-- Sample data for EmploymentStatus table
INSERT INTO EmploymentStatus (EmploymentStatusID, EmploymentStatusName)
VALUES
    (1, 'Intern (fulltime)'),
    (2, 'Intern (parttime)'),
    (3, 'Contract (fulltime)'),
    (4, 'Contract (parttime)'),
    (5, 'Permanent'),
    (6, 'Freelance');

-- Sample data for Salary table
INSERT INTO Salary (SalaryID, JobTitleID, EmploymentStatusID, PayGradeID, Salary)
VALUES
    (1, 1, 1, 1, 35000),
    (2, 2, 2, 2, 40000),
    (3, 3, 3, 1, 60000),
    (4, 4, 4, 2, 45000),
    (5, 1, 5, 3, 70000),
    (6, 2, 6, 3, 75000),
    (7, 3, 1, 2, 55000),
    (8, 4, 2, 1, 38000),
    (9, 1, 3, 3, 68000),
    (10, 2, 4, 2, 42000);

-- Sample data for EmergencyContact table
INSERT INTO EmergencyContact (EmergencyContactID, PrimaryName, PrimaryPhoneNumber, SecondaryName, SecondaryPhoneNumber, Address)
VALUES
  (001,'Sunil Perera', 0775648923 , 'Kumudu Perera', 0714568239 , '123, Main St, Negombo'),
  (002, 'Kamal Kumarasinghe', 0715248369 , 'Sriyavi Perera', 0745281361 , '46, Katubedda, Moratuwa'),
  (003, 'Emily Fernando', 0771284635, 'John Rodrigo', 01145823448 , '11/D, St. Mary Road,Kalutara'),
  (004, 'Piyawathi Fonseka',0784465531,'Kusum Renuka', 0112263495, '29/A,Fernando Lane,Kalubowila'),
  (005, 'Sara Ann',0112556482,'Kalum Jayatilake', 0773325042, '11,Wewala, Ja ela' );
  
  -- Sample data for Department table
INSERT INTO Department (DepartmentID, DepartmentName)
VALUES
  (001 , 'IT'),
  (002, 'Human Resources'),
  (003, 'Finance'),
  (004, 'Sales'),
  (005, 'Production');

 -- Sample data for Employee table
INSERT INTO employee(EmployeeID, EmployeeName, DateOfBirth, Gender, MaritalStatus, Address, Country, DepartmentID, JobTitleID, PayGradeID, EmploymentStatusID, SupervisorID, EmergencyContactID)
VALUES
  ('EM-0001' , "Sirimal Perera", '1975-04-24', "Male", 'Married',  "95, 1st Lane, Egodawatta", "Sri Lanka", 2, 1, 1, 5, NULL, 1),
  ('EM-0002' , "Shriyani Wijesooriya", '1992-06-09', "Female", 'Unmarried', "23, 2nd Lane, Kadawatha", "Sri Lanka", 1, 3, 2, 5, "EM-0001", 2),
  ('EM-0003' , "Shantha Silva", '1978-06-09', "Male", 'Unmarried', "4, 2nd Lane, Kadawatha", "Sri Lanka", 4, 3, 2, 4, "EM-0001", 2),
  ('EM-0004' , "Nimali Fernando", '1989-07-21', "Female", 'Married', "26, 3rd Lane, Kottawa", "Sri Lanka", 4, 2, 2, 3, "EM-0002", 2);
  
 -- Sample data for dependentInfo table
INSERT INTO dependentinfo(DependentInfoID, EmployeeID, DependentName, DependentAge)
VALUES
  (1 , "EM-0001", 'Pasindu Perera', 15),
  (2, "EM-0002", 'Tharushi Perera', 12),
  (3, "EM-0003", 'Sachini Silva', 16);

-- Sample data for userAccount table
INSERT INTO userAccount(userID, username, EmployeeID, Email, PasswordHash, userAccountLevelID)
VALUES
	(1, "admin123", "EM-0001", "admin@gmail.com", "admin", 1),
    (2, "wjiesooriya92", "EM-0002", "wijesooriya92@gmail.com", "password", 3),
    (3, "shantha78", "EM-0003", "shantha78@gmail.com", "password", 4),
    (4, "nimali89", "EM-0004", "nimali89@gmail.com", "password", 4);
    
-- Sample data for leave table
INSERT INTO `leave`(LeaveLogDateTime,EmployeeID,Approved,Reason,LeaveType,FirstAbsentDate,LastAbsentDate,LeaveDayCount,ApprovedDateTime,ApprovedByID)
VALUES
	('2023-10-16 10:25:31', "EM-0003", 1, "Personal leave", "Casual", '2023-10-18', '2023-10-20', 3, '2023-10-17 04:00:31', "EM-0002"),
    ('2023-10-16 09:47:19', "EM-0004", 1, "Sick leave", "Annual", '2023-10-17', '2023-10-17', 1, '2023-10-16 04:03:56', "EM-0002"),
    ('2023-10-17 12:41:43', "EM-0003", 0, "Personal reasons", "Annual", '2023-10-20', '2023-10-21', 2, '2023-10-18 10:12:42', "EM-0001");
    
-- DELETE FROM Employee WHERE EmployeeID = 'EM-0001';leave