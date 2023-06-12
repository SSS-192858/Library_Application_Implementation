create database Library;
use Library;

create table user(
    user_id INTEGER PRIMARY KEY,
    username varchar(100) NOT NULL,
    password char(68) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER NOT NULL,
    role_name varchar(100) NOT NULL,
    constraint pk_role PRIMARY KEY (role_id)
);

CREATE TABLE user_roles (
    user_id INTEGER,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE student(
    student_id INTEGER,
    student_name varchar(100) DEFAULT NULL,
    student_email varchar(100) DEFAULT NULL,
    student_phno varchar(100) DEFAULT NULL,
    constraint pk_student PRIMARY KEY (student_id)
);

CREATE TABLE book(
    book_code INTEGER,
    book_name varchar(100) DEFAULT NULL,
    book_email varchar(100) DEFAULT NULL,
    book_phno varchar(100) DEFAULT NULL,
    constraint pk_book PRIMARY KEY (book_code)
);

CREATE TABLE request(
    slno INTEGER,
    student_id INTEGER,
    book_code INTEGER,
    start_date timestamp NOT NULL DEFAULT current_timestamp(),
    end_date datetime DEFAULT NULL,
    constraint pk_request PRIMARY KEY (slno)
);

create table student_book(
    slno INTEGER,
    student_id INTEGER,
    book_code INTEGER,
    start_date timestamp NOT NULL DEFAULT current_timestamp(),
    end_date datetime DEFAULT NULL,
    constraint pk_sb PRIMARY KEY (slno)
);

ALTER TABLE user_roles
ADD CONSTRAINT fk_user_userRoles
FOREIGN KEY (user_id) REFERENCES user(user_id);

ALTER TABLE user_roles
ADD CONSTRAINT fk_role_userRoles
FOREIGN KEY (role_id) REFERENCES role(role_id);

ALTER TABLE student
ADD CONSTRAINT fk_student_user
FOREIGN KEY (student_id) REFERENCES user(user_id);

ALTER TABLE request
ADD CONSTRAINT fk_book_request
FOREIGN KEY (book_code) REFERENCES book(book_code);

ALTER TABLE request
ADD CONSTRAINT fk_student_request
FOREIGN KEY (student_id) REFERENCES student(student_id);

ALTER TABLE student_book
ADD CONSTRAINT fk_sb_stud
FOREIGN KEY (student_id) REFERENCES student(student_id);

ALTER TABLE student_book
ADD CONSTRAINT fk_sb_book
FOREIGN KEY (book_code) REFERENCES book(book_code);

INSERT INTO role values (1,'ADMIN'),(2,'STUDENT');
INSERT INTO user values (1,"admin","$2a$12$5Y0GaYPjhBTO7ueSN3OFc.Xhi72L6Uk3ebhTp7YXVf2ldCiHsoThS");
--test123
INSERT INTO user values (2,"student","$2a$10$GCdiAz.35tPgpxlD.iRsSOkxDNGkBVJLvdDvSorbc/CSnXJoQkDAa");

INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 1 FROM user WHERE user.username = "admin";
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "student";