-- POSTGRESQL STATEMENTS

CREATE DATABASE bills_cutter;

\c bills_cutter

CREATE TABLE bills (
    id                  SERIAL PRIMARY KEY,
    number_of_people    NUMERIC,
	bill_amount         NUMERIC,
	username            TEXT,
	notes               TEXT
);

-- ALTER TABLE bills
-- ADD COLUMN notes TEXT;

INSERT INTO bills (number_of_people, bill_amount, username)
VALUES (2, 120, 'axelsomerseth')

SELECT * FROM bills

DELETE FROM bills
WHERE id = 4;
