-- psql -U secilreel -d bookmarks -f ./seeds/bookmark_seeds.sql

INSERT INTO bookmarks(title, url, description, rating)
VALUES 
(1, 'Google', 'https://google.com','Internet Search Engine', 5),
(2, 'Maizel', 'https://amazon.com','TV Series about Female Comedian', 5),
(3, 'Facebook', 'https://facebook.com','Social Media Platform', 3),
(4, 'Youtube', 'https://youtube.com','Video Content Sharing & Streaming Service', 4),
(5, 'Twitch', 'https://twitch.tv.com','Video Game Streaming Service', 3),
(6, 'Baidu', 'https://baudu.com','Chinese Google', 4),
(7, 'Wikipedia', 'https://wikipedia.org','Online Encyclopedia', 3),
(8, 'Yahoo', 'https://yahoo.com','Alternative Search Engine', 4),
(9, 'W3Schools', 'https://w3schools.com','Educational Resource ', 5),
(10, 'MDN', 'https://developer.mozilla.org','Online Web Documentation', 5);
