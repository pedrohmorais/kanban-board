-- Arquivo de inicialização init.sql

USE kanban;

CREATE TABLE card (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  status ENUM('New', 'ToDo', 'Doing', 'Done') NOT NULL
);