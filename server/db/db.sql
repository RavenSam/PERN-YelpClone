-- list all db \l
--access a BD \c [DB NAME]
--list all tables \d
--list distructure of a table \d [TABLE NAME]



-- Create a database yelp
CREATE DATABASE yelp;

-- Create a RESTAURANTS table
CREATE TABLE restaurants
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(price_range >= 1 and price_range <= 5)
);

-- Create a REVIEWS table
CREATE TABLE reviews
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

-- insert Data to restaurants table
INSERT INTO restaurants
    ( name, location, price_range)
VALUES('MCDonals', 'New York', 2);

-- insert Data to restaurants table
INSERT INTO reviews
    ( restaurant_id, name, review, rating)
VALUES(22, 'Sara', 'Very Good', 4);

--View all columns in table
SELECT *
FROM restaurants;

--View only name and price_range in restaurants table
SELECT name, price_range
FROM restaurants;