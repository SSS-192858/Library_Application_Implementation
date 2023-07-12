# Library App

## How to Run

### Option 1 - To Run with Docker

The commands to install docker and docker compose on linux are as follows (assuming you have curl installed on the system)- 

```
sudo apt update
sudo snap install docker
sudo apt install docker-compose.
```

If these do not work, you can also install docker using snap as follows (assuming you have curl installed on the system)- 

```
sudo apt update
sudo apt install snapd
sudo snap install docker
sudo apt install docker-compose.
```

Kindly follow the following tutorial in case you face any difficulties - 
https://phoenixnap.com/kb/install-docker-compose-on-ubuntu-20-04


To start the docker service, we first run this command to check the name of the docker service -
```
sudo systemctl list-units --type=service
```

Following this, the service can be started and verified using the following commands -
```
systemctl start <name>
systemctl status <name>
```

To provide the required permissions to docker compose, we run the following commands - 

```
which docker-compose
```

This provides the path to the docker compose installed on the system, using which the permissions can be updated using the following commands - 

```
sudo chmod +x <path-to-docker-compose>
sudo usermod -aG docker $USER 
sudo chgrp docker <path-to-docker-compose>
sudo chmod 750 <path-to-docker-compose>
```

Finally we can run the docker compose file by changing to the directory which contains the docker-compose.yml file and running the following command
```
sudo docker-compose up
```

The running containers can be stopped using the command 

```
sudo docker-compose down
```

Possible errors encountered while runnning may include -
1. Permission denied for mvnw file - This occurs when we are not allowed to access the mvnw file in the backend code. This can be resolved by running the following commands - 

```
cd library/
chmod +x mvnw
cd ..
```

2. Process running on required ports - This can be resolved by killing the process running on the particular port. This can be done by first obtaining the pid of the process, and then killing it using the following commands - 
```
sudo ss -tanp | grep <port>
sudo kill -15 <pid>
```
We can also change the port numbers used in the docker-compose.yml file and the Dockerfiles. However, this solution is prone to multiple errors in case we forget to change the port numbers everywhere.

### Option 2 - To Run without Docker

Hi Peeps! This if for those guys who have trouble with Docker :upside_down_face:. Here is the way for you guys to run it.

