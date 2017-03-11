DROP DATABASE IF EXISTS YMDB;

CREATE DATABASE YMDB;

USE YMDB;

CREATE TABLE movies (
  id int NOT NULL AUTO_INCREMENT,
  Title VARCHAR(200) UNIQUE NOT NULL,
  Year varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
