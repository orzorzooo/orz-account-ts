DROP TABLE IF EXISTS posts;


CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)

);

-- 插入使用者的文章
INSERT INTO posts (user_id, title, content) VALUES (103, 'Post 1 by User 103', 'Content of post 1 by User 103');
INSERT INTO posts (user_id, title, content) VALUES (103, 'Post 2 by User 103', 'Content of post 2 by User 103');


-- 插入使用者的文章
INSERT INTO posts (user_id, title, content) VALUES (104, 'Post 1 by User 1bb', 'Content of post 1 by User 104');
INSERT INTO posts (user_id, title, content) VALUES (104, 'Post 2 by User 1bb', 'Content of post 2 by User 104');




-- profile
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id  INT UNIQUE,
  bandname VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)