CREATE TABLE genre_relation(
    manga_id INT,
    genre_id INT,
    FOREIGN KEY(manga_id) REFERENCES allmanga(id) ON DELETE CASCADE,
    FOREIGN KEY(genre_id) REFERENCES genre_desc(id) ON DELETE CASCADE
)
