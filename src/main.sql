CREATE DATABASE task_db;
\c task_db;
CREATE TYPE status_enum as enum('active', 'completed', 'archived');
CREATE TABLE Project(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    description TEXT,
    status status_enum,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project jadvaliga misol qiymatlar qo'shish
INSERT INTO Project (name, description, status, created_at, updated_at)
VALUES
  ('Project A', 'Description of Project A', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Project B', 'Description of Project B', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Project C', 'Description of Project C', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Project D', 'Description of Project D', 'archived', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);



CREATE TYPE task_enum as enum('pending', 'in_progress', 'completed', 'archived');
CREATE TYPE priority_enum as enum('low', 'medium', 'high');
CREATE TABLE task (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_enum,
    priority priority_enum,
    due_date DATE,
    assigned_to UUID,
    project_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO task (title, description, status, priority, due_date, assigned_to, project_id, created_at, updated_at)
VALUES
  ('Task 1', 'Task 1 description', 'pending', 'medium', '2025-04-20', uuid_generate_v4(), uuid_generate_v4(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Task 2', 'Task 2 description', 'in_progress', 'high', '2025-04-22', uuid_generate_v4(), uuid_generate_v4(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Task 3', 'Task 3 description', 'completed', 'low', '2025-04-25', uuid_generate_v4(), uuid_generate_v4(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

CREATE TYPE user_enum as enum('user', 'admin', 'manager');
CREATE TABLE user1 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role user_enum,
    status status_enum,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user1 (email, username, password, role, status)
VALUES
('example1@email.com', 'username1', 'password123', 'admin', 'active'),
('example2@email.com', 'username2', 'password456', 'user', 'active'),
('example3@email.com', 'username3', 'password789', 'admin', 'active');


CREATE TABLE Comment(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES Task(id),
    user_id UUID REFERENCES user1(id),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Comment ( content, created_at, updated_at)
VALUES
  ('This is a comment on task 1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('This is a comment on task 2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('This is a comment on task 3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
