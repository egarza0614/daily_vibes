-- Drop and recreate the database (for development/testing only)
DROP DATABASE IF EXISTS dailyvibes_db;

CREATE DATABASE dailyvibes_db;

-- Switch to the new database
\c dailyvibes_db;

DROP TABLE IF EXISTS comments;  -- Drop comments first (due to foreign keys)
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- Create the "users" table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,  
    password TEXT NOT NULL,
    bio TEXT,                         
    profile_picture TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the "posts" table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,                       
    video_url TEXT,                      
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the "comments" table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_text TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
