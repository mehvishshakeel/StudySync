-- Create the Courses database
CREATE DATABASE IF NOT EXISTS Courses;

-- Use the Courses database
USE Courses;

-- Create Mechanical Engineering table
CREATE TABLE IF NOT EXISTS Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);


-- Create Mechanical Engineering table
CREATE TABLE IF NOT EXISTS Mechanical_Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);

-- Create Electrical Engineering table
CREATE TABLE IF NOT EXISTS Electrical_Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);

-- Create Civil Engineering table
CREATE TABLE IF NOT EXISTS Civil_Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);

-- Create Computer Science Engineering table
CREATE TABLE IF NOT EXISTS Software_Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);

-- Create Chemical Engineering table
CREATE TABLE IF NOT EXISTS Chemical_Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);

-- Create Aerospace Engineering table
CREATE TABLE IF NOT EXISTS Energy_Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);

-- Create Biomedical Engineering table
CREATE TABLE IF NOT EXISTS Biomedical_Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);

-- Create Industrial Engineering table
CREATE TABLE IF NOT EXISTS Geomatics_Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);

-- Create Environmental Engineering table
CREATE TABLE IF NOT EXISTS Sustainable_Systems_Engineering (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);

-- Create Software Engineering table
CREATE TABLE IF NOT EXISTS Engineering_Physics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255),
    year VARCHAR(20)
);


-- Populating the Tables
-- Insert new courses for Civil Engineering
INSERT INTO Civil_Engineering (course_name, year)
VALUES 
    ('ENGG 311', 2),
    ('ENGG 349', 2),
    ('ENCI 300', 2),
    ('ENCI 317', 2),
    ('ENCI 400', 3),
    ('ENCI 402', 3),
    ('ENCI 413', 3),
    ('ENCI 423', 3),
    ('ENCI 451', 3),
    ('ENCI 461', 3),
    ('ENCI 471', 3),
    ('ENCI 473', 3),
    ('ENCI 481', 3),
    ('ENCI 570', 4),
    ('ENDG 319', 2),
    ('ENDG 407', 3),
    ('ENME 341', 2),
    ('GLGY 376', 2),
    ('MATH 375', 2),
    ('AMAT 307', 2);
    
    
-- Insert new courses for Chemical Engineering
INSERT INTO Chemical_Engineering (course_name, year)
VALUES 
    ('ENGG 311', 2),
    ('ENCH 300', 2),
    ('ENCH 307', 2),
    ('ENCH 327', 2),
    ('ENCH 331', 2),
    ('ENCH 350', 2),
    ('ENCH 400', 3),
    ('ENCH 401', 3),
    ('ENCH 403', 3),
    ('ENCH 405', 3),
    ('ENCH 417', 3),
    ('ENCH 421', 3),
    ('ENCH 429', 3),
    ('ENCH 450', 3),
    ('ENCH 500', 4),
    ('ENCH 501', 4),
    ('ENCH 550', 4),
    ('ENCH 551', 4),
    ('CHEM 357', 2),
    ('CHEM 579', 4),
    ('ENDG 319', 2),
    ('MATH 375', 2),
    ('AMAT 307', 2);
    
    
-- Insert new courses for Biomedical Engineering
INSERT INTO Biomedical_Engineering (course_name, year)
VALUES 
    ('ENGG 349', 2),
    ('ENGG 501', 4),
    ('ENGG 502', 4),
    ('ENDG 319', 2),
    ('BMEN 300', 2),
    ('BMEN 301', 2),
    ('BMEN 309', 2),
    ('BMEN 322', 2),
    ('BMEN 381', 2),
    ('BMEN 383', 2),
    ('BMEN 388', 2),
    ('BMEN 401', 3),
    ('BMEN 415', 3),
    ('BMEN 455', 3),
    ('BMEN 468', 3),
    ('BMEN 478', 3),
    ('BMEN 488', 3),
    ('MATH 375', 2),
    ('CHEM 357', 2);
    
-- Insert new courses for Electrical Engineering
INSERT INTO Electrical_Engineering (course_name, year)
VALUES 
    ('ENEL 101', 1),
    ('ENEL 102', 1),
    ('ENEL 300', 2),
    ('ENEL 327', 2),
    ('ENEL 343', 2),
    ('ENEL 353', 2),
    ('ENEL 361', 2),
    ('ENCM 335', 2),
    ('ENEL 400', 3),
    ('ENEL 419', 3),
    ('ENEL 441', 3),
    ('ENEL 453', 3),
    ('ENEL 469', 3),
    ('ENEL 471', 3),
    ('ENEL 475', 3),
    ('ENEL 476', 3),
    ('ENSF 337', 2),
    ('MATH 375', 2),
    ('AMAT 307', 2),
    ('PHYS 365', 2),
    ('ENCM 369', 2),
    ('ENEL 487', 3),
    ('ENEL 500', 4),
    ('ENCM 467', 3);
    
-- Insert courses for Energy Engineering
INSERT INTO Energy_Engineering (course_name, year)
VALUES 
    ('ENGG 204', 1),
    ('ENGG 212', 1),
    ('ENGG 311', 2),
    ('ENGG 349', 2),
    ('ENGG 501', 4),
    ('ENGG 502', 4),
    ('ENER 200', 1),
    ('ENER 260', 1),
    ('ENER 300', 2),
    ('ENER 330', 2),
    ('ENER 360', 2),
    ('ENER 400', 3),
    ('ENER 425', 3),
    ('ENER 480', 3),
    ('ENER 560', 4),
    ('ENER 570', 4),
    ('ENEE 355', 3),
    ('ENEE 503', 4),
    ('ENEE 575', 4),
    ('MATH 209', 1),
    ('MATH 331', 2),
    ('ENCH 407', 3),
    ('ENDG 319', 2),
    ('ENDG 440', 3),
    ('ENME 471', 3),
	('ENEE 355', 2),
    ('ENEE 503', 4),
    ('ENEE 575', 4);
    
    
