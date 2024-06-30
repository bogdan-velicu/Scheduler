CREATE DATABASE schedule_db;

CREATE USER 'schedule_admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON schedule_db.* TO 'schedule_admin'@'localhost';
FLUSH PRIVILEGES;

USE schedule_db;

CREATE TABLE schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL
);