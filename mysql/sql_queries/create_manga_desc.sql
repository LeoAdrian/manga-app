CREATE TABLE manga_desc (
  manga_id INT,
  alias TEXT DEFAULT NULL,
  artist TEXT DEFAULT NULL,
  author TEXT DEFAULT NULL,
  chapters_length INT,
  created  DATETIME DEFAULT NULL,
  description TEXT DEFAULT NULL,
  last_chapter_date DATETIME DEFAULT NULL,
  image TEXT DEFAULT NULL,
  imageURL TEXT DEFAULT NULL,
  language INT DEFAULT NULL,
  released INT NULL DEFAULT NULL,
  starts_with VARCHAR(10) DEFAULT NULL,
  status INT DEFAULT NULL,
  title TEXT DEFAULT NULL,
  type INT DEFAULT NULL,
  FOREIGN KEY (manga_id) REFERENCES allmanga(id) ON DELETE CASCADE
)
