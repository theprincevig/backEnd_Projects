-- Active: 1746019537332@@127.0.0.1@3306@my_app
CREATE TABLE user(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);

INSERT INTO user
(id, username, email, password)
VALUES
("1103", "ShahRukhKhan", "iamsrk@yahoo.com", "lastoftheSTAR");

ALTER TABLE user
ADD COLUMN avatar VARCHAR(255);

SELECT * FROM user;