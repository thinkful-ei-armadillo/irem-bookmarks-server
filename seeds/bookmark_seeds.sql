-- psql -U secilreel -d bookmarks -f ./seeds/bookmark_seeds.sql

INSERT INTO bookmarks(title, url, description, rating)
VALUES 
('Google', 'https://google.com','Internet Search Engine', 5),
('Maizel', 'https://amazon.com','TV Series about Female Comedian', 5),
('Facebook', 'https://facebook.com','Social Media Platform', 3),
('Youtube', 'https://youtube.com','Video Content Sharing & Streaming Service', 4),
('Twitch', 'https://twitch.tv.com','Video Game Streaming Service', 3),
('Baidu', 'https://baudu.com','Chinese Google', 4),
('Wikipedia', 'https://wikipedia.org','Online Encyclopedia', 3),
('Yahoo', 'https://yahoo.com','Alternative Search Engine', 4),
('W3Schools', 'https://w3schools.com','Educational Resource ', 5),
('MDN', 'https://developer.mozilla.org','Online Web Documentation', 5);
