drop database if exists hrm_portal; 

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
-- CREATE TABLE if not exists `CustomAttributesInfo` (
-- 	`CustomAttributesInfoID` INT AUTO_INCREMENT,
--     `EmployeeID` VARCHAR(10),
--     PRIMARY KEY(`CustomAttributesInfoID`),
--     FOREIGN KEY(`EmployeeID`) REFERENCES `Employee`(`EmployeeID`)
-- );
CREATE TABLE IF NOT EXISTS `EmployeeCustomAttributes` (
  `CustomAttributeID` INT AUTO_INCREMENT,
  `EmployeeID` VARCHAR(10),
  `AttributeName` VARCHAR(50),
  `AttributeValue` TEXT,
  PRIMARY KEY (`CustomAttributeID`),
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
DELIMITER //

CREATE TRIGGER `before_employee_custom_attributes_insert_check`
BEFORE INSERT ON `EmployeeCustomAttributes`
FOR EACH ROW
BEGIN
    -- Check if the employee and custom attribute already exists
    IF EXISTS (
        SELECT 1 
        FROM `EmployeeCustomAttributes` 
        WHERE `EmployeeID` = NEW.`EmployeeID` 
        AND `AttributeName` = NEW.`AttributeName`
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Duplicate employee custom attribute detected!';
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
  (005, 'Sara Ann',0112556482,'Kalum Jayatilake', 0773325042, '11,Wewala, Ja ela' ),
  (006, 'Rohan Silva', '0776987451', 'Manel Silva', '0712356987', '56, Lake View, Colombo'),
  (007, 'Priyantha Bandara', '0715648235', 'Chamari Bandara', '0774521369', '35, Hill Road, Kandy'),
  (008, 'Lahiru Perera', '0778956234', 'Amaya Perera', '0713269852', '17, Palm Grove, Galle'),
  (009, 'Nadeesha Fernando', '0712345678', 'Sanjeewa Fernando', '0778765432', '45, Beach Lane, Negombo'),
  (010, 'Thilini Jayawardena', '0719856234', 'Mahesh Jayawardena', '0773265987', '27, Paradise Drive, Colombo');

  
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
  ('EM-0001', 'Sirimal Perera', '1975-04-24', 'Male', 'Married', '95, 1st Lane, Egodawatta', 'Sri Lanka', 2, 1, 1, 5, NULL, 1),
  ('EM-0002', 'Shriyani Wijesooriya', '1992-06-09', 'Female', 'Unmarried', '23, 2nd Lane, Kadawatha', 'Sri Lanka', 1, 3, 2, 5, 'EM-0001', 2),
  ('EM-0003', 'Shantha Silva', '1978-06-09', 'Male', 'Unmarried', '4, 2nd Lane, Kadawatha', 'Sri Lanka', 4, 3, 2, 4, 'EM-0001', 3),
  ('EM-0004', 'Nimali Fernando', '1989-07-21', 'Female', 'Married', '26, 3rd Lane, Kottawa', 'Sri Lanka', 4, 2, 2, 3, 'EM-0002', 5),
  ('EM-0005', 'Kamal Perera', '1982-03-15', 'Male', 'Married', '42, 4th Lane, Kandy', 'Sri Lanka', 3, 2, 2, 4, 'EM-0001', 9),
  ('EM-0006', 'Mala Gunasekara', '1990-11-30', 'Female', 'Married', '14, 5th Lane, Colombo', 'Sri Lanka', 1, 4, 3, 5, 'EM-0003', 10),
  ('EM-0007', 'Saman Jayasuriya', '1985-08-18', 'Male', 'Married', '34, 6th Lane, Galle', 'Sri Lanka', 5, 4, 2, 5, 'EM-0001', 4),
  ('EM-0008', 'Lakshika Perera', '1994-04-05', 'Female', 'Unmarried', '17, 7th Lane, Matara', 'Sri Lanka', 2, 1, 1, 4, 'EM-0001', 6),
  ('EM-0009', 'Nihal Ranasinghe', '1980-12-12', 'Male', 'Married', '56, 8th Lane, Kegalle', 'Sri Lanka', 1, 3, 3, 5, 'EM-0005', 7),
  ('EM-0010', 'Priyanka Fernando', '1988-09-28', 'Female', 'Married', '12, 9th Lane, Badulla', 'Sri Lanka', 4, 2, 2, 4, 'EM-0006', 8);

-- Sample data for UserAccount table (10 records)

-- INSERT INTO customattributesinfo(EmployeeID) 
-- VALUES
-- 	("EM-0001"),
--     ("EM-0002"),
--     ("EM-0003"),
--     ("EM-0004"),
--     ("EM-0005"),
--     ("EM-0006"),
--     ("EM-0007"),
--     ("EM-0008"),
--     ("EM-0009"),
--     ("EM-0010");
  
 -- Sample data for dependentInfo table
INSERT INTO dependentinfo(DependentInfoID, EmployeeID, DependentName, DependentAge)
VALUES
  (1 , "EM-0001", 'Pasindu Perera', 15),
  (2, "EM-0002", 'Tharushi Perera', 12),
  (3, "EM-0003", 'Sachini Silva', 16),
  (4, "EM-0004", 'Kavindu Fernando', 26),
  (5, "EM-0005", 'Chathuri Perera', 29),
  (6, "EM-0006", 'Yasitha Gunasekara', 23),
  (7, "EM-0007", 'Saman Jr. Jayasuriya', 35),
  (8, "EM-0008", 'Lakshika Jr. Perera', 27),
  (9, "EM-0009", 'Nihal Ranasinghe', 20),
  (10, "EM-0010", 'Priyanka Fernando', 24);

-- Sample data for userAccount table
INSERT INTO userAccount(userID, username, EmployeeID, Email, PasswordHash, userAccountLevelID)
VALUES
	(1, 'admin123', 'EM-0001', 'admin@gmail.com', 'admin', 1),
	(2, 'wjiesooriya92', 'EM-0002', 'wijesooriya92@gmail.com', 'password', 3),
	(3, 'shantha78', 'EM-0003', 'shantha78@gmail.com', 'password', 4),
	(4, 'nimali89', 'EM-0004', 'nimali89@gmail.com', 'password', 4),
	(5, 'kamal82', 'EM-0005', 'kamal82@gmail.com', 'password', 2),
	(6, 'mala90', 'EM-0006', 'mala90@gmail.com', 'password', 3),
	(7, 'saman85', 'EM-0007', 'saman85@gmail.com', 'password', 4),
	(8, 'lakshika94', 'EM-0008', 'lakshika94@gmail.com', 'password', 2),
	(9, 'nihal80', 'EM-0009', 'nihal80@gmail.com', 'password', 3),
	(10, 'priyanka88', 'EM-0010', 'priyanka88@gmail.com', 'password', 4);
    
-- Sample data for leave table
INSERT INTO `leave`(LeaveLogDateTime,EmployeeID,Approved,Reason,LeaveType,FirstAbsentDate,LastAbsentDate,LeaveDayCount,ApprovedDateTime,ApprovedByID)
VALUES
	('2023-10-16 10:25:31', "EM-0003", 1, "Personal leave", "Casual", '2023-10-18', '2023-10-20', 3, '2023-10-17 04:00:31', "EM-0002"),
    ('2023-10-16 09:47:19', "EM-0004", 1, "Sick leave", "Annual", '2023-10-17', '2023-10-17', 1, '2023-10-16 04:03:56', "EM-0002"),
    ('2023-10-17 12:41:43', "EM-0003", -1, "Personal reasons", "Annual", '2023-10-20', '2023-10-21', 2, '2023-10-18 10:12:42', "EM-0001"),
	('2023-10-19 14:25:10', 'EM-0005', -1, 'Family emergency', 'Casual', '2023-10-20', '2023-10-21', 2, '2023-10-19 15:45:12', 'EM-0002'),
	('2023-10-22 08:12:37', 'EM-0006', 1, 'Vacation', 'Annual', '2023-10-23', '2023-10-27', 5, '2023-10-22 10:30:58', 'EM-0003'),
	('2023-10-15 09:30:15', 'EM-0007', 1, 'Medical leave', 'Annual', '2023-10-16', '2023-10-17', 2, '2023-10-16 14:20:30', 'EM-0004'),
	('2023-10-25 16:05:20', 'EM-0008', 0, 'Personal reasons', 'Casual', '2023-10-26', '2023-10-27', 2, NULL, NULL),
	('2023-10-18 11:20:55', 'EM-0009', 1, 'Vacation', 'Annual', '2023-10-19', '2023-10-22', 4, '2023-10-18 13:45:08', 'EM-0005'),
    ('2023-12-05 09:30:15', 'EM-0001', 1, 'Vacation', 'Annual', '2023-12-06', '2023-12-09', 4, '2023-12-05 11:45:30', 'EM-0003'),
	('2023-12-06 16:20:20', 'EM-0002', 0, 'Personal reasons', 'Casual', '2023-12-07', '2023-12-07', 1, NULL, NULL),
	('2023-12-07 09:30:15', 'EM-0003', 0, 'Personal leave', 'Casual', '2023-12-08', '2023-12-08', 1, NULL, NULL),
	('2023-12-08 16:20:20', 'EM-0004', 1, 'Medical leave', 'Annual', '2023-12-09', '2023-12-10', 2, '2023-12-08 18:45:35', 'EM-0005'),
	('2023-12-09 09:30:15', 'EM-0005', 1, 'Vacation', 'Annual', '2023-12-10', '2023-12-13', 4, '2023-12-09 11:45:30', 'EM-0003'),
	('2023-12-10 16:20:20', 'EM-0006', 0, 'Personal reasons', 'Casual', '2023-12-11', '2023-12-11', 1, NULL, NULL),
	('2023-12-11 09:30:15', 'EM-0007', 1, 'Family emergency', 'Casual', '2023-12-12', '2023-12-13', 2, '2023-12-11 11:45:30', 'EM-0008'),
	('2023-12-12 16:20:20', 'EM-0008', 1, 'Vacation', 'Annual', '2023-12-13', '2023-12-16', 4, '2023-12-12 18:45:35', 'EM-0005'),
	('2023-12-13 09:30:15', 'EM-0009', 0, 'Personal leave', 'Casual', '2023-12-14', '2023-12-14', 1, NULL, NULL),
	('2023-12-14 16:20:20', 'EM-0010', 1, 'Medical leave', 'No-Pay', '2023-12-15', '2023-12-16', 2, '2023-12-14 18:45:35', 'EM-0009'),
	('2023-12-15 09:30:15', 'EM-0001', 1, 'Vacation', 'Annual', '2023-12-16', '2023-12-19', 4, '2023-12-15 11:45:30', 'EM-0010'),
	('2023-12-16 16:20:20', 'EM-0002', 0, 'Personal reasons', 'Casual', '2023-12-17', '2023-12-17', 1, NULL, NULL),
	('2023-12-17 09:30:15', 'EM-0003', 1, 'Personal leave', 'Casual', '2023-12-18', '2023-12-18', 1, '2023-12-17 11:45:30', 'EM-0001'),
	('2023-12-18 16:20:20', 'EM-0004', 1, 'Medical leave', 'No-Pay', '2023-12-19', '2023-12-20', 2, '2023-12-18 18:45:35', 'EM-0002'),
	('2023-12-19 09:30:15', 'EM-0005', 1, 'Vacation', 'Annual', '2023-12-20', '2023-12-23', 4, '2023-12-19 11:45:30', 'EM-0004'),
	('2023-12-20 16:20:20', 'EM-0006', 0, 'Personal reasons', 'Casual', '2023-12-21', '2023-12-21', 1, NULL, NULL),
	('2023-12-21 09:30:15', 'EM-0007', 1, 'Family emergency', 'Casual', '2023-12-22', '2023-12-23', 2, '2023-12-21 11:45:30', 'EM-0008'),
	('2023-12-22 16:20:20', 'EM-0008', 1, 'Vacation', 'Annual', '2023-12-23', '2023-12-26', 4, '2023-12-22 18:45:35', 'EM-0007'),
	('2023-12-23 09:30:15', 'EM-0009', 0, 'Personal leave', 'Casual', '2023-12-24', '2023-12-24', 1, NULL, NULL),
	('2023-12-24 16:20:20', 'EM-0010', 1, 'Medical leave', 'No-Pay', '2023-12-25', '2023-12-26', 2, '2023-12-24 18:45:35', 'EM-0009'),
	('2023-12-25 09:30:15', 'EM-0001', 1, 'Vacation', 'Annual', '2023-12-26', '2023-12-29', 4, '2023-12-25 11:45:30', 'EM-0010'),
	('2023-12-26 16:20:20', 'EM-0002', 0, 'Personal reasons', 'Casual', '2023-12-27', '2023-12-27', 1, NULL, NULL),
	('2023-12-27 09:30:15', 'EM-0003', 1, 'Personal leave', 'Casual', '2023-12-28', '2023-12-28', 1, '2023-12-27 11:45:30', 'EM-0001'),
	('2023-12-28 16:20:20', 'EM-0004', 1, 'Medical leave', 'Maternity', '2023-12-29', '2023-12-30', 2, '2023-12-28 18:45:35', 'EM-0002'),
	('2023-12-29 09:30:15', 'EM-0005', 1, 'Vacation', 'Annual', '2023-12-30', '2023-12-31', 3, '2023-12-29 11:45:30', 'EM-0004'),
	('2023-12-30 16:20:20', 'EM-0006', 0, 'Personal reasons', 'Casual', '2023-12-31', '2023-12-31', 1, NULL, NULL),
	('2023-12-31 09:30:15', 'EM-0007', 1, 'Family emergency', 'Casual', '2024-01-01', '2024-01-02', 2, '2023-12-31 11:45:30', 'EM-0008'),
	('2024-01-01 16:20:20', 'EM-0008', 1, 'Vacation', 'Annual', '2024-01-02', '2024-01-05', 4, '2024-01-01 18:45:35', 'EM-0007'),
	('2024-01-02 09:30:15', 'EM-0009', 0, 'Personal leave', 'Casual', '2024-01-03', '2024-01-03', 1, NULL, NULL),
	('2024-01-03 16:20:20', 'EM-0010', 1, 'Medical leave', 'Maternity', '2024-01-04', '2024-01-05', 2, '2024-01-03 18:45:35', 'EM-0009'),
	('2024-01-04 09:30:15', 'EM-0001', 1, 'Vacation', 'Annual', '2024-01-05', '2024-01-08', 4, '2024-01-04 11:45:30', 'EM-0010'),
	('2024-01-05 16:20:20', 'EM-0002', 0, 'Personal reasons', 'Casual', '2024-01-06', '2024-01-06', 1, NULL, NULL),
	('2024-01-06 09:30:15', 'EM-0003', 1, 'Personal leave', 'Casual', '2024-01-07', '2024-01-07', 1, '2024-01-06 11:45:30', 'EM-0001'),
	('2024-01-07 16:20:20', 'EM-0004', 1, 'Medical leave', 'No-Pay', '2024-01-08', '2024-01-09', 2, '2024-01-07 18:45:35', 'EM-0002'),
	('2024-01-08 09:30:15', 'EM-0005', 1, 'Vacation', 'Annual', '2024-01-09', '2024-01-12', 4, '2024-01-08 11:45:30', 'EM-0004'),
	('2024-01-09 16:20:20', 'EM-0006', 0, 'Personal reasons', 'Casual', '2024-01-10', '2024-01-10', 1, NULL, NULL),
	('2024-01-10 09:30:15', 'EM-0007', 1, 'Family emergency', 'Casual', '2024-01-11', '2024-01-12', 2, '2024-01-10 11:45:30', 'EM-0008'),
	('2024-01-11 16:20:20', 'EM-0008', 1, 'Vacation', 'Annual', '2024-01-12', '2024-01-15', 4, '2024-01-11 18:45:35', 'EM-0007'),
	('2024-01-12 09:30:15', 'EM-0009', 0, 'Personal leave', 'Casual', '2024-01-13', '2024-01-13', 1, NULL, NULL),
	('2024-01-13 16:20:20', 'EM-0010', 1, 'Medical leave', 'No-Pay', '2024-01-14', '2024-01-15', 2, '2024-01-13 18:45:35', 'EM-0009'),
	('2024-01-14 09:30:15', 'EM-0001', 1, 'Vacation', 'Annual', '2024-01-15', '2024-01-18', 4, '2024-01-14 11:45:30', 'EM-0010'),
	('2024-01-15 16:20:20', 'EM-0002', 0, 'Personal reasons', 'Casual', '2024-01-16', '2024-01-16', 1, NULL, NULL);
-- DELETE FROM Employee WHERE EmployeeID = 'EM-0001';leave