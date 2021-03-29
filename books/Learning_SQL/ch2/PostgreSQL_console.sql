DROP TABLE IF EXISTS favorite_food;
DROP TABLE IF EXISTS person;
DROP TYPE IF EXISTS eye_color;

CREATE TYPE eye_color as ENUM ('BR', 'BL', 'GR');

CREATE TABLE person
(
    person_id   SMALLSERIAL,
    first_name  VARCHAR(20),
    last_name   VARCHAR(20),
    eye_color   eye_color,
    birth_date  DATE,
    street      VARCHAR(30),
    city        VARCHAR(20),
    state       VARCHAR(20),
    country     VARCHAR(20),
    postal_code VARCHAR(20),
    CONSTRAINT pk_person PRIMARY KEY (person_id)
);

-- '\d+ person' to DESC TABLE person using psql cli
SELECT *
FROM information_schema.columns
WHERE table_name = 'person';

CREATE TABLE favorite_food
(
    person_id SMALLINT,
    food      VARCHAR(20),
    CONSTRAINT pk_fav_food PRIMARY KEY (person_id, food),
    CONSTRAINT fk_fav_food_person_id FOREIGN KEY (person_id)
        REFERENCES person (person_id)
);

-- '\d+ favorite_food' to DESC TABLE favorite_food using psql cli
-- '\dt' show all tables in database
SELECT *
FROM information_schema.columns
WHERE table_name = 'favorite_food';

INSERT INTO person
    (person_id, first_name, last_name, eye_color, birth_date)
VALUES (DEFAULT, 'William', 'Turner', 'BR', '1972-05-27');

SELECT person_id, first_name, last_name, eye_color, birth_date
FROM person;

SELECT person_id, first_name, last_name, eye_color, birth_date
FROM person
WHERE last_name = 'Turner';

INSERT INTO favorite_food (person_id, food)
VALUES (1, 'pizza');
INSERT INTO favorite_food (person_id, food)
VALUES (1, 'cookies');
INSERT INTO favorite_food (person_id, food)
VALUES (1, 'nachos');

SELECT food
FROM favorite_food
WHERE person_id = 1
ORDER BY food;

INSERT INTO person
(person_id, first_name, last_name, eye_color, birth_date, street, city, state, country, postal_code)
VALUES (DEFAULT, 'Susan', 'Smith', 'BL', '1975-11-02', '23 Maple St.', 'Arlington', 'VA', 'USA', '20220');

SELECT person_id, first_name, last_name, eye_color, birth_date
FROM person;

UPDATE person
SET street      = '1225 Tremont St.',
    city        = 'Boston',
    state       = 'MA',
    country     = 'USA',
    postal_code = '02138'
WHERE person_id = 1;

DELETE
FROM person
WHERE person_id = 2;

UPDATE person
SET birth_date = 'DEC-21-1980'::DATE
WHERE person_id = 1;

DROP TABLE favorite_food;
DROP TABLE person;