-- Insert courses for  engineering into the engineering table
INSERT INTO engineering (course_name, year)
VALUES 
    ('ENGG 200', 1),
    ('ENGG 202', 1),
    ('ENGG 204', 1),
    ('ENGG 212', 1),
    ('ENGG 225', 1),
    ('ENDG 233', 1),
    ('MATH 275', 1),
    ('AMAT 217', 1),
    ('MATH 277', 1),
    ('AMAT 219', 1),
    ('MATH 211', 1),
    ('PHYS 259', 1);


-- Insert courses for Geomatics Engineering
INSERT INTO Geomatics_Engineering (course_name, year)
VALUES 
    ('ENDG 319', 2),
    ('ENDG 407', 3),
    ('ENEL 327', 2),
    ('ENGG 349', 2),
    ('ENGO 333', 2),
    ('ENGO 343', 2),
    ('ENGO 351', 2),
    ('ENGO 363', 2),
    ('ENGO 401', 3),
    ('ENGO 419', 3),
    ('ENGO 421', 3),
    ('ENGO 423', 3),
    ('ENGO 431', 3),
    ('ENGO 435', 3),
    ('ENGO 455', 3),
    ('ENGO 465', 3),
    ('ENGO 501', 4),
    ('ENGO 443', 3),
    ('ENGO 451', 3),
    ('ENGO 500', 4),
    ('MATH 375', 2),
    ('AMAT 307', 2),
    ('PHYS 369', 2);
    
    
-- Insert new courses for Mechanical Engineering
INSERT INTO Mechanical_Engineering (course_name, year)
VALUES 
    ('CHEM 379', 2),
    ('ENDG 319', 2),
    ('ENDG 407', 3),
    ('ENGG 311', 2),
    ('ENGG 349', 2),
    ('ENMF 417', 3),
    ('ENME 101', 1),
    ('ENME 317', 2),
    ('ENME 337', 2),
    ('ENME 339', 2),
    ('ENME 341', 2),
    ('ENME 421', 3),
    ('ENME 461', 3),
    ('ENME 471', 3),
    ('ENME 473', 3),
    ('ENME 479', 3),
    ('ENME 485', 3),
    ('ENME 493', 3),
    ('ENME 495', 3),
    ('ENME 585', 4),
    ('ENME 599', 4),
    ('ENGG 501', 4),
    ('ENGG 502', 4),
    ('ENGG 503', 4),
    ('ENGG 504', 4),
    ('ENME 501', 4),
    ('ENME 502', 4),
    ('MATH 375', 2),
    ('AMAT 307', 2),
    ('PHYS 365', 2),
    ('PHYS 369', 2);
    

-- Insert courses for Software Engineering
INSERT INTO Software_Engineering (course_name, year)
VALUES 
    ('ENDG 319', 2),
    ('ENSF 300', 2),
    ('ENSF 337', 2),
    ('ENSF 338', 2),
    ('ENSF 380', 2),
    ('ENSF 381', 2),
    ('ENSF 400', 3),
    ('ENSF 444', 3),
    ('ENSF 460', 3),
    ('ENSF 461', 3),
    ('ENSF 462', 3),
    ('ENSF 480', 3),
    ('ENEL 353', 2),
    ('ENEL 500', 4),
    ('ENCM 369', 2),
    ('ENSF 401', 3),
    ('ENSF 438', 3),
    ('ENSF 511', 4),
    ('ENSF 533', 4),
    ('MATH 271', 1),
    ('PHYS 365', 2),
    ('PHYS 369', 2),
    ('MATH 375', 2),
    ('AMAT 307', 2);


-- Insert courses for sustainable_systems_engineering
INSERT INTO sustainable_systems_engineering (course_name, year)
VALUES 
    ('ENGG 349', 2),
    ('ENGG 461', 3),
    ('ENGG 501', 4),
    ('ENGG 502', 4),
    ('ENGG 513', 4),
    ('ENCI 317', 2),
    ('ENCI 481', 3),
    ('ENDG 319', 2),
    ('ENEL 487', 3),
    ('ENEE 355', 2),
    ('ENEE 503', 4),
    ('ENEE 575', 4),
    ('ENME 461', 3),
    ('SUSE 300', 2),
    ('SUSE 301', 2),
    ('SUSE 303', 2),
    ('SUSE 307', 2),
    ('SUSE 311', 2),
    ('SUSE 315', 2),
    ('SUSE 400', 3),
    ('SUSE 409', 3),
    ('SUSE 463', 3),
    ('SUSE 401', 3),
    ('SUSE 403', 3),
    ('SUSE 511', 4),
    ('SUSE 519', 4),
    ('SUSE 579', 4),
    ('SUSE 581', 4),
    ('SUSE 589', 4),
    ('SUSE 591', 4),
    ('SUSE 595', 4),
    ('SUST 403', 3),
    ('MATH 375', 2),
    ('CHEM 321', 2),
    ('SUSE 511', 4),
    ('SUSE 519', 4),
    ('SUSE 579', 4),
    ('SUSE 581', 4),
    ('SUSE 589', 4),
    ('SUSE 591', 4),
    ('SUSE 595', 4);
















