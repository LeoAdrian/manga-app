CREATE TABLE allmanga(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) DEFAULT NULL,
    alias VARCHAR(255) DEFAULT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    hits INT DEFAULT -1,
    status INT DEFAULT -1,
    manga_id VARCHAR(255) DEFAULT NULL,
    latest_chapter_date TIMESTAMP DEFAULT NOW()
    );
