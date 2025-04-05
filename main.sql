CREATE DATABASE task_db;
\ c task_db;
CREATE TYPE status_enum as enum('active', 'completed', 'archived');
CREATE TABLE Project(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    description TEXT,
    status status_enum,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TYPE task_enum as enum('pending', 'in_progress', 'completed', 'archived');
CREATE TYPE priority_enum as enum('low', 'medium', 'high');
CREATE TABLE Task(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT,
    status task_enum,
    priority priority_enum,
    dueDate DATE,
    asigned_to UUID PRIMARY KEY gen_random_uuid,
    project_id UUID PRIMARY KEY gen_random_uuid,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

CREATE TYPE user_enum as enum('user', 'admin', 'manager');
CREATE TABLE User(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,    
    password VARCHAR(255),
    role user_enum,
    status status_enum,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Comment(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES Task(id),
    user_id UUID REFERENCES User(id),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);