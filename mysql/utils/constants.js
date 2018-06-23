module.exports = {
  INSERTALLQ : `INSERT INTO allmanga (title, alias, image_url, hits, status, manga_id, latest_chapter_date) VALUES ?`,
  INSERTGENRESDESC : `INSERT INTO genre_desc (name) VALUES ?`,
  INSERTGENRESREL : `INSERT INTO genre_relation(manga_id, genre_id) VALUES ?`,
  INSERTINTOMDETAILS: `INSERT INTO manga_desc(manga_id, title, alias, author, artist, chapters_length, created, description, last_chapter_date, image, imageURL, language, released, starts_with, status, type) VALUES ?`
};;
