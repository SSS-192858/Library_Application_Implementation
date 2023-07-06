drop database if exists Library;
create database Library;
use Library;

create table user(
    user_id INTEGER auto_increment PRIMARY KEY,
    username varchar(100) UNIQUE NOT NULL,
    password char(68) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER NOT NULL,
    role_name varchar(100) UNIQUE NOT NULL,
    constraint pk_role PRIMARY KEY (role_id)
);

CREATE TABLE user_roles (
    user_id INTEGER,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE student(
    student_id INTEGER auto_increment,
    user_id INTEGER UNIQUE NOT NULL,
    student_name varchar(100) DEFAULT NULL,
    student_email varchar(100) DEFAULT NULL,
    student_phno varchar(100) DEFAULT NULL,
    constraint pk_student PRIMARY KEY (student_id)
);

CREATE TABLE book(
    book_code INTEGER auto_increment,
    book_title varchar(100) DEFAULT NULL,
    book_author varchar(100) DEFAULT NULL,
    book_desc varchar(1000) DEFAULT NULL,
    constraint pk_book PRIMARY KEY (book_code)
);

CREATE TABLE request(
    slno INTEGER auto_increment,
    student_id INTEGER,
    book_code INTEGER,
    start_date timestamp NOT NULL DEFAULT current_timestamp(),
    end_date timestamp DEFAULT NULL,
    constraint pk_request PRIMARY KEY (slno)
);

create table student_book(
    slno INTEGER auto_increment,
    student_id INTEGER,
    book_code INTEGER,
    start_date timestamp NOT NULL DEFAULT current_timestamp(),
    end_date timestamp DEFAULT NULL,
    constraint pk_sb PRIMARY KEY (slno)
);

ALTER TABLE user_roles
ADD CONSTRAINT fk_user_userRoles
FOREIGN KEY (user_id) REFERENCES user(user_id) on delete cascade;

ALTER TABLE user_roles
ADD CONSTRAINT fk_role_userRoles
FOREIGN KEY (role_id) REFERENCES role(role_id) on delete cascade;

ALTER TABLE student
ADD CONSTRAINT fk_student_user
FOREIGN KEY (user_id) REFERENCES user(user_id) on delete cascade;

ALTER TABLE request
ADD CONSTRAINT fk_book_request
FOREIGN KEY (book_code) REFERENCES book(book_code) on delete cascade;

ALTER TABLE request
ADD CONSTRAINT fk_student_request
FOREIGN KEY (student_id) REFERENCES student(student_id) on delete cascade;

ALTER TABLE student_book
ADD CONSTRAINT fk_sb_stud
FOREIGN KEY (student_id) REFERENCES student(student_id) on delete cascade;

ALTER TABLE student_book
ADD CONSTRAINT fk_sb_book
FOREIGN KEY (book_code) REFERENCES book(book_code) on delete cascade;

INSERT INTO role values (1,'ADMIN'),(2,'STUDENT');
INSERT INTO user values (1,"admin","$2a$12$5Y0GaYPjhBTO7ueSN3OFc.Xhi72L6Uk3ebhTp7YXVf2ldCiHsoThS");
-- test123
INSERT INTO user values (2,"student","$2a$10$GCdiAz.35tPgpxlD.iRsSOkxDNGkBVJLvdDvSorbc/CSnXJoQkDAa");
INSERT INTO student values (1, 2, "student", "student@gmail.com", "1234567890");

INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 1 FROM user WHERE user.username = "admin";
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "student";

INSERT INTO user values (3,"rifatbi","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (2,3,"Rifat Bi","rifatbi@test.com","7848228485");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "rifatbi";

INSERT INTO user values (4,"bmahesh","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (3,4,"Mahesh B","mahesh@test.com","7848578485");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "bmahesh";

INSERT INTO user values (5,"sankalpk","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (4,5,"Sankalp Kothari","sankalpkothari04@gmail.com","8888777788");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "sankalpk";

INSERT INTO user values (6,"sidk","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (5,6,"Siddharth Kothari","siddharthvatps@gmail.com","8877777788");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "sidk";

INSERT INTO user values (7,"msrini","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (6,7,"M Srinivasan","sankalpkothari04@gmail.com","8888777788");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "msrini";

INSERT INTO user values (8,"alexdarcy","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (7,8,"Alexandra Darcy","alex.darcy@test.com","1234567890");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "alexdarcy";

INSERT INTO user values (9,"jakeper","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (8,9,"Jake Peralta","jperalta@test.com","9638527410");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "jakeper";

INSERT INTO user values (10,"rosadiaz","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (9,10,"Rosa Diaz","diaz.rosa@test.com","9856321407");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "rosadiaz";

INSERT INTO user values (11,"jeffords","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (10,11,"Terry Jeffords","terry@test.com","9546781203");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "jeffords";

INSERT INTO user values (12,"phildunphy","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (11,12,"Philip Dunphy","dunphy@test.com","5124630789");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "phildunphy";

INSERT INTO user values (13,"eltonjoni","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (12,13,"Joni Elton","joni.elton@test.com","9955113322");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "jonielton";

INSERT INTO user values (14,"pettigrew","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (13,14,"Patty Pettigrew","thesuperiorpettigrew@test.com","8456789456");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "pettigrew";

INSERT INTO user values (15,"hhjort","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (14,15,"Hjalmar Hjort","hhjort@test.com","1100110100");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "hhjort";

INSERT INTO user values (16,"mikeclark","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (15,16,"Micheal Clark","micky@test.com","5464566544");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "mikeclark";

INSERT INTO user values (17,"johndoe","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (16,17,"John Doe","johndoe@test.com","7894561238");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "johndoe";

INSERT INTO user values (18,"chad","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (17,18,"Chad Darby","gigachad@test.com","7979797946");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "chad";

INSERT INTO user values (19,"jtaylor","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (18,19,"Jerome Taylor","@test.com","3322332232");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "jtaylor";

INSERT INTO user values (20,"pickie","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (19,20,"Jordan Pickford","jpicks@test.com","1885522852");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "pickie";

INSERT INTO user values (21,"jp","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (20,21,"Jay Pritchett","jpcnc@test.com","9966334411");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "jp";

INSERT INTO user values (22,"freddie","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (21,22,"Frederick Lemar","flemar@test.com","8546854685");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "freddie";

INSERT INTO user values (23,"sonny","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (22,23,"Son Heung-Min","hmson@test.com","1234567880");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "sonny";

INSERT INTO user values (24,"niclehr","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (23,24,"Nicole Lehr","niclehr@test.com","7744558878");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "niclehr";

INSERT INTO user values (25,"sushill","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (24,25,"Susan Hill","sushill@test.com","2234667890");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "sushill";

INSERT INTO user values (26,"jimmyanderson","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (25,26,"James Anderson","jimmyand@test.com","8021212121");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "jimmyanderson";

INSERT INTO user values (27,"marshmellow","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (26,27,"Marshall Eriksen","eriksenmarshall147@test.com","6523652365");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "marshmellow";

INSERT INTO user values (28,"bstinson","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (27,28,"Barney Stinson","suitup@test.com","9469469469");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "bstinson";

INSERT INTO user values (29,"admin1","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 1 FROM user WHERE user.username = "admin1";

INSERT INTO user values (30,"mmorales","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (28,30,"Miles Morales","moreorless@test.com","5423654654");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "mmorales";

INSERT INTO user values (31,"raphaguerreiro","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (29,31,"Raphael Guerreiro","raphaguerreiro@test.com","8456984567");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "raphaguerreiro";

INSERT INTO user values (32,"davidmoses","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (30,32,"David James Moses","djmoses@test.com","2200220022");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "davidmoses";

INSERT INTO user values (33,"wardmcleod","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (31,33,"Ward McLeod","wardmcleod@test.com","8546802131");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "wardmcleod";

INSERT INTO user values (34,"blively","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (32,34,"Blake Lively","blively@test.com","1234533330");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "blively";

INSERT INTO user values (35,"phillipslaura","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (33,35,"Laura Phillips","plaura@test.com","1234567440");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "phillipslaura";

INSERT INTO user values (36,"kbaum","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO student values (34,36,"Kristoph Baumgartner","kbaum@test.com","1237897890");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "kbaum";

INSERT INTO book values 
(1,"Gulliver's Travels","Jonathan Swift","Gulliver's Travels is an adventure story involving several voyages of Lemuel Gulliver, a ship's surgeon, who, because of a series of mishaps en route to recognized ports, ends up, instead, on several unknown islands living with people and animals of unusual sizes, behaviors, and philosophies, but who, after each adventure, is somehow able to return to his home in England where he recovers from these unusual experiences and then sets out again on a new voyage"),
(7,"Harry Potter - Collection","JK Rowling","An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world. On his eleventh birthday, Harry Potter discovers that he is no ordinary boy."),
(9,"Murder on the Orient Express","Agatha Christie","An American tycoon lies dead in his compartment, stabbed a dozen times, his door locked from the inside. Isolated and with a killer in their midst, detective Hercule Poirot must identify the murderer – in case he or she decides to strike again."),
(2,"Diary of a Wimpy Kid","Jeff Kinney","To Greg Heffley, middle school is the dumbest idea ever invented. It's a place rigged with hundreds of social landmines, not the least of which are morons, wedgies, swirlies, bullies, lunchtime banishment to the cafeteria floor - and a festering piece of cheese with nuclear cooties. To survive the never-ending ordeal and attain the recognition and status he feels he so richly deserves, Greg devises an endless series of can't-miss schemes, all of which, of course, go awry."),
(8,"Hamlet","Shakespeare","The ghost of the King of Denmark tells his son Hamlet to avenge his murder by killing the new king, Hamlet's uncle. Hamlet feigns madness, contemplates life and death, and seeks revenge. His uncle, fearing for his life, also devises plots to kill Hamlet."),
(4,"Julius Caesar","Shakespeare","Jealous conspirators convince Caesar's friend Brutus to join their assassination plot against Caesar. To stop Caesar from gaining too much power, Brutus and the conspirators kill him on the Ides of March. Mark Antony drives the conspirators out of Rome and fights them in a battle. Brutus and his friend Cassius lose and kill themselves, leaving Antony to rule in Rome."),
(5,"Sherlock Holmes - The Collection","Arthur Conan Doyle","~Consulting detective~ Sherlock Holmes solves various mysteries in modern-day London. Holmes is assisted by his flatmate and friend, Dr John Watson, who has returned from military service in Afghanistan with the Royal Army Medical Corps. This edition comprises of all the 4 novels and 56 short stories"),
(15,"The Subtle Art of Not Giving a F*ck","Mark Manson","The Subtle Art Of Not Giving A F*ck does away with the positive psychology craze to instead give you a Stoic, no-BS approach to living a life that might not always be happy, but meaningful and centered only around what's important to you."),
(6,"Percy Jackson - The Collective","Rick Riordan","The tale, which takes place in the middle of the 2000s, centers around Perseus 'Percy' Jackson. A 12-year-old child who learns that he is the demigod Poseidon's son. Because the Big Three, the sons of Kronos, Zeus, Poseidon, and Hades, swore not to father any more children after World War II, his father abandoned him. This collective features all 7 novels."),
(10,"The Time Machine","HG Wells","The Time Machine is a post-apocalyptic science fiction novella by H. G. Wells, published in 1895. The work is generally credited with the popularization of the concept of time travel by using a vehicle or device to travel purposely and selectively forward or backward through time."),
(11,"The Alchemist","Paulo Coelho","It is about the journey of Santiago, an Andalusian shepherd boy. He sees the same dream every night in which a child says that he will find treasure at the Egyptian pyramids. He starts his journey in the search of treasure. In the end, he meets an alchemist who makes him realize his true self."),
(12,"The Story Of My Life","Helen Keller","The Story of My Life (1903) chronicles the early years of Helen Keller, a young woman who became both deaf and blind at a young age. The book explores the challenges she faced growing up as a child with disabilities, and introduces the amazing people who helped her along the way."),
(13,"To Kill a Mockingbird","Harper Lee","When Tom Robinson, one of the town's Black residents, is falsely accused of raping Mayella Ewell, a white woman, Atticus agrees to defend him despite threats from the community. At one point he faces a mob intent on lynching his client but refuses to abandon him. Scout unwittingly diffuses the situation."),
(3,"And then there were none","Agatha Christie","In this suspenseful drama, based on Agatha Christie's mystery tale, 10 strangers are summoned to a remote island. While they are waiting for the mysterious host to appear, a recording levels serious accusations at each of the guests, including Judge Francis J. Quinncannon and Dr. Edward G. Armstrong, and soon they start being murdered, one by one. As the survivors try to keep their wits, they reach a disturbing conclusion: one of them must be the killer."),
(14,"Life of Pi","Yann Martel","Life of Pi is a Canadian philosophical novel by Yann Martel published in 2001. The protagonist is Piscine Molitor 'Pi' Patel, an Indian boy from Pondicherry, India, who explores issues of spirituality and metaphysics from an early age."),
(20,"The Time Traveller's Wife","Audrey Niffenegger","It is a love story about Henry, a man with a genetic disorder that causes him to time travel unpredictably, and about Clare, his wife, an artist who has to cope with his frequent absences."),
(17,"A Tale of Two Cities","Charles Dickens","A Tale of Two Cities, novel by Charles Dickens, published both serially and in book form in 1859. The story is set in the late 18th century against the background of the French Revolution. Although Dickens borrowed from Thomas Carlyle’s history, The French Revolution, for his sprawling tale of London and revolutionary Paris, the novel offers more drama than accuracy."),
(18,"Around the World in 80 Days","Jules Verne","Around the World in Eighty Days is an adventure novel by the French writer Jules Verne, first published in French in 1872. In the story, Phileas Fogg of London and his newly employed French valet Passepartout attempt to circumnavigate the world in 80 days on a wager of £20,000 set by his friends at the Reform Club"),
(16,"Journey to the Centre of the Earth","Jules Verne","Journey to the Center of the Earth, also translated with the variant titles A Journey to the Centre of the Earth and A Journey into the Interior of the Earth, is a classic science fiction novel by Jules Verne. It was first published in French in 1864, then reissued in 1867 in a revised and expanded edition."),
(19,"The Hunchback of Notre Dame","Victor Hugo","The Hunchback of Notre-Dame is a French Gothic novel by Victor Hugo, published in 1831. The title refers to the Notre-Dame Cathedral, which features prominently throughout the novel.");

INSERT INTO request values (1,4,15,"2023-07-15 18:00:00","2023-07-29 18:00:00");
INSERT INTO request values (2,5,1,"2023-07-14 18:00:00","2023-07-28 18:00:00");
INSERT INTO request values (3,4,3,"2023-07-12 18:00:00","2023-07-26 18:00:00");
INSERT INTO request values (4,2,1,"2023-07-21 18:00:00","2023-08-04 18:00:00");
INSERT INTO request values (5,8,5,"2023-07-26 18:00:00","2023-08-09 18:00:00");
INSERT INTO request values (6,34,12,"2023-08-02 18:00:00","2023-08-19 18:00:00");
INSERT INTO request values (7,15,6,"2023-08-02 18:00:00","2023-08-23 18:00:00");
INSERT INTO request values (8,34,1,"2023-08-16 18:00:00","2023-08-30 18:00:00");
INSERT INTO request values (9,5,1,"2023-08-12 18:00:00","2023-08-20 18:00:00");
INSERT INTO request values (10,6,20,"2023-08-04 18:00:00","2023-08-15 18:00:00");
INSERT INTO request values (11,2,7,"2023-08-25 18:00:00","2023-09-08 18:00:00");
INSERT INTO request values (12,3,7,"2023-08-16 18:00:00","2023-08-30 18:00:00");

INSERT INTO student_book values (1,5,12,"2023-05-01 18:00:00","2023-05-22 18:00:00");
INSERT INTO student_book values (2,4,1,"2023-05-05 18:00:00","2023-05-21 18:00:00");
INSERT INTO student_book values (3,4,14,"2023-05-10 18:00:00","2023-05-20 18:00:00");
INSERT INTO student_book values (4,2,9,"2023-05-12 18:00:00","2023-05-26 18:00:00");
INSERT INTO student_book values (5,6,3,"2023-05-20 18:00:00","2023-06-01 18:00:00");
INSERT INTO student_book values (6,34,10,"2023-05-25 18:00:00","2023-06-10 18:00:00");
INSERT INTO student_book values (7,17,16,"2023-05-30 18:00:00","2023-06-15 18:00:00");
INSERT INTO student_book values (8,14,12,"2023-06-02 18:00:00","2023-06-16 18:00:00");
INSERT INTO student_book values (9,3,1,"2023-06-02 18:00:00","2023-06-19 18:00:00");
INSERT INTO student_book values (10,6,20,"2023-06-09 18:00:00","2023-06-25 18:00:00");
INSERT INTO student_book values (11,2,20,"2023-06-18 18:00:00","2023-06-30 18:00:00");
INSERT INTO student_book values (12,30,17,"2023-06-23 18:00:00","2023-07-15 18:00:00");