1. You need to have MySQL,Java and NodeJs installed in your systems. For installation of those kindly refer to their
respective documentation. 
    [MySQL-Shell](https://dev.mysql.com/downloads/shell/)
    [MySQL-WorkBench](https://dev.mysql.com/downloads/workbench/)
    [Java](https://www.oracle.com/in/java/technologies/downloads/)
    [Node](https://nodejs.org/en)
2. Download the four softwares suitable for your operating system.
3. Next clone this repository.
4. First go to the sql folder present at the same level `cd sql` or any other equivalent in your OS.
5. Then run the follwing command in your terminal `source create_script.sql`. This shall create the necessary database in you local computer. This can also be done by opening the script in workbench, and running it.
6. Next go to libfr_web and type the following in the terminal. `npm install` This shall download all the necessary packages required to run the front-end in your local system.
7. Now go to the library folder and then to src/main/resources. `cd src/main/resources`/ it's equivalent in your OS.
8. Go to *application.properties* file and then **comment in the first three lines**.
9. Make sure to add your *username* and *password* in those fields.
10. Next run the spring boot application(*LibraryApplication*) using any IDE (we recommend IntelliJ), or type the following command in your terminal ```mvn spring-boot:run```
11. Now head back to the src folder in libfr_web and run the *App.js* using the `npm start` command.
12. You can now access the frontend using any browser at http://localhost:3000/


## Database

1. The .pdf file contains the visual representation of the schema that our database follows. 
2. The sql folder contains an sql script to initialise the database and the various tables, along with some sample data for testing purposes and to streamline the process of testing.
3. The sql folder also contains a Dockerfile to initialise a docker image, which runs the create script at the time of running the image.
4. A description of the tables in the database is provided.

### Description of Tables

1. **user** - This table contains the details about all the users that have been registered with our service. It contains the **user_id**,**username** and **password**. This table is used in authenticating the user.

2. **role** -  This table contains the roles of users in our application. The three roles here are:
- Student
- Instructor
- Admin 

3. **user-roles** - This table is used in mapping the user to their respective roles. This contains **role_id**,**user_id** which shall be used in the mappings.

4. **student** - This table is used to store the student details (**student_name**, **student_email** and **student_phno**) for a given user who is a student. It contains a foreign key mapping to the **user_id** of the user which it references, along with other fields. This mapping is unique to ensure one-one mapping.

5. **books** - This table stores a record of all the books in the database. It contains the **book_code**, **book_title**, **book_author** and **book_desc** fields.  

7. **request** - This table stores the information of all the requests made by the students. It contains necessary information such as **student_id** (this shall map this record to a unique *student* in the **student** table.), **book_code**(this shall map this record to a unique *book* in the **books** table.). This also contains the **start_date** and **end_date** representing the request period.

8. **student_book** - This table stores the information of all the student book assignments, i.e. which book has been issued to which student, and the duration of the same. It basically represents a request which has been approved by the admin.

## Backend

The app can consist of various users broadly categorised into 2 roles, depending on their function :- 
1. **Student** - They request for books for specified time periods.
2. **Admin** - Manages overall system and has the task of approving requests. Has unrestricted access.

Most of the backend functionality is achieved through various pre-defined end points, and controlling the access to these endpoints, allows us to achieve the desired output. The backend is written in spring boot.

The application architecture is as follows: -

***REST Contollers*** - 
They contain the necessary endpoints for the respective entities and they are responsible for interacting with the web and the application. Respective functions from services are called and values are for the same are returned.

***Services***- They act as bridge between the *REST Controllers* and the *Repositores*. They shall call the respective functions from the *Repositories/DAOs* and the values are returned to the *REST Controller*.

***Repositories/DAOs*** - 
They are responsible for communicating with the database. All the operations to the database are headed from here. 

The various endpoints are - 

* **/register_admin** - Only admin has access to this endpoint. They allow the admin to register a new admin user.
* **/register_student** - Endpoint to be used by a student to create a new student account to access the library. Open to all.
* **/authenticate** - Any person who has been registered with the database can use this endpoint to login with valid credentials. If the user is logged in successfully, they recieve a jwt token which is stored locally and auto logs in the user until it expires, after which user must log in again.

* **/student/getAll** - See all students registered with the organization. Only an admin has access to this endpoint.
* **/student/getStudent/\*\*** - Get details of a particular student by their student id. This can be used by an admin to view details of the student or by a student to view their personal details.
* **/student/deleteStudent/\*\*** - Delete a student record from the database(The *student id* will be pass as *id - (Path Variable)*). Only admin has access to this endpoint.
* **/student/save** - Save details of a student when registering them. Student can access this endpoint.
* **/student/updateStudent** - Update details of an already registered student. Can be done by a student wanting to update their own details.
* **/student/user/getStudent** - Get details of a student from user id, which is obtained by sending the jwt token as part of an authorization header, using which the student details can be accesed. Only accessible to a student trying to see their personal details.

* **/books/getAll** - Show all books offered by the library. Can be viewed by everyone who has logged in.
* **/books/getBook/\*\*** - Endpoint to get the particular book by book-code. All the users have access to this endpoint.
* **/books/deleteBook/** - Endpoint to delete the book. Only Admins have access to this functionality and endpoint.
* **/books/save** - Used to save a book in the database. Only Admins have access to this endpoint.
* **/books/updateBook** - Used to update a particular existing book in the database. Admins have access to this endpoint.
* **/bookStudent/getAll** - Used to get all the book student relations. Accessible to Admins only.
* **/bookStudent/\*\*** - Used to get a particular book student record whose *id* is passed as *Path Variable - id*. This endpoint is accessible by admins only.
* **/bookStudent/save** - Used to save a book student relation in the database. Only Accessible by admins.

* **/bookStudent/delete/\*\*** - Used to delete a book student record. Accessible to all users.
* **/bookStudent/accept** - Used to a accept the request and then save it as a bookStudent record in the table. Accessible only to the admins.
* **/studentSubject/getForStudentAndInstructor/** - used to get the list of student subject records for a given instructor and student combo. This endpoint in exclusive for a instructor.

* **/requests/allRequests** - See all requests for all books and students. Only admin has access to this endpoint.
* **/requests/\*\*** - Get details of a request made by its id. Can be viewed by any type of user under certain conditons. (A student can only see his own requests, not others').
* **/requests/student/\*\*** - Get all requests that belong to a particular student (The *student id* will be pass as *id - (Path Variable)*). Only admin (to view for all students) and students (to view all their pending requests) can access this endpoint.
* **/requests/book/\*\*** - Get all requests for a particular book by its book code. Only admin can access this endpoint.
* **/request/save** - Make a new request. Students can make a request.
* **/request/delete** - Delete a request. Students can access this endpoint if they want to delete a request they made or admin can do it for them.

The library folder also contains a Dockerfile to initialise a docker image, which runs the backend.
Also, in order to view all the json object formats of the requests that can be made to the backend, refer to the Formats directory.

## Frontend

The frontend of the application is written in React.js. The folder containing the same is **libfr_web** There is a single nav bar which shows options based on who is logged in, (student, instructor, admin or no one), and provides to links to go to these web pages. The components are roughly classified into the following types:

1. **Validation functions** - These are used to validate the entries filled in the various forms, and enforce validation rules on the inputs being sent, and display error messages to the respective components for any invalid inputs. They are stored in the validators subdirectory in src. The files are as follows - 

    1. **validators.js** - the common validators to be used by all the components
    2. **StudentUpdateValidator.js** - the validator for the form shown to update an student's details.
    3. **loginFormValidator.js** - the validator for the form shown to login to the application.
    4. **signupStudentValidator.js** - the validator for the form shown to register a new student account to the application.
    5. **signupAdminValidato.js** - the validator for the form shown to register a new admin.
    6. **BookSaveValidator.js** - the validator for the form shown to save/update a book.
    7. **RequestBookValidator.js**- the validator for the requests made by the student.
    
2. **Services** - These contain services used by the application to handle variables in local storage, and to send requests to the backend, which runs on localhost:8080. They are stored in services subdirectory of src, and are as follows - 

    1. **auth_header.js** - a single function to extract the jwt token stored in local storage, to send in requests as a header.
    2. **auth_services.js** - contains all functions to handle authentication services in the application (login, signup, token management etc.)
    3. **localStorageHandler.js** - a number of variables are stored in local storage to prevent loss in case of page refresh, this file contains all functions to handle the same.
    4. **user_services.js** - all the other functions to send varied requests to the backend are stored here.
    5. **request_services** - all functions to handle requests have been stored here.

3. **List items** - These contain the list items shown on screen as a part of the list components. All list item components are clickable, and show a summary of the items they represent, and provide links to see full details of the item. Kindly refer to the files to find comments to explain the working of the same. They are present in the common subdirectory of the src directory.

4. **Components** - These are the screens of the application which are shown to the user. They contain forms to create/ update data present in the db, lists to see lists of various entities requested by the user (students, books, requests etc) and details components to see the details of a particular entity. The names of the files can be used to identify which screen serves which purpose. We only show screens to the user which he is allowed to access. Kindly refer to the comments present in various screens to find details of implementation. They are present in the components subdirectory of the src folder.

5. **Dockerfile** - The dockerfile is also available for the frontend. It builds the project, installs required node modules, and runs the command to provide an image for the frontend.
