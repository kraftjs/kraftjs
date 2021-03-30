SELECT actor_id
FROM film_actor
ORDER BY actor_id;


# Remove duplicates with DISTINCT keyword after SELECT
# ---
# Be aware that using DISTINCT requires the data to be
# sorted, which is time consuming for large result sets
SELECT DISTINCT actor_id
FROM film_actor
ORDER BY actor_id;


# Derived table:
# Subqueries are surrounded by parentheses and can be
# found in various parts of a SELECT statement; within
# a FROM clause, a subquery serves the role of generating
# a derived table that is visible from all other query
# clauses and can interact with other tables named in
# the FROM clause.
SELECT concat(cust.last_name, ', ', cust.first_name) AS full_name
FROM (
         SELECT first_name, last_name, email
         FROM customer
         WHERE first_name = 'JESSIE'
     ) AS cust;


# Temporary table:
# Temporary tables look just like permanent tables, but any
# data inserted is held in memory temporarily and will
# disappear after the session is closed.
CREATE TEMPORARY TABLE actors_j
(
    actor_id   smallint(5),
    first_name varchar(45),
    last_name  varchar(45)
);

INSERT INTO actors_j
SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name LIKE 'J%';

SELECT *
FROM actors_j;


# Virtual table:
# A view is a query that is stored in the data dictionary. It
# looks and acts like a table, but there is no data associated
# with a view. When you issue a query against a view, your
# query is merged with the view definition to create a final
# query to be executed.
#
# When the view is created, no additional
# data is generated or stored: the server simply tucks away the
# SELECT statement for future use.
CREATE VIEW cust_vw AS
SELECT customer_id, first_name, last_name, active
FROM customer;

SELECT first_name, last_name
FROM cust_vw
WHERE active = 0;


# Table links:
# If more than one table appears in the FROM clause, the
# conditions used to link the tables must be included as well.
# The mechanism of linking two tables is known as a join. The
# join condition for the two tables are found in the ON subclause
# of the FROM clause.
SELECT c.first_name, c.last_name, time(r.rental_date) rental_time
FROM customer AS c
         INNER JOIN rental AS r ON c.customer_id = r.customer_id
WHERE date(r.rental_date) = '2005-06-14';


# Filter out rows according to filter conditions with the WHERE
# clause and operators like AND, OR, and NOT.
SELECT title
FROM film
WHERE (rating = 'G' AND rental_duration >= 7)
   OR (rating = 'PG-13' AND rental_duration < 4);


# For some queries, you'll want the database to manipulate the
# data before you retrieve your result. The GROUP BY clause is
# used to group data by column values. The HAVING clause is used
# to filter grouped data in the same way the WHERE clause lets
# you filter raw data.
SELECT c.first_name, c.last_name, count(*)
FROM customer AS c
         INNER JOIN rental AS r ON c.customer_id = r.customer_id
GROUP BY c.first_name, c.last_name
HAVING count(*) >= 40;


# If you want your set to be sorted, instruct the  server to sort
# the results using the ORDER BY clause.
SELECT c.first_name, c.last_name, time(r.rental_date) AS rental_time
FROM customer AS c
         INNER JOIN rental AS r ON c.customer_id = r.customer_id
WHERE date(r.rental_date) = '2005-06=14'
ORDER BY c.last_name, c.first_name;


# When sorting, specify ascending or descending order with the ASC
# and DESC keywords. The default is ascending.
SELECT c.first_name, c.last_name, time(r.rental_date) AS rental_time
FROM customer AS c
         INNER JOIN rental AS r ON c.customer_id = r.customer_id
WHERE date(r.rental_date) = '2005-06-14'
ORDER BY time(r.rental_date) DESC;


# If you are sorting using columns specified in the SELECT clause,
# you can opt to reference them by their position in the SELECT clause
# rather than by name. This is especially helpful if you sorting on an
# expression. Use this sparingly, since adding a column to the SELECT
# clause without changing the number in the ORDER BY clause can lead to
# unexpected results. Prefer to reference by name when writing code.
SELECT c.first_name, c.last_name, time(r.rental_date) AS rental_time
FROM customer AS c
         INNER JOIN rental AS r ON c.customer_id = r.customer_id
WHERE date(r.rental_date) = '2005-06-14'
ORDER BY 3 DESC;


# Exercise 3-1:
# Retrieve the actor ID, first name, and last name for all actors. Sort
# by last name and then by first name.
SELECT actor_id, first_name, last_name
FROM actor
ORDER BY last_name, first_name;


# Exercise 3-2:
# Retrieve the actor ID, first name, and last name for all actors whose
# last name equals 'WILLIAMS' or 'DAVIS'.
SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name = 'WILLIAMS'
   OR last_name = 'DAVIS';


# Exercise 3-3
# Write a query against the rental table that returns the IDs of the
# customers who rented a film on July 5, 2005 (use the rental.rental_date
# column, and you can use the date() function to ignore the time component).
# Include a single row for each distinct customer ID.
SELECT DISTINCT customer_id
FROM rental
WHERE date(rental_date) = '2005-07-05';


# Exercise 3-4
# Fill in the blanks (denoted by <#>) for this multi-table query to achieve
# the following results:
#
# mysql> SELECT c.email, r.return_date
#     -> FROM customer c
#     ->   INNER JOIN rental <1>
#     ->   ON c.customer_id = <2>
#     -> WHERE date(r.rental_date) = '2005-06-14'
#     -> ORDER BY <3> <4>;
# +---------------------------------------+---------------------+
# | email                                 | return_date         |
# +---------------------------------------+---------------------+
# | DANIEL.CABRAL@sakilacustomer.org      | 2005-06-23 22:00:38 |
# | TERRANCE.ROUSH@sakilacustomer.org     | 2005-06-23 21:53:46 |
# | MIRIAM.MCKINNEY@sakilacustomer.org    | 2005-06-21 17:12:08 |
# | GWENDOLYN.MAY@sakilacustomer.org      | 2005-06-20 02:40:27 |
# | JEANETTE.GREENE@sakilacustomer.org    | 2005-06-19 23:26:46 |
# | HERMAN.DEVORE@sakilacustomer.org      | 2005-06-19 03:20:09 |
# | JEFFERY.PINSON@sakilacustomer.org     | 2005-06-18 21:37:33 |
# | MATTHEW.MAHAN@sakilacustomer.org      | 2005-06-18 05:18:58 |
# | MINNIE.ROMERO@sakilacustomer.org      | 2005-06-18 01:58:34 |
# | SONIA.GREGORY@sakilacustomer.org      | 2005-06-17 21:44:11 |
# | TERRENCE.GUNDERSON@sakilacustomer.org | 2005-06-17 05:28:35 |
# | ELMER.NOE@sakilacustomer.org          | 2005-06-17 02:11:13 |
# | JOYCE.EDWARDS@sakilacustomer.org      | 2005-06-16 21:00:26 |
# | AMBER.DIXON@sakilacustomer.org        | 2005-06-16 04:02:56 |
# | CHARLES.KOWALSKI@sakilacustomer.org   | 2005-06-16 02:26:34 |
# | CATHERINE.CAMPBELL@sakilacustomer.org | 2005-06-15 20:43:03 |
# +---------------------------------------+---------------------+
# 16 rows in set (0.03 sec)
SELECT c.email, r.return_date
FROM customer c
         INNER JOIN rental r ON c.customer_id = r.customer_id
WHERE date(r.rental_date) = '2005-06-14'
ORDER BY r.return_date DESC;
