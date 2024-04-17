SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

-- CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

-- COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE lesson_students (
    lesson_id integer,
    student_id integer,
    visit boolean DEFAULT false
);

CREATE TABLE lesson_teachers (
    lesson_id integer,
    teacher_id integer
);

CREATE TABLE lessons (
    id integer NOT NULL,
    date date NOT NULL,
    title character varying(100),
    status integer DEFAULT 0
);

CREATE SEQUENCE lessons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE lessons_id_seq OWNED BY lessons.id;

CREATE TABLE students (
    id integer NOT NULL,
    name character varying(10)
);

CREATE SEQUENCE students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE students_id_seq OWNED BY students.id;

CREATE TABLE teachers (
    id integer NOT NULL,
    name character varying(10)
);

CREATE SEQUENCE teachers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE teachers_id_seq OWNED BY teachers.id;

ALTER TABLE ONLY lessons ALTER COLUMN id SET DEFAULT nextval('lessons_id_seq'::regclass);

ALTER TABLE ONLY students ALTER COLUMN id SET DEFAULT nextval('students_id_seq'::regclass);

ALTER TABLE ONLY teachers ALTER COLUMN id SET DEFAULT nextval('teachers_id_seq'::regclass);

INSERT INTO lesson_students (lesson_id, student_id, visit) VALUES
(1, 1,  true),
(1, 2,  true),
(1, 3,  false),
(2, 2,  true),
(2, 3,  true),
(4, 1,  true),
(4, 2,  true),
(4, 3,  true),
(4, 4,  true),
(5, 4,  false),
(5, 2,  false),
(6, 1,  false),
(6, 3,  false),
(7, 2,  true),
(7, 1,  true),
(8, 1,  false),
(8, 4,  true),
(8, 2,  true),
(9, 2,  false),
(10, 1,  false),
(10, 3,  true);

INSERT INTO lesson_teachers (lesson_id, teacher_id) VALUES
(1, 1),
(1, 3),
(2, 1),
(2, 4),
(3, 3),
(4, 4),
(6, 3),
(7, 1),
(8, 4),
(8, 3),
(8, 2),
(9, 3),
(10, 3);

INSERT INTO lessons (id, date, title, status) VALUES
(2, '2019-09-02', 'Red Color', 0),
(5, '2019-05-10', 'Purple Color', 0),
(7, '2019-06-17', 'White Color', 0),
(10, '2019-06-24', 'Brown Color', 0),
(9, '2019-06-20', 'Yellow Color', 1),
(1, '2019-09-01', 'Green Color', 1),
(3, '2019-09-03', 'Orange Color', 1),
(4, '2019-09-04', 'Blue Color', 1),
(6, '2019-05-15', 'Red Color', 1),
(8, '2019-06-17', 'Black Color', 1);

SELECT pg_catalog.setval('lessons_id_seq', 10, true);

INSERT INTO students (id, name) VALUES
(1, 'Ivan'),
(2, 'Sergey'),
(3, 'Maxim'),
(4, 'Slava');

SELECT pg_catalog.setval('students_id_seq', 4, true);

INSERT INTO teachers (id, name) VALUES
(1, 'Sveta'),
(2, 'Marina'),
(3, 'Angelina'),
(4, 'Masha');

SELECT pg_catalog.setval('teachers_id_seq', 4, true);

ALTER TABLE ONLY lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);

ALTER TABLE ONLY students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);

ALTER TABLE ONLY teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);

ALTER TABLE ONLY lesson_students
    ADD CONSTRAINT lesson_students_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lessons(id);

ALTER TABLE ONLY lesson_students
    ADD CONSTRAINT lesson_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id);

ALTER TABLE ONLY lesson_teachers
    ADD CONSTRAINT lesson_teachers_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lessons(id);

ALTER TABLE ONLY lesson_teachers
    ADD CONSTRAINT lesson_teachers_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES teachers(id);
