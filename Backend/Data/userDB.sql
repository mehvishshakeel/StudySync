-- Create the userDB database
CREATE DATABASE IF NOT EXISTS userDB;

-- Use the userDB database
USE userDB;

-- Create the user table
CREATE TABLE IF NOT EXISTS `user` (
  `ID` INT AUTO_INCREMENT,
  `Fname` VARCHAR(45) NULL,
  `Lname` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `Program` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE
);
