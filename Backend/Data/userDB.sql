-- Create the userDB database
CREATE DATABASE IF NOT EXISTS userDB;

-- Use the userDB database
USE userDB;

-- Create the user table
CREATE TABLE IF NOT EXISTS `user` (
  `ID` INT AUTO_INCREMENT,
  `Fname` VARCHAR(45)  NOT NULL,
  `Lname` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Program` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(1000) NOT NULL,
  `Year` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE
);
