-- Import this in phpMyAdmin (Import tab), then open index.php

CREATE DATABASE IF NOT EXISTS mini_site DEFAULT CHARACTER SET utf8mb4;
USE mini_site;

DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(120) NOT NULL,
    teacher     VARCHAR(80),
    level       VARCHAR(20),
    hours       INT,
    description TEXT,
    created     DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (title, teacher, level, hours, description) VALUES
('Introduction to PHP', 'Dr. Karam', 'beginner', 30,
 'Variables, conditions, loops, arrays and functions. The foundation of server side programming.'),
('HTML and CSS Basics', 'Dr. Nassar', 'beginner', 24,
 'Structure a page with HTML and style it with CSS. Responsive layouts with flexbox and grid.'),
('MySQL for Web Developers', 'Dr. Karam', 'intermediate', 28,
 'Designing tables, writing SQL queries, and connecting a database to a PHP application.'),
('JavaScript in the Browser', 'Dr. Saleh', 'intermediate', 32,
 'Making pages interactive: events, the DOM, and talking to a server without reloading.'),
('WordPress and CMS', 'Dr. Nassar', 'beginner', 18,
 'Content management systems, themes, plug-ins and keeping a WordPress site secure.'),
('Full Stack Project', 'Dr. Karam', 'advanced', 40,
 'Build a complete dynamic website from an empty folder to a working database driven app.');
