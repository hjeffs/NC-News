\c nc_news_test

-- SELECT * FROM articles;

-- SELECT * FROM users;

-- SELECT EXISTS(SELECT 1 FROM users WHERE username = 'icellusedkarss');

SELECT EXISTS
(SELECT 1 FROM articles WHERE topic = 'cats')