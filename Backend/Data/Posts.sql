-- Create the Posts database
CREATE DATABASE IF NOT EXISTS Posts;

-- Use the Posts database
USE Posts;

-- Create the content table
CREATE TABLE IF NOT EXISTS content (
  `PostID` INT NOT NULL AUTO_INCREMENT,
  `UserID` VARCHAR(45) NULL,
  `Title` VARCHAR(45) NULL,
  `Content` TEXT NULL,
  `CourseID` VARCHAR(45) NOT NULL,
  `Program`	VARCHAR(100) NULL,
  PRIMARY KEY (`PostID`));

