-- ============================================================
--  school.sql
--  HOW TO USE:
--  1. Start XAMPP -> Apache + MySQL
--  2. Open http://localhost/phpmyadmin
--  3. Click the "Import" tab at the top
--  4. Choose this file and press "Go"
--  Everything below runs automatically and your database is ready.
-- ============================================================

CREATE DATABASE IF NOT EXISTS school
  DEFAULT CHARACTER SET utf8mb4;

USE school;

DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    email    VARCHAR(100),
    major    VARCHAR(60),
    grade    DECIMAL(4,2),
    created  DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students (name, email, major, grade) VALUES
('Fatima Hassan', 'fatima@mail.com', 'Computer Science', 17.50),
('Sara Khalil',   'sara@mail.com',   'Computer Science',  8.25),
('Lina Farah',    'lina@mail.com',   'Business',         12.00),
('Nour Aziz',     'nour@mail.com',   'Design',           15.75),
('Maya Saad',     'maya@mail.com',   'Computer Science', 19.00);

-- ============================================================
--  Try these in the phpMyAdmin "SQL" tab, one at a time:
-- ============================================================
-- SELECT * FROM students;
-- SELECT name, grade FROM students WHERE grade >= 10;
-- SELECT * FROM students ORDER BY grade DESC;
-- SELECT * FROM students WHERE major = 'Computer Science';
-- SELECT * FROM students WHERE name LIKE 'F%';
-- SELECT COUNT(*) AS how_many FROM students;
-- SELECT AVG(grade) AS average FROM students;
-- SELECT major, COUNT(*) AS students FROM students GROUP BY major;
-- UPDATE students SET grade = 20 WHERE id = 1;
-- DELETE FROM students WHERE id = 5;
