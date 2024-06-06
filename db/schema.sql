-- Drop and recreate the database (for development/testing only)
DROP DATABASE IF EXISTS dailyvibes_db;
CREATE DATABASE dailyvibes_db;

-- Switch to the new database
\c dailyvibes_db;

-- Create the "users" table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,  -- Shorter username for display
    password TEXT NOT NULL,
    bio TEXT,                         -- Optional user bio
    profile_picture TEXT              -- URL for profile picture (Cloudinary)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the "posts" table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,                       -- URL for post image (Cloudinary)
    video_url TEXT,                       -- URL for post video (Cloudinary)
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